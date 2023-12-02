import connectMongoDB from "@/libs/mongodb"
import pravah24_DB from "@/models/event"
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { eventName,
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
        eventCurrentParticipation } = await request.json()

    await connectMongoDB();
    await pravah24_DB.findByIdAndUpdate(id, {
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

    return NextResponse.json({ message: "Event Updated Successfully" }, { status: 200 })
}

export async function GET(request, { params }) {
    const { id } = params
    await connectMongoDB();
    const particularEvent = await pravah24_DB.findOne({ _id: id })
    return NextResponse.json({ particularEvent }, { status: 200 })
}