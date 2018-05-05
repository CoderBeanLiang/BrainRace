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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ReadyTimer.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.showReady();
    };
    ReadyTimer.prototype.showReady = function () {
        var ready = new egret.Bitmap(RES.getRes("ready_png"));
        ready.anchorOffsetX = ready.width / 2;
        ready.anchorOffsetY = ready.height / 2;
        ready.x = this.stageW / 2;
        ready.y = this.stageH / 2;
        ready.scaleX = 0.6;
        ready.scaleY = 0.6;
        this.addChild(ready);
        // 这段动画是先放大显示再快速闪动三次
        egret.Tween.get(ready).to({ scaleX: 1, scaleY: 1 }, 300)
            .to({ alpha: 0.1 }, 100)
            .to({ alpha: 1.0 }, 100)
            .to({ alpha: 0.1 }, 100)
            .to({ alpha: 1.0 }, 100)
            .to({ alpha: 0.1 }, 100)
            .to({ alpha: 1.0 }, 100)
            .to({ alpha: 0.0 }, 100)
            .call(this.showGo, this);
    };
    ReadyTimer.prototype.showGo = function () {
        this.removeChildren();
        var readyGo = new egret.Bitmap(RES.getRes("ready_go_png"));
        readyGo.anchorOffsetX = readyGo.width / 2;
        readyGo.anchorOffsetY = readyGo.height / 2;
        readyGo.x = this.stageW / 2;
        readyGo.y = this.stageH / 2;
        readyGo.scaleX = 0.9;
        readyGo.scaleY = 0.9;
        readyGo.alpha = 0.8;
        this.addChild(readyGo);
        egret.Tween.get(readyGo).to({ scaleX: 1.2, scaleY: 1.2, alpha: 1.0 }, 300)
            .to({ alpha: 0.0 }, 200)
            .call(this.complete, this);
    };
    ReadyTimer.prototype.complete = function () {
        this.dispatchEventWith(ReadyTimer.COMPLETE);
    };
    ReadyTimer.COMPLETE = "ReadyTimerComplete";
    return ReadyTimer;
}(egret.DisplayObjectContainer));
__reflect(ReadyTimer.prototype, "ReadyTimer");
