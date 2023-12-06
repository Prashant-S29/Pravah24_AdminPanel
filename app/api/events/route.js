import pravah24_DB from "@/models/event"
import connectMongoDB from "@/libs/mongodb"

import { NextResponse } from "next/server";


export async function POST(request) {
    const {
        eventName,
        eventPhoto,
        eventCategoryID,
        eventType,
        eventRegistrationFee,
        eventRegistrationLink,
        eventDate,
        eventTime,
        eventVenue,
        eventBrochure,
        eventMaxParicipationLimit,
        eventCurrentParticipation
    } = await request.json()

    await connectMongoDB();
    await pravah24_DB.create({
        eventName,
        eventPhoto,
        eventCategoryID,
        eventType,
        eventRegistrationFee,
        eventRegistrationLink,
        eventDate,
        eventTime,
        eventVenue,
        eventBrochure,
        eventMaxParicipationLimit,
        eventCurrentParticipation
    })

    return NextResponse.json({ message: "Event successfully created" }, { status: 201 })

}

export async function GET() {
    await connectMongoDB();
    const pravahEventsList = await pravah24_DB.find();
    return NextResponse.json({ pravahEventsList })
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await pravah24_DB.findByIdAndDelete(id);
    return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 })
}
