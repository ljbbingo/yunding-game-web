var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//任务表
var Task = new Schema({
    name: String, //任务名称
    info: String,//任务介绍
    level: Number,//领取等级
    task_type: {
        type: Number,
        default: 1  //1主线任务   2 支线任务   3副本任务  4青龙任务 5白虎任务
    },
    task_limit: { //限制领取次数
        type: Number,
        default: 0
    },
    task_day: { //1天 2周 3月
        type: Number,
        default: 0
    },
    //任务编号
    task_num: {
        type: Number,
        default: 0
    },
    need_game_gold: { //领取所需金叶
        type: Number,
        default: 1
    },
    need_repair_num: {//领取所需修为点
        type: Number,
        default: 1
    },
    need_goods: [ //需要的物品¸
        {
            type: ObjectId,
            ref: "Goods"
        }],
    need_goods_num: [{
        id: String,
        count: 0
    }],
    give_goods: [{
        type: ObjectId,
        ref: "Goods"
    }],
    give_goods_num: [{
        id: String,
        count: 0
    }],
    repair_num: {//修为值
        type: Number,
        default: 0
    },
    game_gold: {//游戏金元宝
        type: Number,
        default: 0
    },
    game_silver: {//游戏银币
        type: Number,
        default: 0
    },
    //绑定场景
    scenes: {
        type: ObjectId,
        ref: "CombatBeMonster"
    },
    //挑战次数
    scenes_count: {
        type: Number,
        default: 0
    },
    //帮贡
    contribution_num: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
Task.index({
    created_at: 1
})
module.exports = mongoose.model("Task", Task);