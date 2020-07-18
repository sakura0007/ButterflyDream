cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {

    },

    start () {

    },

    Open_Win(event, customEventData) {
        //前置衔接Win脚本
        let Win = cc.find('Canvas/Win');
        if (Win) {
            cc.find('Canvas/Win').getComponent('Win').re_start(null, customEventData);
        }
    }
    // update (dt) {},
});
