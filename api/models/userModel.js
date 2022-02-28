const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    email: String,
    password: String,
    isAdmin: Boolean,
    year: Number,
    role: String
});