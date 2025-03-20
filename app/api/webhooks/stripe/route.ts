import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

// Webhook secret for verifying the event
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature") || ""

    // Verify the event
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutSessionCompleted(session)
        break
      case "customer.subscription.updated":
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(deletedSubscription)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

// Handle checkout session completed
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (!session.customer || !session.metadata?.userId) {
    console.error("Missing customer or userId in session metadata")
    return
  }

  // Update user with subscription info
  await db
    .update(users)
    .set({
      stripeCustomerId: session.customer.toString(),
      subscriptionStatus: "active",
      subscriptionTier: session.metadata.tier || "pro",
    })
    .where(eq(users.id, session.metadata.userId))
}

// Handle subscription updated
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer.toString()

  // Find user by Stripe customer ID
  const [user] = await db.select().from(users).where(eq(users.stripeCustomerId, customerId)).limit(1)

  if (!user) {
    console.error("User not found for customer ID:", customerId)
    return
  }

  // Update user subscription status
  await db
    .update(users)
    .set({
      subscriptionStatus: subscription.status,
      subscriptionTier: subscription.metadata.tier || "pro",
    })
    .where(eq(users.id, user.id))
}

// Handle subscription deleted
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer.toString()

  // Find user by Stripe customer ID
  const [user] = await db.select().from(users).where(eq(users.stripeCustomerId, customerId)).limit(1)

  if (!user) {
    console.error("User not found for customer ID:", customerId)
    return
  }

  // Update user subscription status
  await db
    .update(users)
    .set({
      subscriptionStatus: "inactive",
      subscriptionTier: "free",
    })
    .where(eq(users.id, user.id))
}

