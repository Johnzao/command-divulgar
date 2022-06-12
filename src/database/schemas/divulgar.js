const { Schema, model } = require("mongoose");

const DivulgarSchema = Schema({
    userId: String,
    createdAt: Number,
})

module.exports = model("Divulgar", DivulgarSchema);