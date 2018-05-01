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
        _this.gasInit = 10000;
        _this.gasMax = 50000;
        _this.gasAdd = 100;
        // 当前速度
        _this.currentSpeed = 0;
        // 稳定速度
        _this.fixedSpeed = 20;
        // 方块增速
        _this.addedSpeed = 10;
        // 加速度
        _this.acceleration = 0.5;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFromStage, _this);
        return _this;
    }
    GameContainer.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createGameScene();
    };
    GameContainer.prototype.onRemovedFromStage = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
        this.readyTimer.removeEventListener(ReadyTimer.COMPLETE, this.gameStart, this);
    };
    // 创建场景，指游戏时的场景，路面，车辆，方块等
    GameContainer.prototype.createGameScene = function () {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.stageCenterX = this.stageW / 2;
        this.roadBg = new Background();
        this.addChild(this.roadBg);
        this.car = new Car(this.fixedSpeed, this.acceleration);
        this.car.addEventListener(Car.COMPLETE_STOP, this.gameStop, this);
        this.carWidthHalf = this.car.width / 2;
        this.car.anchorOffsetX = this.carWidthHalf;
        this.car.y = this.stageH / 3 * 2;
        this.car.x = this.stageCenterX;
        this.addChild(this.car);
        var roadLeftEdge = Math.ceil(this.roadBg.getLeftEdge());
        var roadRightEdge = Math.floor(this.roadBg.getRightEdge());
        this.car.setRoadEdge(roadLeftEdge, roadRightEdge);
        this.gas = new Gas(this.gasInit, this.gasMax);
        this.addChild(this.gas);
        this.score = new Score();
        this.addChild(this.score);
        this.score.x = this.stageW - this.score.width;
        this.questionShow = new QuestionShow();
        this.questionShow.anchorOffsetY = this.questionShow.height;
        this.questionShow.y = this.stage.stageHeight;
        this.addChild(this.questionShow);
        // ReadyGo必须最后添加，因为移除时移除的最上层子容器
        this.readyTimer = new ReadyTimer();
        this.readyTimer.addEventListener(ReadyTimer.COMPLETE, this.gameStart, this);
        this.addChild(this.readyTimer);
    };
    GameContainer.prototype.gameStart = function () {
        this.removeChildAt(this.numChildren - 1);
        this.addEventListener(egret.Event.ENTER_FRAME, this.updateGame, this);
        this.touchEnabled = true;
        this.parent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.car.start();
        this.hasGas = true;
    };
    GameContainer.prototype.gameStop = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.updateGame, this);
        this.dispatchEventWith(Car.COMPLETE_STOP);
        // 显示分数或者分发结束事件给Main.ts
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
        this.updateCollision();
        // 获取小车当前速度
        this.currentSpeed = this.car.getCurrentSpeed();
        // 更新其他部件的位置
        this.roadBg.setSpeed(this.currentSpeed);
    };
    GameContainer.prototype.updateCollision = function () {
        // 处理障碍物和汽车的碰撞
        var obstacle = this.roadBg.getObstacle();
        var carTop = UtilObject.BitmapTop(this.car);
        var carRect = this.car.getCarDisplayRect();
        if (this.objectCollision != null) {
            if (!UtilObject.Overlay(carRect, this.objectCollision)) {
                this.onOverlapExit(this.car, this.objectCollision);
                this.objectCollision = null;
            }
        }
        for (var i = 0; i < obstacle.length; ++i) {
            if (UtilObject.BitmapBottom(obstacle[i]) < carTop) {
                break; // 后续障碍物都在汽车上方，不做判断
            }
            else if (UtilObject.Overlay(carRect, obstacle[i])) {
                console.log("overlay");
                // 没油了停止检测
                if (!this.hasGas) {
                    break;
                }
                // 判断答案是否正确
                // 假设调试
                this.onOverlapEnter(this.car, obstacle[i]);
                this.objectCollision = obstacle[i];
                // 理论上同一时刻应仅有一个方块和车产生碰撞，此处应有break
            }
        }
        if (this.gas.getGasLast() <= 0) {
            this.car.stop();
            this.hasGas = false;
        }
        // 获取小车当前速度
        this.currentSpeed = this.car.getCurrentSpeed();
        // 更新其他部件的位置
        this.roadBg.setSpeed(this.currentSpeed);
        this.gas.updateGas(this.currentSpeed);
        this.score.updateScore(this.currentSpeed);
    };
    GameContainer.prototype.onOverlapEnter = function (obj, obs) {
        if (obs instanceof Block) {
            var question = this.roadBg.getQuestion();
            if (question.judge(obs)) {
                // 答案正确
                if (obj instanceof Car) {
                    this.car.addToCurrentSpeed(this.addedSpeed);
                    this.gas.addToGas(this.gasAdd);
                }
            }
            else {
                // 答案错误
                if (obj instanceof Car) {
                    this.car.addToCurrentSpeed(-this.addedSpeed);
                    this.gas.addToGas(-this.gasAdd);
                }
            }
        }
    };
    GameContainer.prototype.onOverlapExit = function (obj, obs) {
        if (obs instanceof Block) {
            var question = this.roadBg.getQuestion();
            if (question.judge(obs)) {
                // 答案正确
                if (obj instanceof Car) {
                    this.roadBg.newQuestion();
                }
            }
            else {
                // 答案错误
            }
        }
    };
    return GameContainer;
}(egret.DisplayObjectContainer));
__reflect(GameContainer.prototype, "GameContainer");
//# sourceMappingURL=GameContainer.js.map