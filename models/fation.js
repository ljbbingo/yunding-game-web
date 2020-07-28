var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//Fish表
var Fation = new Schema({
    name: String,
    info: String,
    user: { //帮主
        type: ObjectId,
        ref: "User"
    },
    fation_id: {
        type: Number,
        default: 0
    },
    //总帮贡点
    contribution_num: {
        type: Number,
        default: 0
    },
    //资金
    funds_num: {
        type: Number,
        default: 0
    },
    //药房等级  影响 部分技能等级
    pharmacy_level: {
        default: 1,
        type: Number
    },
    //锻造等级 影响 部分技能等级
    forging_level: {
        type: Number,
        default: 1
    },
    //练功等级
    practice_level: {
        type: Number,
        default: 1
    },
    //坐镇神兽等级
    god_beast_level: {
        type: Number,
        default: 1
    },
    //pk总场次
    pk_total_count: {
        type: Number,
        default: 0
    },
    //pk胜场
    pk_win_count: {
        type: Number,
        default: 0
    },
    //青龙任务  0关闭 1开启
    task_a_status: {
        type: Number,
        default: 0
    },
    //白虎任务  0 关闭 1开启
    task_b_status: {
        type: Number,
        default: 0
    },
    //玩家人数
    user_count: {
        type: Number,
        default: 1
    },
    //玩家人数上限
    max_user_count: {
        type: Number,
        default: 50
    },
    //状态
    status: {
        type: Number,
        default: 0
    },
    level: {   //等级 1 2 3 4 5 
        type: Number,
        default: 1
    },
    task_count: {
        type: Number,
        default: 150
    },
    max_task_count: {
        type: Number,
        default: 150
    },
    start_task_at: {
        type: Date,
        default: new Date()
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
Fation.index({
    created_at: 1
})
Fation.virtual("fationInfo").get(function () {
    return {
        _id: this._id,
        name: this.name,
        info: this.info,
        user: this.user ? this.user.base : {},
        fation_id: this.fation_id,
        //总帮贡点
        contribution_num: this.contribution_num,
        //资金
        funds_num: this.funds_num,
        //药房等级  影响 部分技能等级
        pharmacy_level: this.pharmacy_level,
        //锻造等级 影响 部分技能等级
        forging_level: this.forging_level,
        //练功等级
        practice_level: this.practice_level,
        //坐镇神兽等级
        god_beast_level: this.god_beast_level,
        //pk总场次
        pk_total_count: this.pk_total_count,
        //pk胜场
        pk_win_count: this.pk_win_count,
        //青龙任务  0关闭 1开启
        task_a_status: this.task_a_status,
        //白虎任务  0 关闭 1开启
        task_b_status: this.task_b_status,
        task_count: this.task_count,
        max_task_count: this.max_task_count,
        //玩家人数
        user_count: this.user_count,
        //玩家人数上限
        max_user_count: this.max_user_count,
        //状态
        status: this.status,
        level: this.level,
        start_task_at: this.start_task_at,
        created_at: this.created_at,
    }
})
module.exports = mongoose.model("Fation", Fation);