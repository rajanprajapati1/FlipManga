import { sendNewsletter } from "@/services/Nodemailer"; // Import the nodemailer service
import connectToDatabase from "@/db/MongoDb"; // Import the MongoDB connection service
import Subscription from "@/db/models/subscription"; // Import the Subscription model
import { NextResponse } from "next/server";

await connectToDatabase();
const ADMIN_SECRET_TOKEN = process.env.ADMIN_SECRET_TOKEN || "your admin pass";

// subscribe
export const POST = async (req) => {
  try {
    const { to, subject, htmlContent } = await req.json();

    // Validate input
    if (!to || !subject || !htmlContent) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields: to, subject, and htmlContent." },
        { status: 400 }
      );
    }

    // Connect to MongoDB

    // Check if the email already exists in the database
    const existingSubscription = await Subscription.findOne({ email: to });
     
    if (!existingSubscription) {
      // If the email doesn't exist, add it to the database
      const newSubscription = new Subscription({ email: to });
      await newSubscription.save();
      console.log(`New email added to the database: ${to}`);
    } else {
      console.log(`Email already exists in the database: ${to}`);
      return NextResponse.json({
        success: false,
        message: `You are already subscribed to our newsletter with the email: ${to}`,
      }, { status: 403 });
    }
      
    const response = await sendNewsletter(to, subject, htmlContent);

    if (response.success) {
      return NextResponse.json({
        success: true,
        message: "Newsletter sent successfully.",
        messageId: response.messageId,
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        message: "Error sending the newsletter.",
        error: response.error,
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Error in /send-newsletter:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error.", error: error.message },
      { status: 500 }
    );
  }
};
// get subecrito list
export const GET = async (req,res) => {
  try {
    const q = req.nextUrl.searchParams.get("q");

    if (q !== ADMIN_SECRET_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Access Denied: Invalid admin token." },
        { status: 403 }
      );
    }
    const data = await Subscription.find({}).select('-createdAt -__v');
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /subscriptions:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error.", error: error.message },
      { status: 500 }
    );
  }
};
// unscribe
export const DELETE = async (req) => {
  try {
    const { email } = await req.json(); // Or you can use req.query if you're using query parameters
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email address is required." },
        { status: 400 }
      );
    }
    const existingSubscription = await Subscription.findOne({ email });

    if (!existingSubscription) {
      return NextResponse.json({
        success: false,
        message: `No subscription found with the email: ${email}`,
      }, { status: 404 });
    }

    await Subscription.deleteOne({ email });

    return NextResponse.json({
      success: true,
      message: `You have successfully unsubscribed from the newsletter.`,
    }, { status: 200 });

  } catch (error) {
    console.error("Error during unsubscribe:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error.", error: error.message },
      { status: 500 }
    );
  }
};