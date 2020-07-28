var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//组队表
var Team = new Schema({
    name: String, //任务名称
    task: {
        type: ObjectId,
        ref: "Task"
    },
    is_show: {
        //显示
        type: Number,
        default: 1
    },
    map: {
        type: Number,
        default: 0
    },
    //正在战斗
    is_bat: {
        type: Number,
        default: 0
    },
    //开始战斗时间
    start_bat_at: {
        type: Date
    },
    //开始战斗时间
    end_bat_at: {
        type: Date
    },
    //挑战场景
    combat: {
        type: ObjectId,
        ref: "CombatBeMonster"
    },
    users: [{
        type: ObjectId,
        ref: "User"
    }],
    min_level: {
        type: Number,
        default: 0
    },
    max_level: {
        type: Number,
        default: 300
    },
    leader: {
        type: ObjectId,
        ref: "User"
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
Team.index({
    created_at: 1
})
Team.virtual('teamInfo').get(function () {
    return {
        _id: this._id,
        name: this.name, //任务名称
        task: this.task,
        map: this.map,
        combat: this.combat,
        users: this.users,
        start_bat_at:this.start_bat_at,
        min_level: this.min_level,
        max_level: this.max_level,
        leader: this.leader ? this.leader.base : {}
    }
})
module.exports = mongoose.model("Team", Team);