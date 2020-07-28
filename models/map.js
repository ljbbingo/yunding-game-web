var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//当前地图
var Map = new Schema({
    name: {
        type: String,
        default: ""
    },
    icon: {
        type: String
    },
    info: {
        type: String,
        default: ""
    },
    //最小进入等级
    min_level: {
        type: Number,
        default: 0
    },
    //最大进入等级
    max_level: {
        type: Number,
        default: 0
    },
    //是否强制限制等级
    is_limit:{
        type: Number,
        default: 0  //1是
    },
    type: {
        type: Number,
        default: 0
    },
    up_map: [{ //上一个地图
        type: ObjectId,
        ref: "Map"
    }],
    next_map: [{ //下一个地图
        type: ObjectId,
        ref: "Map"
    }],
    npcs: [{
        type: ObjectId,
        ref: "Npc"
    }],
    status: { //0正常
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
module.exports = mongoose.model("Map", Map);