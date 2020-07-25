const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

// Destructuring
var Schema = mongoose.Schema;

// USER SCHEMA
var userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true,
        },
        lastName: {
            type: String,
            maxlength: 32,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        userInfo: {
            type: String,
            trim: true,
        },
        encry_password: {
            type: String,
            required: true,
        },
        salt: String,
        role: {
            type: Number,
            default: 0,
        },
        purchases: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    } /* Records the time a new entry is made here and stores in the database */
);

// VIRTUAL FIELD
userSchema
    .virtual("password" /* Name of the virtual field */)
    .set(function (password) {
        this._password /* "_" is for secrecy */ = password;
        this.salt = uuidv1(); /* Setting the salt using uuid */
        this.encry_password = this.securePassword(
            password
        ); /* Setting the encrypted password using the method we defined */
    })
    .get(function () {
        return this._password;
    });

// EXTRA METHODS WE NEED 
userSchema.methods = {
    
    // Method to authenticate the password
    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) === this.encry_password;
    },

    // Method to secure the plain password given by the user
    securePassword: function (plainPassword) {
        if (!plainPassword) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainPassword)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
};

module.exports = mongoose.model("User", userSchema);
