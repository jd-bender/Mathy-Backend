import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Must include first name.']
    },
    lastName: {
        type: String,
        required: [true, 'Must include last name.']
    },
    age: {
        type: Number
    },
    email: {
        type: String,
        required: [true, 'Must include email address.']
    },

});

const User = mongoose.model('User', userSchema);

export default User;