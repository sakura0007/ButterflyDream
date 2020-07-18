cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
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
            let Win = cc.instantiate(prefab);
            Win.parent = cc.find('Canvas');
        });
        cc.loader.loadRes('Prefab/Save_Win',cc.Prefab, function (err, prefab) {
            let Save_Win = cc.instantiate(prefab);
            Save_Win.parent = cc.find('Canvas');
        });
    },

    start() {
        //读取存档时的记录
        if (cc.find('The_Data').getComponent('The_Data').Player_Position) {
            this.Map.position = cc.find('The_Data').getComponent('The_Data').Player_Position;
        };
    },
    //存档
    Save_Game(event, customEventData) {
        cc.find('Canvas/Save_Win').getComponent('Save_Win').re_start();
    },

    update(dt) {
        cc.find('Canvas/Map/win_white').getComponent(cc.RigidBody).syncPosition(true);
    },
});
