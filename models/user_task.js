var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//用户任务表
var UserTask = new Schema({
    user: {
        type: ObjectId,
        ref: "User"
    },
    task: {
        type: ObjectId,
        ref: "Task"
    },
    task_type: {
        type: Number,
        default: 1  //1主线任务   2 支线任务   3副本任务  4青龙任务 5白虎任务
    },
    task_num:{
        type: Number,
        default: 1 
    },
    scenes: {
        type: ObjectId,
        ref: "CombatBeMonster"
    },
    scenes_count: {
        type: Number,
        default: 0
    },
    fation: {
        type: ObjectId,
        ref: "Fation"
    },
    level: {
        type: Number,
        default: 0
    },
    status: {//0待完成 1完成 2放弃
        type: Number,
        default: 0
    },
    update_at: {
        type: Date
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
UserTask.index({
    created_at: 1
})
module.exports = mongoose.model("UserTask", UserTask);