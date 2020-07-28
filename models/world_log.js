var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//世界日志表
var WorldLog = new Schema({
    user: {//用户
        type: ObjectId,
        ref: "User"
    },
    level: {   //等级 1 2 3 4 5 
        type: Number,
        default: 1
    },
    min_user_level: {
        type: Number,
        default: 1
    },
    max_user_level: {
        type: Number,
        default: 1
    },
    content: String,
    created_at: { //达成时间
        type: Date,
        default: new Date()
    }
});
WorldLog.index({
    created_at: 1
})
module.exports = mongoose.model("WorldLog", WorldLog);