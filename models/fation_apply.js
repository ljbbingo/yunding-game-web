var mongoose = require("mongoose");
var moment = require("moment")
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//帮派申请表
var FationApply = new Schema({
    user: { //玩家
        type: ObjectId,
        ref: "User"
    },
    fation: {
        type: ObjectId,
        ref: "Fation"
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
FationApply.index({
    created_at: 1
})

FationApply.virtual('fationApplyInfo').get(function () {
    return {
        _id: this._id,
        user: this.user ? this.user.base : {},
        fation: this.fation,
        created_at: moment(this.created_at).format("YYYY-MM-DD HH:mm")
    }
})
module.exports = mongoose.model("FationApply", FationApply);