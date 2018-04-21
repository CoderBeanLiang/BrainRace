var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameContainer = (function (_super) {
    __extends(GameContainer, _super);
    function GameContainer() {
        var _this = _super.call(this) || this;
        // 当前速度
        _this.currentSpeed = 0;
        // 稳定速度
        _this.fixedSpeed = 10;
        // 加速度
        _this.acceleration = 5;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GameContainer.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createGameScene();
    };
    // 创建场景，指游戏时的场景，路面，车辆，方块等
    GameContainer.prototype.createGameScene = function () {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.stageCenterX = this.stageW / 2;
        this.car = new Car(RES.getRes("car_png"), this.fixedSpeed, this.acceleration);
        this.car.anchorOffsetX = this.car.width / 2;
        this.car.y = this.stageH / 3 * 2;
        this.car.x = this.stageCenterX;
        this.addChild(this.car);
        this.gameStart();
    };
    GameContainer.prototype.gameStart = function () {
        this.touchEnabled = true;
        this.parent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
    };
    GameContainer.prototype.touchHandler = function (evt) {
        var touchX = evt.localX;
        console.log("TouchX:", touchX);
        if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
            console.log("Begin:", touchX);
            this.lastTouchMoveX = touchX;
        }
        else if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
            var offsetX = touchX - this.lastTouchMoveX;
            console.log("OffsetX:", offsetX);
            this.car.x = this.car.x + offsetX;
            this.lastTouchMoveX = touchX;
        }
    };
    return GameContainer;
}(egret.DisplayObjectContainer));
__reflect(GameContainer.prototype, "GameContainer");
//# sourceMappingURL=GameContainer.js.map