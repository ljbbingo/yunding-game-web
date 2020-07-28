var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//用户日志表
var UserLog = new Schema({
    user: { //接收人
        type: ObjectId,
        ref: "User"
    },
    log: {
        type: String
    },
    to: { //参与人
        type: ObjectId,
        ref: "User"
    },
    type: { //类型  1比武 2留言 3购买提示
        type: Number,
        default: 0
    },
    read: {
        type: Number,
        default: 0 //未读  1已读
    },
    mark: {
        type: String
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
UserLog.index({
    created_at: 1
})

module.exports = mongoose.model("UserLog", UserLog);