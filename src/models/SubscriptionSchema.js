import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planName: { type: String, required: true },
    pricePerMonth: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date, default: Date.now },
    endsAt: { type: Date }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;