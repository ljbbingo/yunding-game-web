var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//用户技能表
var UserSkill = new Schema({
    name: String, //技能名称
    user: {
        type: ObjectId,
        ref: "User"
    },
    level: {
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
    race_type: {//种族类型
        type: Number,
        default: 0  //1人->属性均衡增长 2魔->气血防御出众,速度低  3仙->智力魔功 气血略高，速度低  4精灵族 速度快 魔抗略高
    },
    skill: {
        type: ObjectId,
        ref: "Skill"
    },
    style: {
        type: String,
        default: ""
    },
    status: { //是否佩戴  0未 1佩戴
        type: Number,
        default: 0
    },
    class: {
        type: Number,
        default: 1  //1人物技能 2宠物技能
    },
    info: { //介绍
        type: String,
        default: ""
    },
    //状态提升字段
    field_name: [{
        type: String
    }],
    hurt_field: {   //参考的伤害字段，相当于影响的属性
        type: String
    },
    defense_field: {
        type: String //参考的防御字段，相当于影响的属性
    },
    //状态提升字段 
    state_field: [{
        type: String
    }],
    type: { //类型
        //101主动技能  102被动技能 
        //201恢复气血 202恢复魔法 203解除封印302
        //301封印物理 302封印法术 303双封 304封印法术和特技 305混乱  306催眠 
        //401增加临时速度  402增加临时伤害 403增加临时防御 405增加法攻  
        //501被物理攻击触发被动  
        //601被魔法攻击触发被动 
        //7宠物状态附体技能（梦幻敏捷、强身等）
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
    min_hurt: {  //最小波动
        type: Number,
        default: 0.5
    },
    max_hurt: {  //最大波动
        type: Number,
        default: 1
    },
    random_rate: {
        type: Number,
        default: 1 //100%触发  随机1-100 取最低值
    },
    unit: {  //技能作用单位
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
UserSkill.index({
    created_at: 1
})
module.exports = mongoose.model("UserSkill", UserSkill);