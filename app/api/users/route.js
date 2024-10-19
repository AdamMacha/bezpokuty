import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const { firstName, lastName, phone, street, city, zipCode, email } = await request.json();
        await connectMongoDB();
        await User.create({ firstName, lastName, phone, street, city, zipCode, email });
        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }
}
