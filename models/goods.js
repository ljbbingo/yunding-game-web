var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//物品表
var Goods = new Schema({
    name: String,
    info: String,//介绍
    img: String,//图片
    type: String, //类型
    level: {  //品次
        type: String,
        default: 0
    },
    rare_level: { //稀有等级  0普通 1难得 2罕见 3稀有 4传说 5神话
        type: Number,
        default: 0
    },
    price_type: { // 银叶1 金叶2  3比武积分
        type: Number,
        default: 0
    },
    price: Number, //固定价格
    style: {
        type: String,
        default: ""
    },
    is_sell: {
        type: Number,
        default: 0 //0不可交易 1可以交易
    },
    is_system_sell: {
        type: Number,
        default: 0  //0不可 1系统商店出售
    },
    type: { // 0默认物品类型  1装备类型
        type: Number,
        default: 0
    },
    use_type: {
        //是否可使用 小于200不可使用    //0不可使用  201宠物兽决  202宠物蛋 203宠物资质丹 204洗练    
        //301人物技能书  302人物属性增加  303临时属性  304飞行符
        //401未鉴定装备  402法宝
        //501战斗道具使用  
        //601特殊任务领取  602礼包  
        type: Number,
        default: 0
    },
    title: {
        type: Number,
        default: -1
    },
    skill_type: {
        type: Number,
        default: 1 //1全新学习   2提升
    },
    skill: {
        type: ObjectId,
        ref: "Skill"
    },
    goods: [{
        type: ObjectId,
        ref: "Goods"
    }],
    equipment: {  //装备原始
        type: ObjectId,
        ref: "Equipment"
    },
    //商品类型
    goods_type: {
        type: ObjectId,
        ref: "GoodsType"
    },
    monster: {
        type: ObjectId,
        ref: "monster"
    },
    task: {
        type: ObjectId,
        ref: "Task"
    },
    exp: { //修为点
        type: Number,
        default: 0
    },
    field_name: [{ //字段名称  （对相应的值影响）
        type: String
    }],
    min_num: { //最小影响值
        type: Number,
        default: 1
    },
    max_num: {//最大影响值
        type: Number,
        default: 1
    },
    sort: {
        type: Number,
        default: 0
    },//排序
    status: {
        type: Number,
        default: 0
    },//状态
    delete: {
        type: Number,
        default: 0 //逻辑删除 1删除
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
Goods.index({
    created_at: 1
})
Goods.index({
    sort: 1
})
module.exports = mongoose.model("Goods", Goods);