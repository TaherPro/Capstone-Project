import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: [
            {
                itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
                quantity: { type: Number, required: true }
            }
        ],
        status: {
            type: String,
            enum: ["pending", "approveed", "denied"],
            default: "pending"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Request", requestSchema);