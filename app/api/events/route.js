import pravah24_testDB_one from "@/models/event"
import connectMongoDB from "@/libs/mongodb"

import { NextResponse } from "next/server";


export async function POST(request) {
    const {
        eventName,
        eventPhoto,
        eventCategoryID,
        eventRegistrationTeamTypeOne,
        eventRegistrationFeeOne,
        eventRegistrationLinkOne,

        eventRegistrationTeamTypeTwo,
        eventRegistrationFeeTwo,
        eventRegistrationLinkTwo,

        eventRegistrationTeamTypeThree,
        eventRegistrationFeeThree,
        eventRegistrationLinkThree,

        eventRegistrationTeamTypeFour,
        eventRegistrationFeeFour,
        eventRegistrationLinkFour,

        eventRegistrationTeamTypeFive,
        eventRegistrationLinkFive,
        eventRegistrationFeeFive,

        eventRegistrationTeamTypeSix,
        eventRegistrationFeeSix,
        eventRegistrationLinkSix,

        eventRegistrationTeamTypeSeven,
        eventRegistrationFeeSeven,
        eventRegistrationLinkSeven,
        eventDate,
        eventTime,
        eventVenue,
        eventBrochure,
        eventMaxParicipationLimit,
        eventCurrentParticipation
    } = await request.json()

    await connectMongoDB();
    await pravah24_testDB_one.create({
        eventName,
        eventPhoto,
        eventCategoryID,
        eventRegistrationTeamTypeOne,
        eventRegistrationFeeOne,
        eventRegistrationLinkOne,

        eventRegistrationTeamTypeTwo,
        eventRegistrationFeeTwo,
        eventRegistrationLinkTwo,

        eventRegistrationTeamTypeThree,
        eventRegistrationFeeThree,
        eventRegistrationLinkThree,

        eventRegistrationTeamTypeFour,
        eventRegistrationFeeFour,
        eventRegistrationLinkFour,

        eventRegistrationTeamTypeFive,
        eventRegistrationLinkFive,
        eventRegistrationFeeFive,

        eventRegistrationTeamTypeSix,
        eventRegistrationFeeSix,
        eventRegistrationLinkSix,

        eventRegistrationTeamTypeSeven,
        eventRegistrationFeeSeven,
        eventRegistrationLinkSeven,
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
    const pravahEventsList = await pravah24_testDB_one.find();
    return new NextResponse(
        JSON.stringify({ pravahEventsList }),
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            }
        }
    )
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await pravah24_testDB_one.findByIdAndDelete(id);
    return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 })
}
