var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//用户拥有的物品表
var UserGoods = new Schema({
    user: {//用户
        type: ObjectId,
        ref: "User"
    },
    goods: {//物品
        type: ObjectId,
        ref: "Goods"
    },
    //商品类型
    goods_type: {
        type: ObjectId,
        ref: "GoodsType"
    },
    type: { // 0默认物品类型  1装备类型
        type: Number,
        default: 0
    },
    rare_level: { //稀有等级  0普通 1难得 2罕见 3稀有 4传说 5神话
        type: Number,
        default: 0
    },
    level: {
        type: String,
    },
    price_type: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    status: {  //0默认 1出售中
        type: Number,
        default: 0
    },
    count: {  //数量
        type: Number,
        default: 1
    },

    name: {
        type: String,
    },
    //装备
    equipment: {  //装备原始
        type: ObjectId,
        ref: "Equipment"
    },
    style: {
        type: String,
        default: ""
    },
    eq_status: {
        type: Number, //0 未佩戴 1已佩戴
        default: 0
    },
    eq_type: Number,//装备类型  1武器 2衣服 3头盔 4项链 5腰带 6鞋
    info: String,//介绍
    wear_level: Number,//佩戴等级限制
    is_special: {//专用 拥有爆属性  则不可交易
        type: Number,
        default: 0
    },
    eq_level: {
        type: Number,
        default: 0
    },//装备等级 +15
    quality: {
        type: Number,
        default: 0
    },//品质
    skill: { //特技
        type: ObjectId,
        ref: "Skill"
    },
    race_type: { //种族限制 1人 2魔 3妖 4精灵
        type: Number,
        default: 1
    },
    img: String,//装备图片
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
    hp_cap: {//气血上限
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
    magic_defense: {   //魔法防御
        type: Number,
        default: 0
    },
    restore_damage: { //治疗
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
    //评分
    score: {
        type: Number,
        default: 0
    },
    base_score: {
        type: Number,
        default: 0
    },
    //出售时间
    sell_at: {
        type: Date
    },
    //打造者
    eq_build_user: {
        type: ObjectId,
        ref: "User"
    },
    //出售价格
    sell_game_gold: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

UserGoods.virtual('userGoodsSellInfo').get(function () {
    return {
        _id: this._id,
        user: this.user.base,
        goods: this.goods,
        isPwd: this.pwd ? true : false,
        type: this.type,
        //商品类型
        goods_type: this.goods_type,
        count: this.count,
        game_gold: this.game_gold,
        end_time: this.end_time,
        status: this.status,
        sell_at: this.sell_at,
        sell_game_gold: this.sell_game_gold,
        created_at: this.created_at,
        name: this.name,
        equipment: this.equipment,
        style: this.style,
        eq_status: this.eq_status,
        eq_type: this.eq_type,
        info: this.info,
        wear_level: this.wear_level,
        is_special: this.is_special,
        eq_level: this.eq_level,
        quality: this.quality,
        skill: this.skill,
        race_type: this.race_type,
        img: this.img,
        str: this.str,
        vit: this.vit,
        agi: this.agi,
        int: this.int,
        con: this.con,
        hp_cap: this.hp_cap,
        mp_cap: this.mp_cap,
        physical_damage: this.physical_damage,
        physical_defense: this.physical_defense,
        magic_damage: this.magic_damage,
        magic_defense: this.magic_defense,
        restore_damage: this.restore_damage,
        speed: this.speed,
        hit: this.int,
        physical_crit: this.physical_crit,
        magic_crit: this.magic_crit,
        dodge: this.dodge,
        //评分
        score: this.score,
        base_score: this.base_score,
        //出售时间
        sell_at: this.sell_at,
        eq_build_user:this.eq_build_user,
        //出售价格
        sell_game_gold: this.sell_game_gold,
    }
})
UserGoods.index({
    created_at: 1
})
UserGoods.index({
    user: 1
})
UserGoods.index({
    user: 1,
    goods: 1
})
UserGoods.index({
    user: -1,
    goods: -1
})
UserGoods.index({
    goods: 1
})
UserGoods.index({
    count: 1
})

module.exports = mongoose.model("UserGoods", UserGoods);