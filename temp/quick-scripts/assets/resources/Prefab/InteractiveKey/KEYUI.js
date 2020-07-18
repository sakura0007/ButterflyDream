(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Prefab/InteractiveKey/KEYUI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6fbb2neKzVODapgSAs0+YkX', 'KEYUI', __filename);
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
        //# sourceMappingURL=KEYUI.js.map
        