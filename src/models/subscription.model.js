import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,  // who is subscribing
        ref: "User"
    },
    channe: {
        type: Schema.Types.ObjectId,  // one to whom 'subscriber' is subscribing 
        ref: "User"
    }
});


export const subscription = mongoose.model("Subscription", subscriptionSchema)