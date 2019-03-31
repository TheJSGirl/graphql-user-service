const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({

    name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    userName: {
        type: String,
        trim: true
    },
    image: {
        type: String,
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
        trim: true
    },
}, { strict: true, timestamps: true });

userSchema.methods = {
    toJSON() {
        return {
            id: this._id,
            name: this.name,
            email: this.email,
            mobile: this.mobile,
            image: this.image,
            userName: this.userName
        }
    }
}

module.exports = mongoose.model('User', userSchema);
