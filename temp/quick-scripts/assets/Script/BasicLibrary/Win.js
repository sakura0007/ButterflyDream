(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/BasicLibrary/Win.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '14372g1JEtBJqGhTW3Sz29W', 'Win', __filename);
// Script/BasicLibrary/Win.js

'use strict';

//API   
//打开button组件参数 re_start(Status_Win||Archive_Win||Set_Win)
//前置常驻节点  cc.find('The_Data').getComponent('The_Data')
cc.Class({
    extends: cc.Component,

    properties: {},
    onLoad: function onLoad() {
        this.Win = this.node;
        this.Status_Win = this.node.getChildByName('Status_Win');
        this.Archive_Win = this.node.getChildByName('Archive_Win');
        this.Set_Win = this.node.getChildByName('Set_Win');
        this.Win_S = this.node.getChildByName('Win_S');
        this.Win_S_Arr = [];
        this.Win_Initial_Position = cc.v2(cc.view.getVisibleSize().width, cc.view.getVisibleSize().height);
        this.node.setPosition(this.Win_Initial_Position);
        this.Win_S.setPosition(this.Win_Initial_Position);
        this.Win_B_Off = false;
        this.Win_S_Off = false;
    },
    start: function start() {
        this.Status_Display_Content = this.Status_Win.getChildByName('scrollview').getChildByName('view').getChildByName('content');
        this.Archive_Display_Content = this.Archive_Win.getChildByName('scrollview').getChildByName('view').getChildByName('content');
        var New_news = cc.find('The_Data').getComponent('The_Data').Tool_List;
        this.Status_Win.getChildByName('scrollview').getChildByName('view').getChildByName('content').height = New_news.length * 40 + 20;
        this.item_example = this.Status_Display_Content.getChildByName('item_example');
        for (var i = 0; i < this.Status_Display_Content.children.length; i++) {
            if (i > 0) {
                this.Status_Display_Content.children[i].destroy();
            }
        };
        for (var _i = 0; _i < New_news.length; _i++) {
            var node = cc.instantiate(this.item_example);
            node.parent = this.Status_Win.getChildByName('scrollview').getChildByName('view').getChildByName('content');
            node.getChildByName('item_string').getComponent(cc.Label).string = New_news[_i];
            node.opacity = 255;
            node.setPosition(-102.2, -10.15 + -_i * 40);
        };

        var New_Archive_news = cc.find('The_Data').getComponent('The_Data').Save_List;
        //let New_Archive_news = [];s
        //New_Archive_news.push('存档1', '存档2', '存档3', '存档4', '存档5', '存档6', '存档7', '存档8', '存档9');
        this.Archive_Win.getChildByName('scrollview').getChildByName('view').getChildByName('content').height = Math.ceil(New_Archive_news.length / 2) * 100;
        this.Archive_Item = this.Archive_Display_Content.getChildByName('Archive_Item');
        for (var _i2 = 0; _i2 < this.Archive_Display_Content.children.length; _i2++) {
            if (_i2 > 0) {
                this.Archive_Display_Content.children[_i2].destroy();
            }
        };
        for (var _i3 = 0; _i3 < New_Archive_news.length; _i3++) {
            var _node = cc.instantiate(this.Archive_Item);
            _node.parent = this.Archive_Win.getChildByName('scrollview').getChildByName('view').getChildByName('content');
            //let Archive_Name = New_Archive_news[i];
            var Archive_Name = New_Archive_news[_i3].Time;
            _node.getChildByName('String').getComponent(cc.Label).string = Archive_Name;
            _node.opacity = 255;
            if (_i3 % 2 == 0) {
                var theY = Math.floor(_i3 / 2);
                _node.setPosition(-110, -40 + -theY * 100);
            } else {
                var _theY = Math.floor((_i3 - 1) / 2);
                _node.setPosition(110, -40 + -_theY * 100);
            }
        };
    },
    re_start: function re_start(event, customEventData) {
        //新读取
        this.start();
        var Status_node = this.Status_Win.getChildByName('scrollview').getChildByName('view').getChildByName('content');
        for (var i = 0; i < Status_node.children.length; i++) {
            Status_node.children[i].getChildByName('item_bg').opacity = 0;
        };
        var Archive_node = this.Archive_Win.getChildByName('scrollview').getChildByName('view').getChildByName('content');
        for (var _i4 = 0; _i4 < Archive_node.children.length; _i4++) {
            Archive_node.children[_i4].getChildByName('Archive_Frame').opacity = 150;
        };
        if (this.Win.x == 0) {
            if (!this.Win_B_Off) {
                if (customEventData == 'Status_Win') {
                    this.Status_Win.setPosition(cc.v2(0, 0));
                    this.Archive_Win.setPosition(this.Win_Initial_Position);
                    this.Set_Win.setPosition(this.Win_Initial_Position);
                }
                if (customEventData == 'Archive_Win') {
                    this.Status_Win.setPosition(this.Win_Initial_Position);
                    this.Archive_Win.setPosition(cc.v2(0, 0));
                    this.Set_Win.setPosition(this.Win_Initial_Position);
                }
                if (customEventData == 'Set_Win') {
                    this.Status_Win.setPosition(this.Win_Initial_Position);
                    this.Archive_Win.setPosition(this.Win_Initial_Position);
                    this.Set_Win.setPosition(cc.v2(0, 0));
                };
                this.node.setPosition(cc.v2(0, 0));
            }
        } else {
            if (customEventData == 'Status_Win') {
                this.Status_Win.setPosition(cc.v2(0, 0));
                this.Archive_Win.setPosition(this.Win_Initial_Position);
                this.Set_Win.setPosition(this.Win_Initial_Position);
            }
            if (customEventData == 'Archive_Win') {
                this.Status_Win.setPosition(this.Win_Initial_Position);
                this.Archive_Win.setPosition(cc.v2(0, 0));
                this.Set_Win.setPosition(this.Win_Initial_Position);
            }
            if (customEventData == 'Set_Win') {
                this.Status_Win.setPosition(this.Win_Initial_Position);
                this.Archive_Win.setPosition(this.Win_Initial_Position);
                this.Set_Win.setPosition(cc.v2(0, 0));
            };
            this.node.setPosition(cc.v2(0, 0));
        }
    },
    Choice_Tool_Item: function Choice_Tool_Item(event, customEventData) {
        var node = event.target;
        //var button = node.getComponent(cc.Button);
        if (!this.Win_B_Off) {
            for (var i = 0; i < node.parent.children.length; i++) {
                node.parent.children[i].getChildByName('item_bg').opacity = 0;
            };
            node.getChildByName('item_bg').opacity = 30;
            this.Open_Win_S(node.getChildByName('item_string').getComponent(cc.Label).string, node);
        }
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
    Choice_Set_Item: function Choice_Set_Item(event, customEventData) {
        var node = event.target;
        //Back_Home  Off_Game
        this.Open_Win_S(node.name, node);
    },
    Open_Win_S: function Open_Win_S(Value, Node) {
        this.Win_B_Off = true;
        this.Win_S_Off = false;
        this.Win_S_Arr = [Value, Node];
        if (this.Win_S_Arr[1].name == 'Archive_Item') {
            this.Win_S.getChildByName('Tips_News').getComponent(cc.Label).string = '存档使用';
            this.Win_S.getChildByName('True').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '加载存档';
            this.Win_S.getChildByName('False').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '删除存档';
        }
        if (this.Win_S_Arr[1].name == 'item_example') {
            this.Win_S.getChildByName('Tips_News').getComponent(cc.Label).string = '确认使用\r\n' + '<' + Value + '>';
            this.Win_S.getChildByName('True').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '确认';
            this.Win_S.getChildByName('False').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '取消';
        }
        if (this.Win_S_Arr[1].name == 'Back_Home') {
            this.Win_S.getChildByName('Tips_News').getComponent(cc.Label).string = '返回游戏菜单';
            this.Win_S.getChildByName('True').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '确认';
            this.Win_S.getChildByName('False').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '取消';
        }
        if (this.Win_S_Arr[1].name == 'Off_Game') {
            this.Win_S.getChildByName('Tips_News').getComponent(cc.Label).string = '结束游戏';
            this.Win_S.getChildByName('True').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '确认';
            this.Win_S.getChildByName('False').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '取消';
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
        //音效
        //cc.find('Canvas/BGM/click3bgm').getComponent(cc.AudioSource).play();
        this.Win_S.setPosition(this.Win_Initial_Position);
        if (this.Win_S_Arr[1].name == 'item_example') {
            var TheNode_Parent = this.Win_S_Arr[1].parent;
            var TheNode_In = false;
            var TheNode_Arr = [];
            for (var i = 0; i < TheNode_Parent.children.length; i++) {
                if (TheNode_In) {
                    TheNode_Arr.push(TheNode_Parent.children[i]);
                };
                if (TheNode_Parent.children[i].getChildByName('item_bg').opacity > 0) {
                    TheNode_In = true;
                };
            };
            this.Win_S_Arr[1].destroy();
            for (var _i5 = 0; _i5 < TheNode_Arr.length; _i5++) {
                var New_Position = cc.v2(TheNode_Arr[_i5].x, TheNode_Arr[_i5].y + 40);
                var actionBy = cc.moveTo(0.5, New_Position);
                TheNode_Arr[_i5].runAction(actionBy);
            };
            var that = this;
            that.scheduleOnce(function () {
                TheNode_Parent.height = (TheNode_Parent.children.length - 1) * 40 + 20;
                //cc.log('children:' + TheNode_Parent.children.length);
            }, 0.1);
        };
        if (this.Win_S_Arr[1].name == 'Archive_Item') {
            cc.log('Value:' + this.Win_S_Arr[0] + 'Node:' + this.Win_S_Arr[1]);
            var Save_List = JSON.parse(cc.sys.localStorage.getItem('Save_List'));
            var The_Value = 0;
            for (var _i6 = 0; _i6 < Save_List.length; _i6++) {
                if (Save_List[_i6].Time == this.Win_S_Arr[0]) {
                    The_Value = _i6;
                }
            };
            this.scheduleOnce(function () {
                cc.find('The_Data').getComponent('The_Data').Load_Save(The_Value);
            }, 0.5);
        };
        if (this.Win_S_Arr[1].name == 'Back_Home') {
            cc.log('Value:' + this.Win_S_Arr[0] + 'Node:' + this.Win_S_Arr[1]);
            this.scheduleOnce(function () {
                cc.director.loadScene("Scene/Star_1");
            }, 0.5);
        };
        if (this.Win_S_Arr[1].name == 'Off_Game') {
            cc.log('Value:' + this.Win_S_Arr[0] + 'Node:' + this.Win_S_Arr[1]);
            this.scheduleOnce(function () {
                cc.game.end();
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
            this.re_start(null, 'Archive_Win');
        }
    },
    Close_Win_S: function Close_Win_S() {
        this.Win_B_Off = false;
        this.Win_S_Off = false;
        this.Win_S.setPosition(this.Win_Initial_Position);
    }
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Win.js.map
        