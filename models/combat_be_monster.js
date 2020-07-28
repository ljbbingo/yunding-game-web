var mongoose = require("mongoose");
var moment = require('moment')
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//场景表
var CombatBeMonster = new Schema({
    name: {
        type: String
    },
    info: {
        type: String,
        default: ""
    },
    img: {
        type: String,
        default: ""
    },

    bat_type: {
        type: Number,
        default: 1  //1日  2星期  3月
    },
    strict_level: {//严格等级限制， 0否1是
        type: Number,
        default: 0
    },
    count: {
        type: Number,
        default: 100
    },
    //type为0或1则是暗雷场景   2以上计算队伍等级并平衡怪物属性
    type: {
        type: Number,
        default: 0//0 普通  1 小副本 2 大副本 3boss 4特殊任务场景
    },
    min_level: {
        type: Number,
        default: 0
    },
    max_level: {
        type: Number,
        default: 0
    },
    monster: [{
        type: ObjectId,
        ref: "Monster"
    }],
    //主怪物id
    main_monster: [{
        type: ObjectId,
        ref: "Monster"
    }],
    //气血加成
    multiply_hp_num: {
        type: Number,
        default: 1
    },
    //主怪属性加
    multiply_num: {
        type: Number,
        default: 1
    },
    must_goods: [{
        type: ObjectId,
        ref: "Goods"
    }],//必掉物品
    random_goods: [{
        type: ObjectId,
        ref: "Goods"
    }],//随机掉落
    random_arr: [{
        gid: String,
        rate: Number
    }],
    repair_num: { //胜利后增加修为
        type: Number,
        default: 0
    },
    health_num: {  //体力值消耗
        type: Number,
        default: 1
    },
    game_gold: {//游戏金元宝
        type: Number,
        default: 0
    },
    game_silver: {//游戏银币
        type: Number,
        default: 0
    },
    is_time: {//限时
        type: Number,
        default: 0
    },
    add_game_field: [{//游戏其他字段增长值
        name: String,
        num: Number
    }],
    created_at: {
        type: Date,
        default: new Date()
    }
});
CombatBeMonster.index({
    created_at: 1
})
CombatBeMonster.virtual('combatBase').get(function () {
    return {
        _id: this._id,
        name: this.name,
        info: this.info,
        img: this.img,
        count: this.count,
        is_time: this.is_time,
        bat_type: this.bat_type,
        type: this.type,
        strict_level: this.strict_level,
        min_level: this.min_level,
        max_level: this.max_level,
        repair_num: this.repair_num,
        health_num: this.health_num,
        must_goods: this.must_goods,
        random_goods: this.random_goods
    }
})
module.exports = mongoose.model("CombatBeMonster", CombatBeMonster);