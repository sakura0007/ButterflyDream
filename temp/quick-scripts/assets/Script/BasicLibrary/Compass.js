(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/BasicLibrary/Compass.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd8251DM8SVIT6KAntsuhZun', 'Compass', __filename);
// Script/BasicLibrary/Compass.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        Compass_Reset: {
            default: true,
            displayName: "重定位",
            tooltip: '是否允许罗盘重定位'
        },
        direction4or8: {
            default: true,
            displayName: "开启8方向",
            tooltip: '4方向和8方向切换，4方向下，组件目标指向可只设置：上-下-左-右'
        },
        turnUP: {
            default: null,
            type: cc.Component.EventHandler,
            displayName: "向上组件目标",
            tooltip: '控制的功能对象目标（上）'
        },
        turnRIGHT: {
            default: null,
            type: cc.Component.EventHandler,
            displayName: "向右组件目标",
            tooltip: '控制的功能对象目标（右）'
        },
        turnDOWN: {
            default: null,
            type: cc.Component.EventHandler,
            displayName: "向下组件目标",
            tooltip: '控制的功能对象目标（下）'
        },
        turnLEFT: {
            default: null,
            type: cc.Component.EventHandler,
            displayName: "向左组件目标",
            tooltip: '控制的功能对象目标（左）'
        },
        turnRIGHT_UP: {
            default: null,
            type: cc.Component.EventHandler,
            displayName: "向右上组件目标",
            tooltip: '控制的功能对象目标（右上）'
        },
        turnRIGHT_DOWN: {
            default: null,
            type: cc.Component.EventHandler,
            displayName: "向右下组件目标",
            tooltip: '控制的功能对象目标（右下）'
        },
        turnLEFT_DOWN: {
            default: null,
            type: cc.Component.EventHandler,
            displayName: "向左下组件目标",
            tooltip: '控制的功能对象目标（左下）'
        },
        turnLEFT_UP: {
            default: null,
            type: cc.Component.EventHandler,
            displayName: "向左上组件目标",
            tooltip: '控制的功能对象目标（左上）'
        }
    },

    onLoad: function onLoad() {
        this.Compass = this.node;
        this.Compass_parent = this.Compass.parent;
        this.center = this.node.getChildByName('wheel-3');
        if (this.direction4or8) {
            this.node.getChildByName('wheel-1-1').opacity = 255;
            this.node.getChildByName('wheel-1-2').opacity = 0;
        } else {
            this.node.getChildByName('wheel-1-1').opacity = 0;
            this.node.getChildByName('wheel-1-2').opacity = 255;
        };
        this.Compass_initial_position = this.Compass.position;
        this.controlOFF = true;
        this.Canvas = cc.find('Canvas');
        this.UP = this.node.getChildByName('UP');
        this.RIGHT_UP = this.node.getChildByName('RIGHT_UP');
        this.RIGHT = this.node.getChildByName('RIGHT');
        this.RIGHT_DOWN = this.node.getChildByName('RIGHT_DOWN');
        this.DOWN = this.node.getChildByName('DOWN');
        this.LEFT_DOWN = this.node.getChildByName('LEFT_DOWN');
        this.LEFT = this.node.getChildByName('LEFT');
        this.LEFT_UP = this.node.getChildByName('LEFT_UP');
        this.direction_tip_arr = [this.UP, this.RIGHT_UP, this.RIGHT, this.RIGHT_DOWN, this.DOWN, this.LEFT_DOWN, this.LEFT, this.LEFT_UP];
        this.Math_sqrt2 = Math.sqrt(2);
        if (this.Compass_Reset) {
            this.Canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
                var newVec2 = this.Compass_parent.convertToNodeSpaceAR(event.getLocation());
                this.Compass.position = newVec2;
                if (this.direction4or8) {
                    this.Canvas.on(cc.Node.EventType.TOUCH_MOVE, this.move_8, this);
                } else {
                    this.Canvas.on(cc.Node.EventType.TOUCH_MOVE, this.move_4, this);
                }
            }, this);
            this.Canvas.on(cc.Node.EventType.TOUCH_END, function () {
                this.Compass.position = this.Compass_initial_position;
                this.center.position = cc.v2(0, 0);
                this.Tip_arr();
                if (this.direction4or8) {
                    this.Canvas.off(cc.Node.EventType.TOUCH_MOVE, this.move_8, this);
                } else {
                    this.Canvas.off(cc.Node.EventType.TOUCH_MOVE, this.move_4, this);
                }
            }, this);
            this.Canvas.on(cc.Node.EventType.TOUCH_CANCEL, function () {
                this.Compass.position = this.Compass_initial_position;
                this.center.position = cc.v2(0, 0);
                this.Tip_arr();
                if (this.direction4or8) {
                    this.Canvas.off(cc.Node.EventType.TOUCH_MOVE, this.move_8, this);
                } else {
                    this.Canvas.off(cc.Node.EventType.TOUCH_MOVE, this.move_4, this);
                }
            }, this);
        } else {
            this.Compass.on(cc.Node.EventType.TOUCH_START, function () {
                if (this.direction4or8) {
                    this.Canvas.on(cc.Node.EventType.TOUCH_MOVE, this.move_8, this);
                } else {
                    this.Canvas.on(cc.Node.EventType.TOUCH_MOVE, this.move_4, this);
                }
            }, this);
            this.Compass.on(cc.Node.EventType.TOUCH_END, function () {
                this.center.position = cc.v2(0, 0);
                this.Tip_arr();
                if (this.direction4or8) {
                    this.Canvas.off(cc.Node.EventType.TOUCH_MOVE, this.move_8, this);
                } else {
                    this.Canvas.off(cc.Node.EventType.TOUCH_MOVE, this.move_4, this);
                }
            }, this);
            this.Compass.on(cc.Node.EventType.TOUCH_CANCEL, function () {
                this.center.position = cc.v2(0, 0);
                this.Tip_arr();
                if (this.direction4or8) {
                    this.Canvas.off(cc.Node.EventType.TOUCH_MOVE, this.move_8, this);
                } else {
                    this.Canvas.off(cc.Node.EventType.TOUCH_MOVE, this.move_4, this);
                }
            }, this);
        }
    },
    start: function start() {},


    move_8: function move_8(event) {
        var maxRadius = 100;
        var touchPos = event.getLocation();
        var pos = this.Compass.convertToNodeSpaceAR(touchPos);
        var distance = pos.mag();
        if (distance > maxRadius) {
            pos.x = maxRadius * pos.x / distance;
            pos.y = maxRadius * pos.y / distance;
        };
        if (this.controlOFF) {
            this.center.setPosition(pos);
            if (distance > 40) {
                if (this.center.y > 0 && Math.abs(this.center.x / this.center.y) <= 1 / (1 + this.Math_sqrt2)) {
                    this.Tip_arr(this.UP);
                    this.turnUP();
                    cc.log('上');
                }
                if (this.center.x > 0 && this.center.y > 0 && Math.abs(this.center.x / this.center.y) < 1 + this.Math_sqrt2 && Math.abs(this.center.x / this.center.y) >= 1 / (1 + this.Math_sqrt2)) {
                    this.Tip_arr(this.RIGHT_UP);
                    this.turnRIGHT_UP();
                    cc.log('右上');
                }
                if (this.center.x > 0 && Math.abs(this.center.x / this.center.y) >= 1 + this.Math_sqrt2) {
                    this.Tip_arr(this.RIGHT);
                    this.turnRIGHT();
                    cc.log('右');
                }
                if (this.center.x > 0 && this.center.y < 0 && Math.abs(this.center.x / this.center.y) < 1 + this.Math_sqrt2 && Math.abs(this.center.x / this.center.y) >= 1 / (1 + this.Math_sqrt2)) {
                    this.Tip_arr(this.RIGHT_DOWN);
                    this.turnRIGHT_DOWN();
                    cc.log('右下');
                }
                if (this.center.y < 0 && Math.abs(this.center.x / this.center.y) <= 1 / (1 + this.Math_sqrt2)) {
                    this.Tip_arr(this.DOWN);
                    this.turnDOWN();
                    cc.log('下');
                }
                if (this.center.x < 0 && this.center.y < 0 && Math.abs(this.center.x / this.center.y) < 1 + this.Math_sqrt2 && Math.abs(this.center.x / this.center.y) >= 1 / (1 + this.Math_sqrt2)) {
                    this.Tip_arr(this.LEFT_DOWN);
                    this.turnLEFT_DOWN();
                    cc.log('左下');
                }
                if (this.center.x < 0 && Math.abs(this.center.x / this.center.y) >= 1 + this.Math_sqrt2) {
                    this.Tip_arr(this.LEFT);
                    this.turnLEFT();
                    cc.log('左');
                }
                if (this.center.x < 0 && this.center.y > 0 && Math.abs(this.center.x / this.center.y) < 1 + this.Math_sqrt2 && Math.abs(this.center.x / this.center.y) >= 1 / (1 + this.Math_sqrt2)) {
                    this.Tip_arr(this.LEFT_UP);
                    this.turnLEFT_UP();
                    cc.log('左上');
                }
            }
        };
    },
    move_4: function move_4(event) {
        var maxRadius = 100;
        var touchPos = event.getLocation();
        var pos = this.Compass.convertToNodeSpaceAR(touchPos);
        var distance = pos.mag();
        if (distance > maxRadius) {
            pos.x = maxRadius * pos.x / distance;
            pos.y = maxRadius * pos.y / distance;
        };
        if (this.controlOFF) {
            this.center.setPosition(pos);
            if (distance > 40) {
                if (this.center.y > 0 && Math.abs(this.center.x / this.center.y) <= 1) {
                    this.Tip_arr(this.UP);
                    this.turnUP();
                    cc.log('上');
                }
                if (this.center.x > 0 && Math.abs(this.center.x / this.center.y) > 1) {
                    this.Tip_arr(this.RIGHT);
                    this.turnRIGHT();
                    cc.log('右');
                }
                if (this.center.y < 0 && Math.abs(this.center.x / this.center.y) <= 1) {
                    this.Tip_arr(this.DOWN);
                    this.turnDOWN();
                    cc.log('下');
                }
                if (this.center.x < 0 && Math.abs(this.center.x / this.center.y) > 1) {
                    this.Tip_arr(this.LEFT);
                    this.turnLEFT();
                    cc.log('左');
                }
            }
        };
    },
    Tip_arr: function Tip_arr(Node) {
        for (var i = 0; i < this.direction_tip_arr.length; i++) {
            this.direction_tip_arr[i].opacity = 0;
            if (i == this.direction_tip_arr.length - 1 && Node) {
                Node.opacity = 255;
                //cc.log('name:' + Node.name);
            }
        }
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
        //# sourceMappingURL=Compass.js.map
        