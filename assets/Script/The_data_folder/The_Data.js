//说明

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        //常驻节点
        cc.game.addPersistRootNode(this.node);
        //重置常驻节点位置
        this.Win_Initial_Position = cc.v2(cc.view.getVisibleSize().width, cc.view.getVisibleSize().height);
        this.node.setPosition(this.Win_Initial_Position);
        //存档列表
        this.Save_List = [];
        //道具列表 未重置
        this.Tool_List = ['道具1', '道具2', '道具3', '道具4', '道具5', '道具6', '道具7', '道具8', '道具9'];
        //正在进行的档
        this.userData = null;
        //存档时间戳 位置
        this.Player_Position = null;
    },

    start () {
        if (JSON.parse(cc.sys.localStorage.getItem('Save_List'))) {
            let Save_List = JSON.parse(cc.sys.localStorage.getItem('Save_List'));
            this.Save_List = Save_List;
        }
    },
    //存档 || 覆盖存档  Value留空为新存档,键入值为覆盖的存档位置
    Make_Save(Value) {
        let New_Time = this.Write_Current_Date();
        let New_The_Scene = cc.director.getScene().name;
        let New_The_Position = cc.find('Canvas/Map').position;
        let Save_List = JSON.parse(cc.sys.localStorage.getItem('Save_List'));
        let userData = this.userData;
        userData.Time = New_Time;
        userData.The_Scene = New_The_Scene;
        userData.The_Position = New_The_Position;
        if (Value >= 0) {
            Save_List[Value] = userData;
        } else {
            Save_List.push(userData);
        };
        this.Save_List = Save_List;
        cc.sys.localStorage.setItem('Save_List', JSON.stringify(Save_List));
    },
    //存档时间返回
    Write_Current_Date() {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth();//得到月份
        var date = now.getDate();//得到日期
        var day = now.getDay();//得到周几
        var hour = now.getHours();//得到小时
        var minu = now.getMinutes();//得到分钟
        var sec = now.getSeconds();//得到秒
        //var MS = now.getMilliseconds();//获取毫秒
        var week;
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (hour < 10) hour = "0" + hour;
        if (minu < 10) minu = "0" + minu;
        if (sec < 10) sec = "0" + sec;
        //if （MS< 100）MS = "0" + MS;
        var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        week = arr_week[day];
        var time = "";
        time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu + ":" + sec + " " + week;
        //设置得到当前日期的函数的执行间隔时间，每1000毫秒刷新一次。
        //var timer = setTimeout("writeCurrentDate()", 1000);
        return time;
    },
    //读档
    Load_Save(Value) {
        let Save_List = JSON.parse(cc.sys.localStorage.getItem('Save_List'));
        let userData = Save_List[Value];
        let The_Scene = '';
        The_Scene = 'Scene/' + userData.The_Scene;
        let The_Position = userData.The_Position;
        cc.director.loadScene(The_Scene);
        this.Player_Position = The_Position;
        this.userData = userData;
    },
    //删除存档
    Delete_Save(Value) {
        let Save_List = JSON.parse(cc.sys.localStorage.getItem('Save_List'));
        Save_List.splice(Value, 1);  
        this.Save_List = Save_List;
        cc.sys.localStorage.setItem('Save_List', JSON.stringify(Save_List));
    }
    // update (dt) {},
});
