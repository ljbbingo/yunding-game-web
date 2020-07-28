var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//怪物表
var Monster = new Schema({
    name: String,
    info: String,
    img: String,
    price: {
        type: Number,
        default: 0
    },
    price_type: { //用户字段，作为扣去的字段
        type: String,
        default: "game_gold"
    },
    type: { //类型  0 普通，1稀有  2传说 3神兽
        type: Number,
        default: 0
    },
    class: { //分类  1是攻击 2是法术 3是肉
        type: Number,
        default: 1
    },
    sell_num: {
        type: Number,
        default: 10
    },
    status: { //宠物状态  0未上架 1系统可出售 
        type: Number,
        default: 0
    },
    growing_num: {  //成长，升级属性增加波动
        type: Number,
        default: 1
    },
    attribute: {
        type: Number, //五行   1金=>2木=>3土=>4水=>5火 
        default: 1
    },
    level: {   //等级
        type: Number,
        default: 1
    },
    str: {   //力量,影响攻击和命中
        type: Number,
        default: 0
    },
    vit: {   //耐力,影响物理防御力
        type: Number,
        default: 0
    },
    agi: {    //耐力,影响物理防御力
        type: Number,
        default: 0
    },
    int: {    //智力,影响法攻和法抗
        type: Number,
        default: 0
    },
    con: {   //体力,影响气血
        type: Number,
        default: 0
    },
    hp: {   //气血值
        type: Number,
        default: 0
    },
    hp_cap: {//气血上限
        type: Number,
        default: 0
    },
    mp: { //魔法值
        type: Number,
        default: 0
    },
    mp_cap: { //魔法上限
        type: Number,
        default: 0
    },
    physical_damage: {    //物理伤害
        type: Number,
        default: 0
    },
    physical_defense: {   //物理防御
        type: Number,
        default: 0
    },
    magic_damage: {    //魔法伤害
        type: Number,
        default: 0
    },
    magic_defense: {     //魔法防御
        type: Number,
        default: 0
    },
    speed: {      //速度
        type: Number,
        default: 0
    },
    hit: {     //命中
        type: Number,
        default: 0
    },
    physical_crit: {//物理暴击
        type: Number,
        default: 0
    },
    magic_crit: { //法术暴击
        type: Number,
        default: 0
    },
    dodge: {     //闪避
        type: Number,
        default: 0
    },
    con_zz: { //体力资质 气血=等级*体力资质*0.002895+体力属性点*成长*7
        type: Number,
        default: 0
    },
    str_zz: { //物理伤害=等级*攻击资质*0.0025+力量属性点*成长*1.6
        type: Number,
        default: 0
    },
    vit_zz: { //物理防御=等级*防御资质*0.003345+耐力属性点*成长*2.4
        type: Number,
        default: 0
    },
    int_zz: { //魔法=等级*法力资质*0.002085+法力属性点*成长*5
        //法术伤害=等级*法力资质*0.000845+魔力属性点*成长*1.3
        //法术防御=等级*法力资质*0.000611+体力属性点*成长*0.3+魔力属性点*成长*0.8+力量属性点+成长*0.48+耐力属性点*成长*0.16
        type: Number,
        default: 0
    },
    speed_zz: { //速度 =等级*速度资质*0.003345+敏捷属性点*成长*1.3
        type: Number,
        default: 0
    },
    dodge_zz: { //闪避 =等级*闪避资质*0.003345+敏捷属性点*成长*1.3
        type: Number,
        default: 0
    },
    exp: {     //经验
        type: Number,
        default: 0
    },
    skill: [
        {//初始技能
            type: ObjectId,
            ref: "Skill"
        },
    ],
    map: { //map地图
        type: Number,
        default: 0
    },
    is_delete: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
Monster.index({
    created_at: 1
})
module.exports = mongoose.model("Monster", Monster);