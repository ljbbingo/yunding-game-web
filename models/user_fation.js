var mongoose = require("mongoose");
const moment = require("moment")
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//玩家帮派
var UserFation = new Schema({
    name: String,
    user: {
        type: ObjectId,
        ref: "User"
    },
    fation: {
        type: ObjectId,
        ref: "Fation"
    },
    //职位
    type: {
        type: Number,
        default: 1 //帮众    2青龙堂主  3白虎堂主  4副帮主  5帮主
    },
    funds_num: {
        type: Number,
        default: 0
    },
    //完成的帮派任务
    task_count: {
        type: Number,
        default: 0
    },
    //总帮贡点
    contribution_num: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
UserFation.index({
    created_at: 1
})

UserFation.virtual('userFationInfo').get(function () {
    return {
        name: this.name,
        use_contribution_num:this.user.contribution_num,
        user: this.user ? this.user.base : {},
        fation: this.fation,
        type_level: this.type,
        type: (function (_this) {
            if (_this.type == 1) {
                return "会员"
            } else if (_this.type == 2) {
                return "精英"
            } else if (_this.type == 3) {
                return "堂主"
            } else if (_this.type == 4) {
                return "副会长"
            } else if (_this.type == 5) {
                return "会长"
            }
        })(this),
        contribution_num: this.contribution_num,
        created_at: moment(this.created_at).format("YYYY-MM-DD")
    }
})
module.exports = mongoose.model("UserFation", UserFation);