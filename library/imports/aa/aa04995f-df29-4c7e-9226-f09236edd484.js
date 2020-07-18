"use strict";
cc._RF.push(module, 'aa049lf3ylMfpIm8JI27dSE', 'Star_1S');
// Script/Star_1S.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        cc.find('The_Data').getComponent('The_Data').onLoad;
        this.Win = this.node.getChildByName('Win');
        this.Win_S = this.Win.getChildByName('Win_S');
        this.Win_Initial_Position = cc.v2(cc.view.getVisibleSize().width, cc.view.getVisibleSize().height);
        this.Win.setPosition(this.Win_Initial_Position);
        this.Win_S.setPosition(this.Win_Initial_Position);
        this.Win_B_Off = false;
        this.Win_S_Off = false;
        this.Win_S_Arr = [];
    },
    start: function start() {
        //cc.director.preloadScene("Scene/1-0");
        this.scheduleOnce(function () {
            this.tryone = true;
            //cc.find('Canvas/BGM/click3bgm').getComponent(cc.AudioSource).volume = 1;
        }, 0.1);
    },
    NewGame: function NewGame() {
        if (this.tryone) {
            this.tryone = false;
            //音效
            //cc.find('Canvas/BGM/click3bgm').getComponent(cc.AudioSource).play();
            if (JSON.parse(cc.sys.localStorage.getItem('Save_List'))) {
                var Save_List = JSON.parse(cc.sys.localStorage.getItem('Save_List'));
                var userData = {
                    name: null,
                    Tool: [],
                    Archive: [],
                    Time: '',
                    The_Scene: 'Scene_1',
                    The_Position: cc.v2(0, 0),
                    Map_Key: []
                };
                //Save_List.push(userData);
                cc.find('The_Data').getComponent('The_Data').Save_List = Save_List;
                cc.find('The_Data').getComponent('The_Data').userData = userData;
                cc.sys.localStorage.setItem('Save_List', JSON.stringify(Save_List));
            } else {
                var _Save_List = [];
                var _userData = {
                    name: null,
                    Tool: [],
                    Archive: [],
                    Time: '',
                    The_Scene: 'Scene_1',
                    The_Position: cc.v2(0, 0),
                    Map_Key: []
                };
                //Save_List.push(userData);
                cc.find('The_Data').getComponent('The_Data').Save_List = _Save_List;
                cc.find('The_Data').getComponent('The_Data').userData = _userData;
                cc.sys.localStorage.setItem('Save_List', JSON.stringify(_Save_List));
            };
            this.scheduleOnce(function () {
                cc.director.loadScene("Scene/Scene_1");
            }, 0.5);
        }
    },
    ContinueTheGame: function ContinueTheGame() {
        //音效
        //cc.find('Canvas/BGM/click3bgm').getComponent(cc.AudioSource).play();
        if (JSON.parse(cc.sys.localStorage.getItem('Save_List'))) {
            this.scheduleOnce(function () {
                var Save_List = JSON.parse(cc.sys.localStorage.getItem('Save_List'));
                cc.find('The_Data').getComponent('The_Data').Load_Save(Save_List.length - 1);
            }, 0.5);
        };
    },
    ReadArchive: function ReadArchive() {
        if (!this.Win_B_Off) {
            this.Win_B_Off = true;
            this.Win_S_Off = false;
            if (JSON.parse(cc.sys.localStorage.getItem('Save_List'))) {
                this.Save_List = JSON.parse(cc.sys.localStorage.getItem('Save_List'));
                var New_Archive_news = this.Save_List;
                this.Win.getChildByName('Archive_Win').getChildByName('scrollview').getChildByName('view').getChildByName('content').height = Math.ceil(New_Archive_news.length / 2) * 100;
                this.Archive_Item = this.Win.getChildByName('Archive_Win').getChildByName('scrollview').getChildByName('view').getChildByName('content').getChildByName('Archive_Item');
                for (var i = 0; i < this.Win.getChildByName('Archive_Win').getChildByName('scrollview').getChildByName('view').getChildByName('content').children.length; i++) {
                    if (i > 0) {
                        this.Win.getChildByName('Archive_Win').getChildByName('scrollview').getChildByName('view').getChildByName('content').children[i].destroy();
                    }
                };
                for (var _i = 0; _i < New_Archive_news.length; _i++) {
                    var node = cc.instantiate(this.Win.getChildByName('Archive_Win').getChildByName('scrollview').getChildByName('view').getChildByName('content').getChildByName('Archive_Item'));
                    node.parent = this.Win.getChildByName('Archive_Win').getChildByName('scrollview').getChildByName('view').getChildByName('content');
                    var Archive_Name = New_Archive_news[_i].Time;
                    node.getChildByName('String').getComponent(cc.Label).string = Archive_Name;
                    node.opacity = 255;
                    if (_i % 2 == 0) {
                        var theY = Math.floor(_i / 2);
                        node.setPosition(-110, -40 + -theY * 100);
                    } else {
                        var _theY = Math.floor((_i - 1) / 2);
                        node.setPosition(110, -40 + -_theY * 100);
                    }
                };
                this.Win_B_Off = false;
                this.Win_S_Off = false;
                this.Win.setPosition(cc.v2(0, 0));
            };
        }
    },
    Close_Win: function Close_Win() {
        if (!this.Win_B_Off) {
            this.Win_B_Off = false;
            this.Win_S_Off = false;
            this.Win.setPosition(this.Win_Initial_Position);
        }
    },
    Open_Win_S: function Open_Win_S(event, customEventData) {
        var node = event.target;
        if (!this.Win_B_Off) {
            for (var i = 0; i < node.parent.children.length; i++) {
                node.parent.children[i].getChildByName('Archive_Frame').opacity = 150;
            };
            node.getChildByName('Archive_Frame').opacity = 255;
            this.Win_B_Off = true;
            this.Win_S_Off = false;
            this.Win_S.setPosition(cc.v2(0, 0));
            this.Win_S_Arr = [node.getChildByName('String').getComponent(cc.Label).string, node];
            this.Win_S.getChildByName('Tips_News').getComponent(cc.Label).string = '存档使用';
            this.Win_S.getChildByName('True').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '加载存档';
            this.Win_S.getChildByName('False').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '删除存档';
        }
    },
    True_Win_S: function True_Win_S() {
        this.Win_B_Off = false;
        this.Win_S_Off = false;
        this.Win_S.setPosition(this.Win_Initial_Position);
        if (this.Win_S_Arr[1].name == 'Archive_Item') {
            //cc.log('Value:' + this.Win_S_Arr[0] + 'Node:' + this.Win_S_Arr[1]);
            var Save_List = JSON.parse(cc.sys.localStorage.getItem('Save_List'));
            var The_Value = 0;
            for (var i = 0; i < Save_List.length; i++) {
                if (Save_List[i].Time == this.Win_S_Arr[0]) {
                    The_Value = i;
                }
            };
            //音效
            //cc.find('Canvas/BGM/click3bgm').getComponent(cc.AudioSource).play();
            this.scheduleOnce(function () {
                cc.find('The_Data').getComponent('The_Data').Load_Save(The_Value);
            }, 0.5);
        };
    },
    Cancel_Win_S: function Cancel_Win_S() {
        this.Win_B_Off = false;
        this.Win_S_Off = false;
        this.Win_S.setPosition(this.Win_Initial_Position);
        if (this.Win_S_Arr[1].name == 'Archive_Item') {
            var Save_List = JSON.parse(cc.sys.localStorage.getItem('Save_List'));
            var The_Value = 0;
            for (var i = 0; i < Save_List.length; i++) {
                if (Save_List[i].Time == this.Win_S_Arr[0]) {
                    The_Value = i;
                }
            };
            cc.find('The_Data').getComponent('The_Data').Delete_Save(The_Value);
            this.ReadArchive();
        };
    },
    Close_Win_S: function Close_Win_S() {
        this.Win_B_Off = false;
        this.Win_S_Off = false;
        this.Win_S.setPosition(this.Win_Initial_Position);
    },
    ExitGame: function ExitGame() {
        //音效
        //cc.find('Canvas/BGM/click3bgm').getComponent(cc.AudioSource).play();
        //cc.game.end();
        //
        cc.sys.localStorage.clear();
    }
    // update (dt) {},

});

cc._RF.pop();