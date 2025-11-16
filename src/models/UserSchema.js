import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default userSchema
