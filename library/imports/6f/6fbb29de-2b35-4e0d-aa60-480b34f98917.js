"use strict";
cc._RF.push(module, '6fbb2neKzVODapgSAs0+YkX', 'KEYUI');
// resources/Prefab/InteractiveKey/KEYUI.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {},
    start: function start() {},
    Open_Win: function Open_Win(event, customEventData) {
        //前置衔接Win脚本
        var Win = cc.find('Canvas/Win');
        if (Win) {
            cc.find('Canvas/Win').getComponent('Win').re_start(null, customEventData);
        }
    }
    // update (dt) {},

});

cc._RF.pop();