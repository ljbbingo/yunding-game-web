var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//帮派日志表
var FationLog = new Schema({
    content: String,
    user: { //帮主
        type: ObjectId,
        ref: "User"
    },
    fation: {
        type: ObjectId,
        ref: "Fation"
    },
    //类型
    type: {
        type: Number,
        default: 0
    },
    //状态
    status: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
FationLog.index({
    created_at: 1
})
module.exports = mongoose.model("FationLog", FationLog);