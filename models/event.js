const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema(
    {
        eventName: String,
        eventPhoto: String,
        eventCategoryID: String,
        eventType: String,
        eventRegistrationFee: String,
        eventRegistrationLink: String,
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

const pravah24_DB = mongoose.models.pravah24_DB || mongoose.model("pravah24_DB", eventSchema)

export default pravah24_DB