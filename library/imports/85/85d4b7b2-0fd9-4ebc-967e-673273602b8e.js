"use strict";
cc._RF.push(module, '85d4beyD9lOvJZ+ZzJzYCuO', 'Scene_1S');
// Script/Scene_1S.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
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
    update: function update(dt) {}
});

cc._RF.pop();