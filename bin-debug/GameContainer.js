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
        // 标识小车是否运行
        _this.isRunning = false;
        // 当前速度
        _this.currentSpeed = 0;
        // 稳定速度
        _this.fixedSpeed = 20;
        // 方块增速
        _this.addedSpeed = 1.5;
        // 加速度
        _this.acceleration = 1;
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
        this.roadBg = new Background();
        this.addChild(this.roadBg);
        this.car = new Car(this.fixedSpeed, this.acceleration);
        this.carWidthHalf = this.car.width / 2;
        this.car.anchorOffsetX = this.carWidthHalf;
        this.car.y = this.stageH / 3 * 2;
        this.car.x = this.stageCenterX;
        this.addChild(this.car);
        var roadLeftEdge = Math.ceil(this.roadBg.getLeftEdge());
        var roadRightEdge = Math.floor(this.roadBg.getRightEdge());
        this.car.setRoadEdge(roadLeftEdge, roadRightEdge);
        var readyTimer = new ReadyTimer();
        readyTimer.addEventListener(ReadyTimer.COMPLETE, this.gameStart, this);
        this.addChild(readyTimer);
        // let buttonStop = new eui.Button();
        // buttonStop.label = "stop";
        // buttonStop.x = this.stageW - 100;
        // buttonStop.y = 10;
        // this.addChild(buttonStop);
        // buttonStop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        // let buttonStart = new eui.Button();
        // buttonStart.label = "start";
        // buttonStart.x = this.stageW - 200;
        // buttonStart.y = 10;
        // this.addChild(buttonStart);
        // buttonStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    // private onButtonClick(evt: egret.TouchEvent) {
    //     var button = <eui.Button>evt.target;
    //     if (button.label == "start") {
    //         this.car.start();
    //     } else if (button.label == "stop") {
    //         this.car.stop();
    //     }
    // }
    GameContainer.prototype.gameStart = function () {
        this.removeChildAt(this.numChildren - 1);
        this.addEventListener(egret.Event.ENTER_FRAME, this.updateGame, this);
        this.touchEnabled = true;
        this.parent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.car.start();
    };
    GameContainer.prototype.touchHandler = function (evt) {
        var touchX = evt.localX;
        if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.lastTouchMoveX = touchX;
        }
        else if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
            var offsetX = touchX - this.lastTouchMoveX;
            this.car.setOffsetX(offsetX);
            this.lastTouchMoveX = touchX;
        }
    };
    GameContainer.prototype.updateGame = function () {
        // 因碰撞会影响车速故先检测碰撞
        // 处理障碍物和汽车的碰撞
        var obstacle = this.roadBg.getObstacle();
        var cartop = UtilObject.BitmapTop(this.car);
        for (var i = 0; i < obstacle.length; ++i) {
            if (UtilObject.BitmapBottom(obstacle[i]) < cartop) {
                break; // 后续障碍物都在汽车上方，不做判断
            }
            else if (UtilObject.overlay(this.car, obstacle[i])) {
                console.log("overlay");
                // 判断答案是否正确
                // 假设调试
                this.car.addToCurrentSpeed(this.addedSpeed);
                // 理论上同一时刻应仅有一个方块和车产生碰撞，此处应有break
            }
        }
        // 获取小车当前速度
        this.currentSpeed = this.car.getCurrentSpeed();
        // 更新其他部件的位置
        this.roadBg.setSpeed(this.currentSpeed);
    };
    return GameContainer;
}(egret.DisplayObjectContainer));
__reflect(GameContainer.prototype, "GameContainer");
//# sourceMappingURL=GameContainer.js.map