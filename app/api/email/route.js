import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await ConnectDB();
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ success: false, msg: 'Invalid email format' }, { status: 400 });
    }

    const emailData = { email };
    await EmailModel.create(emailData);

    return NextResponse.json({ success: true, msg: "Email Subscribed" });
  } catch (error) {
    console.error('Error in email subscription:', error);
    return NextResponse.json({ success: false, msg: 'Server error occurred while subscribing' }, { status: 500 });
  }
}

export async function GET(request) {
    await ConnectDB(); // Added DB connection
    const emails = await EmailModel.find({});
    return NextResponse.json({emails});
}

export async function DELETE(request) {
    try {
        await ConnectDB(); // Added DB connection
        
        // Fixed the query parameter access
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, msg: "No ID provided" },
                { status: 400 }
            );
        }

        const deletedEmail = await EmailModel.findByIdAndDelete(id);
        
        if (!deletedEmail) {
            return NextResponse.json(
                { success: false, msg: "Email not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, msg: "Email Deleted" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { success: false, msg: "Server error occurred" },
            { status: 500 }
        );
    }
}