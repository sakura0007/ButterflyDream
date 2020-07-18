(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Scene_1S.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '85d4beyD9lOvJZ+ZzJzYCuO', 'Scene_1S', __filename);
// Script/Scene_1S.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = 0;
        //cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //                                            cc.PhysicsManager.DrawBits.e_pairBit |
        //                                            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //                                            cc.PhysicsManager.DrawBits.e_jointBit |
        //                                            cc.PhysicsManager.DrawBits.e_shapeBit;
        this.Map = cc.find('Canvas/Map');
        //加载预制
        cc.loader.loadRes('Prefab/Win', cc.Prefab, function (err, prefab) {
            //if (err) {
            //    cc.error(err.message || err);
            //    return;
            //}
            //cc.log('Result should be a prefab: ' + (prefab instanceof cc.Prefab));
            var Win = cc.instantiate(prefab);
            Win.parent = cc.find('Canvas');
        });
        cc.loader.loadRes('Prefab/Save_Win', cc.Prefab, function (err, prefab) {
            var Save_Win = cc.instantiate(prefab);
            Save_Win.parent = cc.find('Canvas');
        });
    },
    start: function start() {
        //读取存档时的记录
        if (cc.find('The_Data').getComponent('The_Data').Player_Position) {
            this.Map.position = cc.find('The_Data').getComponent('The_Data').Player_Position;
        };
    },

    //存档
    Save_Game: function Save_Game(event, customEventData) {
        cc.find('Canvas/Save_Win').getComponent('Save_Win').re_start();
    },
    update: function update(dt) {
        cc.find('Canvas/Map/win_white').getComponent(cc.RigidBody).syncPosition(true);
    }
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
        //# sourceMappingURL=Scene_1S.js.map
        