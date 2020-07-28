var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//用户记录表
var UserRecording = new Schema({
    user: {
        type: ObjectId,
        ref: "User"
    },
    //装备鉴定次数
    eq_count: {
        type: Number,
        default: 0
    },
    //装备洗练次数
    xilian_count: {
        type: Number,
        default: 0
    },
    //炼妖次数
    lianyao_count: {
        type: Number,
        default: 0
    },
    //战斗次数
    bat_count: {
        type: Number,
        default: 0
    },
    //卖出总价
    sell_price_total: {
        type: Number,
        default: 0
    },
    //收入总价
    income_price_total: {
        type: Number,
        default: 0
    },
    //交税
    tax_total: {
        type: Number,
        default: 0
    },
    //低宝次数
    dibao_count: {
        type: Number,
        default: 0
    },
    //高宝图次数
    gaobao_count: {
        type: Number,
        default: 0
    },
})
module.exports = mongoose.model("UserRecording", UserRecording);