/**
 * 游戏开始的计时显示容器
 */
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
var ReadyTimer = (function (_super) {
    __extends(ReadyTimer, _super);
    function ReadyTimer() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ReadyTimer.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.initText();
        this.start();
    };
    ReadyTimer.prototype.start = function () {
        console.log("start");
        this.timer = new egret.Timer(1000, 3);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerFunc, this);
        this.timer.start();
        this.showText("Ready 1");
    };
    ReadyTimer.prototype.onTimerFunc = function (evt) {
        console.log("Count", this.count);
        if (this.count == 0) {
            this.showText("Ready2");
        }
        else if (this.count == 1) {
            this.showText("Go!");
        }
        else if (this.count == 2) {
            this.complete();
        }
        this.count++;
    };
    ReadyTimer.prototype.complete = function () {
        this.dispatchEventWith(ReadyTimer.COMPLETE);
    };
    ReadyTimer.prototype.initText = function () {
        this.text = new egret.TextField();
        this.text.text = "xxxxxxxxx";
        this.text.y = this.stage.stageHeight / 2;
        this.text.x = this.stage.stageWidth / 2;
        this.addChild(this.text);
        console.log("initAfter");
    };
    ReadyTimer.prototype.showText = function (text) {
        this.text.text = text;
    };
    ReadyTimer.COMPLETE = "ReadyTimerComplete";
    return ReadyTimer;
}(egret.DisplayObjectContainer));
__reflect(ReadyTimer.prototype, "ReadyTimer");
//# sourceMappingURL=ReadyTimer.js.map