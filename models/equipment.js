var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//装备表
var Equipment = new Schema({
    name: String,//名称
    type: Number,//装备类型  1武器 2衣服 3头盔 4项链 5腰带 6鞋
    info: String,//介绍
    wear_level: Number,//佩戴等级限制
    style: {
        type: String,
        default: ""
    },
    level: {
        type: Number,
        default: 0
    },//装备等级 +15
    quality: {
        type: Number,
        default: 0
    },//品质
    race_type: { //种族限制 1人 2魔 3妖 4精灵
        type: Number,
        default: 1
    },
    img: String,//装备图片
    created_at: {
        type: Date,
        default: new Date()
    }
});
Equipment.index({
    created_at: 1
})
module.exports = mongoose.model("Equipment", Equipment);