var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//技能表
var Skill = new Schema({
    name: String, //技能名称
    class: {
        type: Number,
        default: 1  //1人物技能 2宠物技能
    },
    //等级 class=2 0普通 1高级兽决
    high: {
        type: Number,
        default: 0
    },
    race_type: {//种族类型
        type: Number,
        default: 0  //1人->属性均衡增长 2魔->气血防御出众,速度低  3仙->智力魔功 气血略高，速度低  4精灵族 速度快 魔抗略高
    },
    level: {//可学习等级
        type: Number,
        default: 0
    },
    consume_type: { // 消耗类型
        type: Number,  //0消耗mp  1消耗hp  2消耗愤怒
        default: 0
    },
    consume_num: {
        type: Number,
        default: 0
    },
    style: {
        type: String,
        default: ""
    },
    info: { //介绍
        type: String,
        default: ""
    },
    hurt_field: {   //参考的伤害字段，相当于影响的属性
        type: String
    },
    //暴击字段
    crit_field: {
        type: String
    },
    defense_field: {
        type: String //参考的防御字段，相当于影响的属性
    },
    //增益提升字段 如hp
    gain_field: {
        type: String
    },
    //减益提升字段 
    deduction_field: {
        type: String
    },
    type: { //类型
        //101主动技能  102被动技能 
        //201恢复气血 202恢复魔法 203解除封印302
        //301封印物理 302封印法术 303双封 304封印法术和特技 305混乱  306催眠 
        //401增加临时速度  402增加临时伤害 403增加临时防御 405增加法攻  
        //501被物理攻击触发被动  
        //601被魔法攻击触发被动 
        //7宠物状态附体技能（梦幻敏捷、强身等）
        //2001反击
        type: Number,
        default: 1
    },
    is_percentage: { //是否百分比伤害或状态
        type: Number,
        default: 0
    },
    attack_direction: {
        type: Number, //1己方 2对方
        default: 2
    },
    real_damage: { //真实伤害
        type: Number,
        default: 0
    },
    real_damage_highest: {//真实伤害上限
        type: Number,
        default: 100
    },
    min_hurt: {  //最小波动
        type: Number,
        default: 0.5
    },
    max_hurt: {  //最大波动
        type: Number,
        default: 1
    },
    min_hurt_highest: { //最小波动上限
        type: Number,
        default: 0.5
    },
    max_hurt_highest: { //最大波动上限
        type: Number,
        default: 1
    },
    random_rate: {
        type: Number,
        default: 1 //  100则100%触发
    },
    random_rate_highest: { //触发几率上限
        type: Number,
        default: 1
    },
    unit: {  //技能作用单位
        type: Number,
        default: 1
    },
    unit_highest: {  //技能作用单位提升上限
        type: Number,
        default: 1
    },
    icon: {//技能图片
        type: String,
        default: ""
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
Skill.index({
    created_at: 1
})
Skill.virtual('skillInfo').get(function () {
    return {
        _id: this._id,
        name: this.name,
        info: this.info,
        level: this.level,
        consume_num: this.consume_num,
        race_type: (function (_this) {
            if (_this.race_type == 1) {
                return "人"
            } else if (_this.race_type == 2) {
                return "魔"
            } else if (_this.race_type == 3) {
                return "妖"
            } else if (_this.race_type == 4) {
                return "精"
            }
        })(this),
        shurt_field: this.hurt_field,
        hurt_field: (function (_this) {
            // this.hurt_field == "physical_damage" ? "物理伤害" : (this.hurt_field == "magic_damage" ? "魔法伤害" : "治疗恢复"),
            if (_this.hurt_field == "physical_damage") {
                return "物理伤害"
            } else if (_this.hurt_field == "magic_damage") {
                return "魔法伤害"
            }
            else if (_this.hurt_field == "physical_defense") {
                return "物理防御"
            }
            else if (_this.hurt_field == "magic_defense") {
                return "魔法防御"
            }
            else if (_this.hurt_field == "restore_damage") {
                return "治疗恢复"
            }
            else if (_this.hurt_field == "ph_num") {
                return "气血上限"
            }
            else if (_this.hurt_field == "speed") {
                return "速度"
            }
        })(this),

        class: this.class == 1 ? "人物技能" : "宠物技能",
        type: (function (_this) {
            // 1主动技能  2被动技能 3封印技能 4状态技能  5被物理攻击触发被动  6被魔法攻击触发被动
            if (_this.type == 1) {
                return "主动技能"
            } else if (_this.type == 2) {
                return "被动技能"
            } else if (_this.type == 3) {
                return "封印技能"
            } else if (_this.type == 4) {
                return "状态技能 "
            } else if (_this.type == 5) {
                return "被物理攻击触发被动"
            } else if (_this.type == 6) {
                return "被魔法攻击触发被动"
            } else if (_this.type == 7) {
                return "基础属性"
            }
        })(this), //类型  1主动技能  2被动技能
        attack_direction: this.attack_direction == 1 ? "作用己方" : "作用敌方",
        real_damage: this.real_damage,
        min_hurt: this.min_hurt,
        max_hurt: this.max_hurt,
        random_rate_highest: this.random_rate_highest,
        random_rate: this.random_rate + "%",
        unit: this.unit,
        icon: this.icon
    }
})
module.exports = mongoose.model("Skill", Skill);