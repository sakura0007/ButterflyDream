cc.Class({
    extends: cc.Component,

    properties: {
        Map: {
            default: null,
            type: cc.Node,
            displayName: "运动目标地图"
        }
    },
    
    onLoad() {
        this.Node_Animation = 0;
        //物理组件开启
        //cc.director.getPhysicsManager().enabled = true;
        //cc.director.getPhysicsManager().debugDrawFlags = 0;
        //cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //                                            cc.PhysicsManager.DrawBits.e_pairBit |
        //                                            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //                                            cc.PhysicsManager.DrawBits.e_jointBit |
        //                                            cc.PhysicsManager.DrawBits.e_shapeBit;

        this.Player_to_obstacle = false;
    },

    start () {
        this.TiledLayer = cc.find("Canvas/Map/tiledmap/Walking_Lattice").getComponent(cc.TiledLayer);
        this.Walking_Lattice = cc.find("Canvas/Map/tiledmap/Walking_Lattice");
        this.map_TileSize = this.TiledLayer.getMapTileSize();
    },
    TurnStatic() {
        this.Node_Animation = 0;
    },
    TurnUp() {
        this.Node_Animation = 1;
    },
    TurnRight() {
        this.Node_Animation = 2;
    },
    TurnDown() {
        this.Node_Animation = 3;
    },
    TurnLeft() {
        this.Node_Animation = 4;
    },
    update(dt) {
        //获取动画列表
        let anim = this.node.getComponent(cc.Animation);
        //获取是否在播放动画，播放哪个动画
        //上
        let animState1 = anim.getAnimationState(anim.getClips()[0].name);
        let playing1 = animState1.isPlaying;
        //右
        let animState2 = anim.getAnimationState(anim.getClips()[1].name);
        let playing2 = animState2.isPlaying;
        //下
        let animState3 = anim.getAnimationState(anim.getClips()[2].name);
        let playing3 = animState3.isPlaying;
        //左
        let animState4 = anim.getAnimationState(anim.getClips()[3].name);
        let playing4 = animState4.isPlaying;
        //行走动画播放
        if (this.Node_Animation == 0) {
            anim.stop();
        };
        if (this.Node_Animation == 1) {
            //let force = cc.v2(0, -1000);
            //this.Map.getComponent(cc.RigidBody).applyForceToCenter(force);
            //let newVec2 = cc.find("Canvas").convertToWorldSpaceAR(cc.v2(0, this.node.height));
            //let collider = cc.director.getPhysicsManager().testPoint(newVec2);
            //cc.log('newVec2: ' + newVec2 + 'obstacle: ' + cc.find("Canvas/Map/obstacle").getComponent(cc.RigidBody).getWorldPosition());
            //if (collider) {
            //    cc.log('newVec2: ' + newVec2 + 'obstacle: ' + cc.find("Canvas/Map/win_white").getComponent(cc.RigidBody).getWorldPosition());
            //    cc.log('name: ' + collider.node.name);
            //    if (collider.node.name == 'obstacle') {
            //        this.Player_to_obstacle = true;
            //    }
            //}

            let newVec2 = cc.find("Canvas").convertToWorldSpaceAR(cc.v2(0, this.map_TileSize.height));
            let newVec3 = cc.find("Canvas/Map").convertToNodeSpaceAR(newVec2);
            let tile_X = Math.ceil((newVec3.x + this.Walking_Lattice.width / 2) / this.map_TileSize.width) - 1;
            let tile_Y = Math.ceil((this.Walking_Lattice.height / 2 - newVec3.y) / this.map_TileSize.height) - 1;
            let tileGid = this.TiledLayer.getTileGIDAt(tile_X, tile_Y);
            //cc.log('tileGid_is: (' + tile_X + ',' + tile_Y + ')' + tileGid);
            if (tileGid) {
                this.Player_to_obstacle = false;
            } else {
                this.Player_to_obstacle = true;
            }
            if (!this.Player_to_obstacle) {
                this.Map.y += -200 * dt;
            };
            if (!playing1) {
                anim.play(anim.getClips()[0].name);
            };
        };
        if (this.Node_Animation == 2) {
            let newVec2 = cc.find("Canvas").convertToWorldSpaceAR(cc.v2(this.map_TileSize.width, 0));
            let newVec3 = cc.find("Canvas/Map").convertToNodeSpaceAR(newVec2);
            let tile_X = Math.ceil((newVec3.x + this.Walking_Lattice.width / 2) / this.map_TileSize.width) - 1;
            let tile_Y = Math.ceil((this.Walking_Lattice.height / 2 - newVec3.y) / this.map_TileSize.height) - 1;
            let tileGid = this.TiledLayer.getTileGIDAt(tile_X, tile_Y);
            if (tileGid) {
                this.Player_to_obstacle = false;
            } else {
                this.Player_to_obstacle = true;
            };
            if (!this.Player_to_obstacle) {
                this.Map.x += -200 * dt;
            };
            if (!playing2) {
                anim.play(anim.getClips()[1].name);
            };
        };
        if (this.Node_Animation == 3) {
            let newVec2 = cc.find("Canvas").convertToWorldSpaceAR(cc.v2(0, -this.map_TileSize.height));
            let newVec3 = cc.find("Canvas/Map").convertToNodeSpaceAR(newVec2);
            let tile_X = Math.ceil((newVec3.x + this.Walking_Lattice.width / 2) / this.map_TileSize.width) - 1;
            let tile_Y = Math.ceil((this.Walking_Lattice.height / 2 - newVec3.y) / this.map_TileSize.height) - 1;
            let tileGid = this.TiledLayer.getTileGIDAt(tile_X, tile_Y);
            if (tileGid) {
                this.Player_to_obstacle = false;
            } else {
                this.Player_to_obstacle = true;
            };
            if (!this.Player_to_obstacle) {
                this.Map.y += 200 * dt;
            };
            if (!playing3) {
                anim.play(anim.getClips()[2].name);
            };
        };
        if (this.Node_Animation == 4) {
            let newVec2 = cc.find("Canvas").convertToWorldSpaceAR(cc.v2(-this.map_TileSize.width, 0));
            let newVec3 = cc.find("Canvas/Map").convertToNodeSpaceAR(newVec2);
            let tile_X = Math.ceil((newVec3.x + this.Walking_Lattice.width / 2) / this.map_TileSize.width) - 1;
            let tile_Y = Math.ceil((this.Walking_Lattice.height/2 - newVec3.y) / this.map_TileSize.height) - 1;
            let tileGid = this.TiledLayer.getTileGIDAt(tile_X, tile_Y);
            if (tileGid) {
                this.Player_to_obstacle = false;
            } else {
                this.Player_to_obstacle = true;
            };
            if (!this.Player_to_obstacle) {
                this.Map.x += 200 * dt;
            };
            if (!playing4) {
                anim.play(anim.getClips()[3].name);
            };
        };
        //cc.find('Canvas/Map/obstacle').getComponent(cc.RigidBody).syncPosition(true);
    },
});
