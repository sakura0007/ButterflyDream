"use strict";
cc._RF.push(module, '99cd7DNb2tHvqQgatPhUvNM', 'Player_1');
// resources/Prefab/Player/Player_1.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        Map: {
            default: null,
            type: cc.Node,
            displayName: "运动目标地图"
        }
    },

    onLoad: function onLoad() {
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
    start: function start() {
        this.TiledLayer = cc.find("Canvas/Map/tiledmap/Walking_Lattice").getComponent(cc.TiledLayer);
        this.Walking_Lattice = cc.find("Canvas/Map/tiledmap/Walking_Lattice");
        this.map_TileSize = this.TiledLayer.getMapTileSize();
    },
    TurnStatic: function TurnStatic() {
        this.Node_Animation = 0;
    },
    TurnUp: function TurnUp() {
        this.Node_Animation = 1;
    },
    TurnRight: function TurnRight() {
        this.Node_Animation = 2;
    },
    TurnDown: function TurnDown() {
        this.Node_Animation = 3;
    },
    TurnLeft: function TurnLeft() {
        this.Node_Animation = 4;
    },
    update: function update(dt) {
        //获取动画列表
        var anim = this.node.getComponent(cc.Animation);
        //获取是否在播放动画，播放哪个动画
        //上
        var animState1 = anim.getAnimationState(anim.getClips()[0].name);
        var playing1 = animState1.isPlaying;
        //右
        var animState2 = anim.getAnimationState(anim.getClips()[1].name);
        var playing2 = animState2.isPlaying;
        //下
        var animState3 = anim.getAnimationState(anim.getClips()[2].name);
        var playing3 = animState3.isPlaying;
        //左
        var animState4 = anim.getAnimationState(anim.getClips()[3].name);
        var playing4 = animState4.isPlaying;
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

            var newVec2 = cc.find("Canvas").convertToWorldSpaceAR(cc.v2(0, this.map_TileSize.height));
            var newVec3 = cc.find("Canvas/Map").convertToNodeSpaceAR(newVec2);
            var tile_X = Math.ceil((newVec3.x + this.Walking_Lattice.width / 2) / this.map_TileSize.width) - 1;
            var tile_Y = Math.ceil((this.Walking_Lattice.height / 2 - newVec3.y) / this.map_TileSize.height) - 1;
            var tileGid = this.TiledLayer.getTileGIDAt(tile_X, tile_Y);
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
            var _newVec = cc.find("Canvas").convertToWorldSpaceAR(cc.v2(this.map_TileSize.width, 0));
            var _newVec2 = cc.find("Canvas/Map").convertToNodeSpaceAR(_newVec);
            var _tile_X = Math.ceil((_newVec2.x + this.Walking_Lattice.width / 2) / this.map_TileSize.width) - 1;
            var _tile_Y = Math.ceil((this.Walking_Lattice.height / 2 - _newVec2.y) / this.map_TileSize.height) - 1;
            var _tileGid = this.TiledLayer.getTileGIDAt(_tile_X, _tile_Y);
            if (_tileGid) {
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
            var _newVec3 = cc.find("Canvas").convertToWorldSpaceAR(cc.v2(0, -this.map_TileSize.height));
            var _newVec4 = cc.find("Canvas/Map").convertToNodeSpaceAR(_newVec3);
            var _tile_X2 = Math.ceil((_newVec4.x + this.Walking_Lattice.width / 2) / this.map_TileSize.width) - 1;
            var _tile_Y2 = Math.ceil((this.Walking_Lattice.height / 2 - _newVec4.y) / this.map_TileSize.height) - 1;
            var _tileGid2 = this.TiledLayer.getTileGIDAt(_tile_X2, _tile_Y2);
            if (_tileGid2) {
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
            var _newVec5 = cc.find("Canvas").convertToWorldSpaceAR(cc.v2(-this.map_TileSize.width, 0));
            var _newVec6 = cc.find("Canvas/Map").convertToNodeSpaceAR(_newVec5);
            var _tile_X3 = Math.ceil((_newVec6.x + this.Walking_Lattice.width / 2) / this.map_TileSize.width) - 1;
            var _tile_Y3 = Math.ceil((this.Walking_Lattice.height / 2 - _newVec6.y) / this.map_TileSize.height) - 1;
            var _tileGid3 = this.TiledLayer.getTileGIDAt(_tile_X3, _tile_Y3);
            if (_tileGid3) {
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
    }
});

cc._RF.pop();