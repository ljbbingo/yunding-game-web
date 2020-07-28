var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//用户验证码表
var UserCode = new Schema({
    email: {//用户
        type: String
    },
    code: {
        type: Number
    },
    ip:{
        type:String,
        default:""
    },
    code_str: {
        type: String,
        default: ""
    },
    created_at: { //达成时间
        type: Date,
        default: new Date()
    }
});
UserCode.index({
    created_at: 1
})
UserCode.index({
    email: 1
})
module.exports = mongoose.model("UserCode", UserCode);