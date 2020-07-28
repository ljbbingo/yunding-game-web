var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//物品分类表表
var GoodsType = new Schema({
    name: String,
    info: String,//介绍
    created_at: {
        type: Date,
        default: new Date()
    }
});
GoodsType.index({
    created_at: 1
})
module.exports = mongoose.model("GoodsType", GoodsType);