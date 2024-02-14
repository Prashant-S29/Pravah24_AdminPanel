const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema(
    {
        eventName: String,
        eventPhoto: String,
        eventCategoryID: String,

        eventRegistrationTeamTypeOne: String,
        eventRegistrationFeeOne: String,
        eventRegistrationLinkOne: String,

        eventRegistrationTeamTypeTwo: String,
        eventRegistrationFeeTwo: String,
        eventRegistrationLinkTwo: String,

        eventRegistrationTeamTypeThree: String,
        eventRegistrationFeeThree: String,
        eventRegistrationLinkThree: String,

        eventRegistrationTeamTypeFour: String,
        eventRegistrationFeeFour: String,
        eventRegistrationLinkFour: String,

        eventRegistrationTeamTypeFive: String,
        eventRegistrationLinkFive: String,
        eventRegistrationFeeFive: String,

        eventRegistrationTeamTypeSix: String,
        eventRegistrationFeeSix: String,
        eventRegistrationLinkSix: String,

        eventRegistrationTeamTypeSeven: String,
        eventRegistrationFeeSeven: String,
        eventRegistrationLinkSeven: String,

        eventDate: String,
        eventTime: String,
        eventVenue: String,
        eventBrochure: String,
        eventMaxParicipationLimit: String,
        eventCurrentParticipation: String,
    }, {
    timestamps: true,
}
)

const pravah24_testDB_one = mongoose.models.pravah24_testDB_one || mongoose.model("pravah24_testDB_one", eventSchema)

export default pravah24_testDB_one