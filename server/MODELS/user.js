const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    subscription: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "course"
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("user", userSchema);