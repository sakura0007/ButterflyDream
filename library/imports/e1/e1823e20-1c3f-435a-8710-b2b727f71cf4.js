"use strict";
cc._RF.push(module, 'e18234gHD9DWocQsrcn9xz0', 'Save_Win');
// Script/BasicLibrary/Save_Win.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.Win = this.node;
        this.Archive_Win = this.node.getChildByName('Archive_Win');
        this.Win_S = this.node.getChildByName('Win_S');
        this.Win_S_Arr = [];
        this.Win_Initial_Position = cc.v2(cc.view.getVisibleSize().width, cc.view.getVisibleSize().height);
        this.node.setPosition(this.Win_Initial_Position);
        this.Win_S.setPosition(this.Win_Initial_Position);
        this.Win_B_Off = false;
        this.Win_S_Off = false;
    },
    start: function start() {},
    re_start: function re_start() {
        var New_Archive_news = cc.find('The_Data').getComponent('The_Data').Save_List;
        this.Display_Content = this.Archive_Win.getChildByName('scrollview').getChildByName('view').getChildByName('content');
        this.Display_Content.height = Math.ceil((New_Archive_news.length + 1) / 2) * 100;
        this.Archive_Item = this.Display_Content.getChildByName('Archive_Item');
        for (var i = 0; i < this.Display_Content.children.length; i++) {
            if (i > 0) {
                this.Display_Content.children[i].destroy();
            }
        };
        //特殊修改 New_Archive_news.length + 1;
        for (var _i = 0; _i < New_Archive_news.length + 1; _i++) {
            var node = null;
            var Archive_Name = null;
            if (_i == New_Archive_news.length) {
                node = this.Archive_Item;
                Archive_Name = '新建存档';
            } else {
                node = cc.instantiate(this.Archive_Item);
                Archive_Name = New_Archive_news[_i].Time;
            }
            node.parent = this.Display_Content;
            node.getChildByName('String').getComponent(cc.Label).string = Archive_Name;
            node.getChildByName('Archive_Frame').opacity = 150;
            node.opacity = 255;
            if (_i % 2 == 0) {
                var theY = Math.floor(_i / 2);
                node.setPosition(-110, -40 + -theY * 100);
            } else {
                var _theY = Math.floor((_i - 1) / 2);
                node.setPosition(110, -40 + -_theY * 100);
            }
        };
        this.node.setPosition(cc.v2(0, 0));
    },
    Choice_Archive_Item: function Choice_Archive_Item(event, customEventData) {
        var node = event.target;
        if (!this.Win_B_Off) {
            for (var i = 0; i < node.parent.children.length; i++) {
                node.parent.children[i].getChildByName('Archive_Frame').opacity = 150;
            };
            node.getChildByName('Archive_Frame').opacity = 255;
            this.Open_Win_S(node.getChildByName('String').getComponent(cc.Label).string, node);
        }
    },
    Open_Win_S: function Open_Win_S(Value, Node) {
        this.Win_B_Off = true;
        this.Win_S_Off = false;
        this.Win_S_Arr = [Value, Node];
        this.Win_S.getChildByName('Tips_News').getComponent(cc.Label).string = '存档使用';
        if (this.Win_S_Arr[0] == '新建存档') {
            this.Win_S.getChildByName('True').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '新建存档';
            this.Win_S.getChildByName('False').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '取消';
        } else {
            this.Win_S.getChildByName('True').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '覆盖存档';
            this.Win_S.getChildByName('False').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '删除存档';
        };
        this.Win_S.setPosition(cc.v2(0, 0));
    },
    Close_Win: function Close_Win() {
        if (!this.Win_B_Off) {
            this.Win_B_Off = false;
            this.Win_S_Off = false;
            this.Win.setPosition(this.Win_Initial_Position);
        }
    },
    True_Win_S: function True_Win_S() {
        this.Win_B_Off = false;
        this.Win_S_Off = false;
        this.Win_S.setPosition(this.Win_Initial_Position);
        //音效
        //cc.find('Canvas/BGM/click3bgm').getComponent(cc.AudioSource).play();
        if (this.Win_S_Arr[0] == '新建存档') {
            cc.log('新建存档 Value:' + this.Win_S_Arr[0] + 'Node:' + this.Win_S_Arr[1]);
            cc.find('The_Data').getComponent('The_Data').Make_Save();
            this.re_start();
        } else {
            cc.log('Value:' + this.Win_S_Arr[0] + 'Node:' + this.Win_S_Arr[1]);
            var Save_List = JSON.parse(cc.sys.localStorage.getItem('Save_List'));
            var The_Value = 0;
            for (var i = 0; i < Save_List.length; i++) {
                if (Save_List[i].Time == this.Win_S_Arr[0]) {
                    The_Value = i;
                }
            };
            //获取新的存档时间
            this.Win_S_Arr[1].getChildByName('String').getComponent(cc.Label).string = cc.find('The_Data').getComponent('The_Data').Write_Current_Date();
            cc.find('The_Data').getComponent('The_Data').Make_Save(The_Value);
            this.re_start();
        };
    },
    Cancel_Win_S: function Cancel_Win_S() {
        this.Win_B_Off = false;
        this.Win_S_Off = false;
        this.Win_S.setPosition(this.Win_Initial_Position);
        if (this.Win_S_Arr[0] != '新建存档') {
            var Save_List = JSON.parse(cc.sys.localStorage.getItem('Save_List'));
            var The_Value = 0;
            for (var i = 0; i < Save_List.length; i++) {
                if (Save_List[i].Time == this.Win_S_Arr[0]) {
                    The_Value = i;
                }
            };
            cc.find('The_Data').getComponent('The_Data').Delete_Save(The_Value);
            this.re_start();
        }
    },
    Close_Win_S: function Close_Win_S() {
        this.Win_B_Off = false;
        this.Win_S_Off = false;
        this.Win_S.setPosition(this.Win_Initial_Position);
    }

    // update (dt) {},

});

cc._RF.pop();