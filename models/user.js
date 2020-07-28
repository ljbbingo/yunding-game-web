
var mongoose = require("mongoose");
const ut = require('../../share/user_title')
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//当前地图
var User = new Schema({
    email: {    //邮箱
        type: String
    },
    pwd: {
        type: String
    },
    race_type: {
        type: Number,
        default: 1
    },
    //武器精修等级
    arms_level: [{ type: Number }],
    //武器精修经验
    arms_exp: [{ type: Number }],
    have_title: [{
        type: Number
    }],
    wear_title: {
        type: Number,
        default: -1
    },
    status: { //状态正常
        type: Number,
        default: 0
    },
    nickname: {
        type: String,
        default: ""
    },
    nickname_color: { //昵称颜色
        type: String
    },
    map: { //当前所在地图
        type: Number,
        default: 1
    },
    game_gold: {  //仙石
        type: Number,
        default: 0
    },
    game_silver: {  //灵石
        type: Number,
        default: 0
    },
    //比武积分
    pk_num: {
        type: Number,
        default: 0
    },
    //宠物积分卷
    pet_num: {
        type: Number,
        default: 0
    },
    xy_num: { //仙蕴值
        type: Number,
        default: 1
    },
    //领取时间
    xy_update_time: {
        type: Date,
        default: Date.now()
    },
    xr_id: { //玩家id
        type: Number
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
    agi: {    //敏捷,影响物理防御力
        type: Number,
        default: 0
    },
    int: {    //智力,影响法攻和法抗
        type: Number,
        default: 0
    },
    con: {   //体质,影响气血
        type: Number,
        default: 0
    },
    potential_num: { //潜力值
        type: Number,
        default: 5
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
    //气血储备
    hp_store: {
        type: Number,
        default: 10000
    },
    //魔法储备
    mp_store: {
        type: Number,
        default: 10000
    },
    fn: { //愤怒值
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
    restore_damage: { //治疗伤害
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
    physical_crit: {     //物理暴击
        type: Number,
        default: 0
    },
    magic_crit: {     //魔法暴击
        type: Number,
        default: 0
    },
    dodge: {     //闪避
        type: Number,
        default: 0
    },

    health_num: {//体力值
        type: Number,
        default: 100
    },
    vitality_num: {//活力
        type: Number,
        default: 0
    },
    exp: {     //经验
        type: Number,
        default: 0
    },
    exp_total: {     //经验总值
        type: Number,
        default: 0
    },
    rank_score: {      //装备评分
        type: Number,
        default: 0
    },
    contribution_num: { //帮贡
        type: Number,
        default: 0
    },
    fation_hp_level: {      //强身等级
        type: Number,
        default: 0
    },
    fation_mp_level: {//冥想
        type: Number,
        default: 0
    },
    fation_speed_level: {      //神速等级
        type: Number,
        default: 0
    },
    fation_drug_level: {       //炼药等级
        type: Number,
        default: 0
    },
    fation_cooking_level: {      //烹饪等级
        type: Number,
        default: 0
    },
    fation_build_level: {      //打造等级
        type: Number,
        default: 0
    },
    fation_mechanism_level: {      //机关术等级
        type: Number,
        default: 0
    },
    fation_zhuibu_level: {//追捕
        type: Number,
        default: 0
    },
    spirit_fruit_num: {      //潜力果兑换数量
        type: Number,
        default: 0
    },
    //累计消耗仙石
    grand_total_gold: {
        type: Number,
        default: 0
    },
    sponsor_price: {       //赞助金额
        type: Number,
        default: 0
    },
    sign_day_num: {       //连续天数
        type: Number,
        default: 0
    },
    last_ip: {       //最后登录ip
        type: String
    },
    register_ip: {//注册ip
        type: String
    },
    sign_day_time: {     //签到日期 2020-1-1
        type: String,
        default: 0
    },
    in_map: { //在地图中显示  1是 0否
        type: Number,
        default: 1
    },
    created_at: {     //创建时间
        type: Date,
        default: Date.now()
    },
    is_login: {
        type: Number,
        default: 0
    },
    last_login_time: {     //最后登录时间
        type: Date,
        default: Date.now()
    }
});
User.virtual('base').get(function () {
    return {
        _id: this._id,
        nickname: this.nickname,
        // race_type: (function (_this) {
        //     if (_this.race_type == 1) {
        //         return "人"
        //     } else if (_this.race_type == 2) {
        //         return "魔"
        //     } else if (_this.race_type == 3) {
        //         return "妖"
        //     } else if (_this.race_type == 4) {
        //         return "精"
        //     } else {
        //         return "无"
        //     }
        // })(this),
        level: this.level,
        rank_score: this.rank_score

    }
})
User.virtual('info').get(function () {
    return {
        _id: this._id,
        // race_type: (function (_this) {
        //     if (_this.race_type == 1) {
        //         return "人"
        //     } else if (_this.race_type == 2) {
        //         return "魔"
        //     } else if (_this.race_type == 3) {
        //         return "妖"
        //     } else if (_this.race_type == 4) {
        //         return "精"
        //     }
        // })(this),
        hp_store: this.hp_store,
        mp_store: this.mp_store,
        xy_update_time: this.xy_update_time,
        nickname: this.nickname,
        nickname_color: this.nickname_color,
        arms_level: this.arms_level,
        arms_exp: this.arms_exp,
        map: this.map,
        wear_title: this.wear_title > -1 ? ut[this.wear_title] : null,
        game_gold: this.game_gold,
        game_silver: this.game_silver,
        xy_num: this.xy_num,
        xr_id: this.xr_id,
        level: this.level,
        str: this.str,
        vit: this.vit,
        agi: this.agi,
        int: this.int,
        con: this.con,
        hp: this.hp,
        hp_cap: this.hp_cap,
        mp: this.mp,
        mp_cap: this.mp_cap,
        fn: this.fn,
        physical_damage: this.physical_damage,
        physical_defense: this.physical_defense,
        magic_damage: this.magic_damage,
        magic_defense: this.magic_defense,
        restore_damage: this.restore_damage,
        speed: this.speed,
        hit: this.hit,
        physical_crit: this.physical_crit,
        magic_crit: this.magic_crit,
        dodge: this.dodge,
        potential_num: this.potential_num,
        exp: this.exp,
        exp_total: this.exp_total,
        rank_score: this.rank_score,
        contribution_num: this.contribution_num,
        fation_hp_level: this.fation_hp_level,
        fation_speed_level: this.fation_speed_level,
        fation_drug_level: this.fation_drug_level,
        fation_cooking_level: this.fation_cooking_level,
        fation_build_level: this.fation_build_level,
        fation_mechanism_level: this.fation_mechanism_level,
        fation_zhuibu_level: this.fation_zhuibu_level,
        fation_mp_level: this.fation_mp_level,
        health_num: this.health_num,
        vitality_num: this.vitality_num
    }
})
User.virtual('rankInfo').get(function () {
    return {
        _id: this._id,
        nickname: this.nickname,
        nickname_color: this.nickname_color,
        arms_level: this.arms_level,
        wear_title: this.wear_title > -1 ? ut[this.wear_title] : null,
        level: this.level,
        hp: this.hp,
        hp_cap: this.hp_cap,
        mp: this.mp,
        mp_cap: this.mp_cap,
        physical_damage: this.physical_damage,
        physical_defense: this.physical_defense,
        magic_damage: this.magic_damage,
        magic_defense: this.magic_defense,
        restore_damage: this.restore_damage,
        speed: this.speed,
        hit: this.hit,
        physical_crit: this.physical_crit,
        magic_crit: this.magic_crit,
        dodge: this.dodge,
        rank_score: this.rank_score,
        fation_hp_level: this.fation_hp_level,
        fation_speed_level: this.fation_speed_level,
        fation_drug_level: this.fation_drug_level,
        fation_cooking_level: this.fation_cooking_level,
        fation_build_level: this.fation_build_level,
        fation_mechanism_level: this.fation_mechanism_level,
        fation_zhuibu_level: this.fation_zhuibu_level,
        fation_mp_level: this.fation_mp_level
    }
})
module.exports = mongoose.model("User", User);
