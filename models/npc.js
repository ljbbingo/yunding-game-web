var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//Npc
var Npc = new Schema({
    name: {
        type: String
    },
    type: {
        type: Number,
        default: 0
    },
    status: { //0正常
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
module.exports = mongoose.model("Npc", Npc);