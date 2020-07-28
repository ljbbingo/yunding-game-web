function initUserTitleText(wear_title) {
    $("#uinfo_title").html(`<div class="u-title t-info" style="
    border:initial;
    padding:0;
    line-height: 12px;
    height: 12px;
    color:${wear_title.color};">${wear_title.title}
    <span class="prompt-box">
            <p style="color:plum;">${wear_title.add_tip}</p>
            <p style="color:gray;">${wear_title.tip}</p>
        </span>
    </div>`)
}
//初始个人信息界面
function initPageUserInfo() {
    pomelo.request("connector.userHandler.userInfo", {
    }, function (data) {
        if (data.code != 200) {
            layer.msg(data.msg, {
                offset: '50%'
            })
            return
        }

        let user = data.user
        $('#current-level').text(data.currentLevelName)
        $('#next-level-name').text(data.nextLevelName)
        $('#next-level-num').text(data.nextLevelGetExp)
        $("#user-xs").text(parseInt(user.game_gold))
        $("#user-ls").text(parseInt(user.game_silver))
        // let hp_w = (user.hp / user.hp_cap * 100).toFixed(0)
        // let mp_w = (user.mp / user.mp_cap * 100).toFixed(0)
        // let fn_w = (user.fn / 150 * 100).toFixed(0)
        // $("#progress-hp").animate({ width: hp_w + "%" })
        // $("#progress-hp").text(parseInt(user.hp))
        // $("#progress-mp").animate({ width: mp_w + "%" })
        // $("#progress-mp").text(parseInt(user.mp))
        // $("#progress-fn").animate({ width: fn_w + "%" })
        // $("#progress-fn").text(parseInt(user.fn))
        if (user.wear_title) {
            initUserTitleText(user.wear_title)
        }
        for (const key in user) {
            if (user.hasOwnProperty(key)) {
                const element = user[key];
                let str = !isNaN(element) ? parseInt(element) : element
                $("#uinfo_" + key).text(str)
            }
        }
        if (user.potential_num > 0) {
            $(".add-user-ptn").css("display", "inherit")
        }
    });
}
//初始队伍列表
function initPageTeamList(mid) {
    pomelo.request("connector.teamHandler.getTeamList", {
        mid: mid,
    }, function (data) {
        if (data.code == 200) {
            $("#team-list").html("")
            $("#my-team-list").html("")
            for (let i = 0; i < data.data.teams.length; i++) {
                const team = data.data.teams[i];
                let is_online = `<i class='layui-icon' style='color:green;'>&#xe643;</i>`
                if (Math.abs(moment(team.start_bat_at).diff(moment(), 'm')) >= 3) {
                    is_online = `<i class='layui-icon'>&#xe643;</i>`
                }
                let team_num = 5
                if (team.combat && team.combat.player_num) {
                    team_num = team.combat.player_num
                }
                $("#team-list").append(`<tr><td>${is_online}</td><td>${team.combat ? team.combat.name : ''}</td><td>` + team.leader.nickname + `</td><td>`
                    + team.users.length + `/${team_num}</td><td><a onclick="addTeamFunc('` + team._id + `')"><i class="layui-icon">&#xe654;</i></a></td></tr>`)
            }
            if (data.data.myTeam) {
                for (let i = 0; i < data.data.myTeam.users.length; i++) {
                    const user = data.data.myTeam.users[i];
                    $("#my-team-list").append(`<tr><td>` + user.nickname + `</td><td>等级:`
                        + user.level + `</td></tr>`)
                }
                if (data.data.myTeam.combat) {
                    $("#bat-screen-id").text(data.data.myTeam.combat.name)
                    $("#bat-screen-id-h").val(data.data.myTeam.combat._id)
                }

            }
            //场景加载
            let screens = data.data.screens
            $("#screen-list").html("")
            for (const item of screens) {
                var mustGoodsArr = "";
                var randomGoodsArr = "";
                for (const mustGoods of item.must_goods) {
                    mustGoodsArr += `<span style='` + mustGoods.style + `background-color:#f2f5f6;'>` + mustGoods.name + `</span>&nbsp;&nbsp;`;
                }
                for (const randomGoods of item.random_goods) {
                    randomGoodsArr += `<span style='` + randomGoods.style + `background-color:#f2f5f6;'>` + randomGoods.name + `</span>&nbsp;&nbsp;`;
                }
                let time = `<i style='color:orchid;' class="layui-icon">&#xe68d;</i> `
                let type_color = ''
                if (item.type == 1) {
                    type_color = "style='color:blueviolet;'"
                } else if (item.type == 2) {
                    type_color = "style='color:red;'"
                } else if (item.type >= 3) {
                    type_color = "style='color:red;font-weight: 600;'"
                }
                let div = `<div class="layui-col-xs4">
                <p>`+ item.name + item.min_level + `~` + item.max_level + `</p>
                <p><i class="layui-icon must-goods">&#xe735;
                        <span class="prompt-box">
                            `+ mustGoodsArr + randomGoodsArr + `
                        </span>
                    </i>${item.is_time == 1 ? time : ''} <i class="layui-icon" ${type_color}>&#xe756;</i> <a
                        onclick="selectBatIdFunc('`+ item._id + `','` + item.name + `')">选择</a></p>
                    </div>`
                $("#screen-list").append(div)
            }
        }
    });
}
//选择场景
function selectBatIdFunc(cbatid, name) {
    pomelo.request("connector.teamHandler.switchCombatScreen", {
        cbatid: cbatid
    }, function (data) {
        if (data.code != 200) {
            layer.msg(data.msg, {
                offset: '50%'
            });
            return;
        } layer.msg(`更换场景【${name}】`, {
            offset: '50%'
        });
        $("#bat-screen-id").text(name)
        $("#bat-screen-id-h").val(cbatid)
    })

}
//加入队伍
function addTeamFunc(tid) {
    pomelo.request("connector.teamHandler.addTeam", {
        tid: tid
    }, function (data) {
        if (data.code == 200) {
            localStorage.setItem("mtid", tid)
            layer.msg("加入成功!", {
                offset: '50%'
            });
            openStartBatFor(1)
            for (let i = 0; i < data.data.users.length; i++) {
                const user = data.data.users[i];
                $("#my-team-list").append(`<tr><td>` + user.nickname + `</td><td>等级:`
                    + user.level + `</td></tr>`)
            }
        } else {
            layer.msg(data.msg, {
                offset: '50%'
            });
            return;
        }
    });
}
//开始战斗
function startBatFunc(type) {
    let batId = $("#bat-screen-id-h").val()
    if (!batId && type != "tower") {
        layer.msg("请选择场景！", {
            offset: '50%'
        });
        return;
    }
    let obj = {}
    let route = 'startCombat'
    if (type == "tower") {
        route = 'startCombatTower'
        obj['tower_num'] = $("#tower_num").val()
    }
    console.log('connector.teamHandler.${route}', `connector.teamHandler.${ route }`)
    pomelo.request(`connector.teamHandler.${route}`, {
        cbatid: batId,
        ...obj
    }, function (data) {
        if (data.code != 200) {
            layer.msg(data.msg, {
                offset: '50%'
            });
            return;
        }
    })
}
function openStartBatFor(type) {
    let is_for_bat = localStorage.getItem('for_bat')
    if (is_for_bat) {
        localStorage.removeItem('for_bat')
        if (is_for_bat) {
            layer.msg("已关闭循环战斗", {
                offset: '50%'
            });
        }
    } else if (!type) {
        localStorage.setItem('for_bat', "1")
        layer.msg("已开启循环战斗", {
            offset: '50%'
        });
    }
}

//升级
var upPlayerLevelFunc = function () {
    pomelo.request("connector.userHandler.upPlayerLevel", {
    }, function (data) {
        if (data.code != 200) {
            layer.msg(data.msg, {
                offset: '50%'
            });
            return;
        }
        $("#logs").append(`<p style='color:red;'>恭喜你提升境界至【` + data.data.cond.nextLevelName + `】,实力更强了~</p>`)
        initPageUserInfo();
        reloadUserTaskFunc();
    })
}

//领取副本任务
var addUserTaskFunc = function (tid) {
    pomelo.request("connector.playerHandler.getCopyTask", {
        tid: tid
    }, function (data) {
        if (data.code != 200) {
            layer.msg(data.msg, {
                offset: '50%'
            });
            return;
        }
        layer.msg(data.msg, { offset: "50%" })
        reloadUserTaskFunc()
    })
}
//刷新我得快捷任务
var reloadUserTaskFunc = function () {
    pomelo.request("connector.userHandler.getUserTask", {
    }, function (data) {
        if (data.code != 200) {
            layer.msg(data.msg, {
                offset: '50%'
            });
            return;
        }
        eachUserTask(data.data)
    })
}