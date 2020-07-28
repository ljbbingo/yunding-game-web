
const mongoose = require('mongoose')
const moment = require('moment')
const UserCode = mongoose.model('UserCode');
const Goods = mongoose.model('Goods');
const User = mongoose.model('User');
const UserGoods = mongoose.model('UserGoods');
var svgCaptcha = require('svg-captcha');
const Volume = mongoose.model("Volume")
exports.sendMailCode = async (req, res) => {
    try {
        let ipStr = req.headers['X-Real-IP'] || req.headers['x-forwarded-for'];
        if (ipStr && ipStr.indexOf(",") > -1) {
            ipStr = ipStr.split(",")[1]
        }
        req.ipStr = ipStr
        let email = req.body.email;
        let time = moment().subtract(30, 'seconds')
        if (!email) {
            return res.json({ code: 404, msg: "请输入邮箱~" })
        }
        let exists = await UserCode.findOne({ ip: req.ipStr, created_at: { $gte: time } })
        if (exists) {
            let t1 = moment()
            let t2 = moment(exists.created_at)
            let m = t2.diff(t1, 'seconds')
            m = 30 + m
            return res.json({ code: 304, msg: "少侠请" + Math.abs(m) + "秒后获取!", data: Math.abs(m) })
        }
        var option = req.query;
        // 验证码，有两个属性，text是字符，data是svg代码
        var code = svgCaptcha.create(option);
        // 保存到session,忽略大小写
        let ucode = new UserCode;
        ucode.code_str = code.text.toLowerCase()
        ucode.email = email;
        ucode.ip = req.ipStr;
        ucode.created_at = new Date();
        console.log("注册验证码:", ucode.code_str)
        let data = await ucode.save();
        return res.json({ code: 200, msg: "success", data: code.data })
    } catch (error) {
        return res.json({ code: 500, msg: "请联系作者，错误:" + error, data: null })
    }
}

//兑换礼包
exports.exchangeVolume = async (req, res) => {
    try {
        let volume = req.body.volume;
        let email = req.body.email
        if (volume.length != 12) {
            return res.json({ code: 400, msg: "兑换码无效1！" })
        }
        let v = await Volume.findOne({
            content: volume,
            status: 0
        })
        if (!v) {
            return res.json({ code: 400, msg: "兑换码无效2！" })
        }
        if (v.status != 0) {
            return res.json({ code: 400, msg: "兑换码已失效！" })
        }
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.json({ code: 400, msg: "无效用户" })
        }
        let goods = await Goods.findById(v.goods)
        if (!goods) {
            return res.json({ code: 200, msg: "兑换失败，相关物品不存在，请联系作者。" })
        }
        if (v.type > 100) {
            let [existsV, ipCount] = await Promise.all([Volume.findOne({ type: v.type, user: user._id }), Volume.countDocuments({ ip: req.ipStr, created_at: { $gte: moment().startOf('days') } })])
            if (existsV) {
                return res.json({ code: 200, msg: "你已兑换过相同礼包。" })
            }
            if (ipCount >= 3) {
                return res.json({ code: 200, msg: "检测到少侠已兑换三次，不能太贪心哦~" })
            }
        }
        let r = await addUserGoodsBase(v.goods, user._id, null, 1)
        if (r) {
            v.status = 1;
            v.update_at = new Date();
            v.user = user._id;
            v.ip = req.ipStr;
            let s = await v.save();
            if (v.type <= 1000) {
                let upcond = {}
                upcond["$inc"] = { sponsor_price: v.price }
                console.log(upcond)
                await User.findByIdAndUpdate(user._id, upcond)
            }
            return res.json({ code: 200, msg: "兑换成功，相关物品已发放。" })
        }
        return res.json({ code: 200, msg: "兑换失败，请联系作者。" })
    } catch (error) {
        return res.json({ code: 200, msg: "兑换失败，请联系作者。" + error })
    }
}

const addUserGoodsBase = async (gid, uid, ueqid, count) => {
    try {
        let goods = await Goods.findById(gid)
        let exists = await UserGoods.findOne({ goods: gid, user: uid });
        let index = -1;
        if (exists) {
            exists.count = count ? (exists.count + count) : 1;
            exists.type = index;
            exists.goods_type = goods.goods_type;
            let r = await exists.save();
        } else {
            let userGoods = new UserGoods;
            userGoods.user = uid;
            userGoods.level = 1
            userGoods.type = 0;
            userGoods.goods_type = goods.goods_type;
            userGoods.price_type = goods.price_type ? goods.price_type : 0;
            userGoods.price = goods.price;
            userGoods.goods = gid;
            userGoods.count = 1;
            let c = await userGoods.save();
        }
        return true;
    } catch (error) {
        return false
    }
}