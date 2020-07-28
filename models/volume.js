var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//兑换券
var Volume = new Schema({
    //使用用户
    user: {
        type: ObjectId,
        ref: "User"
    },
    //状态 0 可用  1已用
    status: {
        type: Number,
        default: 0
    },
    //兑换码
    content: {
        type: String
    },
    update_at: {
        type: Date
    },
    type: { //类型       1套餐1  2套餐2   3套餐3   4套餐4
        type: Number,
        default: 1
    },
    //物品
    goods: {
        type: ObjectId,
        ref: "Goods"
    },
    //价格 圆
    price: {
        type: Number,
        default: 1
    },
    ip: {
        type: String,
        default: ""
    },
    created_at: { //达成时间
        type: Date,
        default: new Date()
    }
});
Volume.index({
    created_at: 1
})
Volume.index({
    content: 1
})
module.exports = mongoose.model("Volume", Volume);