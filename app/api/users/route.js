import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');
        
        await connectMongoDB();
        
        if (sessionId) {
            const users = await User.find({ stripeSessionId: sessionId });
            return NextResponse.json(users);
        }
        
        const users = await User.find();
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error getting users:", error);
        return NextResponse.json({ error: "Error getting users" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        await connectMongoDB();
        
        // Check if order with this session ID already exists
        if (data.stripeSessionId) {
            const existingOrder = await User.findOne({ 
                stripeSessionId: data.stripeSessionId 
            });
            if (existingOrder) {
                return NextResponse.json(
                    { message: "Order already exists" },
                    { status: 200 }
                );
            }
        }
        
        await User.create(data);
        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const { id, firstName, lastName, phone, street, city, zipCode, email } = await request.json();
        await connectMongoDB();
        await User.findByIdAndUpdate(id, { firstName, lastName, phone, street, city, zipCode, email });
        return NextResponse.json({ message: "User updated" });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Error updating user" }, { status: 500 });
    }
}