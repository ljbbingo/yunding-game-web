var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//物品合成图鉴表
var GoodsMap = new Schema({
    child: [{
        type: ObjectId,
        ref: "Goods"
    }],
    parent: [{
        type: ObjectId,
        ref: "Goods"
    }],
    random: [
        {
            pid: String,
            num: Number
        }
    ],
    status: {
        type: Number,
        default: 0
    },//状态
    created_at: {
        type: Date,
        default: new Date()
    }
});
GoodsMap.index({
    created_at: 1
})
module.exports = mongoose.model("GoodsMap", GoodsMap);