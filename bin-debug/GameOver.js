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
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver(info) {
        var _this = _super.call(this) || this;
        _this.info = info;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GameOver.prototype.init = function () {
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x000000);
        mask.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        mask.graphics.endFill();
        mask.alpha = 0.75;
        this.addChild(mask);
        var score = new Score();
        score.showScore(this.info);
        score.anchorOffsetX = -score.width / 2; // Score数字是从后往前添加，所以默认锚点0在右侧
        score.x = this.stage.stageWidth / 2;
        score.y = this.stage.stageHeight / 3;
        score.scaleX = 2;
        score.scaleY = 2;
        this.addChild(score);
        var retry = new egret.Bitmap(RES.getRes("retry_png"));
        retry.touchEnabled = true;
        retry.anchorOffsetX = retry.width / 2;
        retry.anchorOffsetY = retry.height / 2;
        retry.x = this.stage.stageWidth / 2;
        retry.y = this.stage.stageHeight * 0.65;
        retry.once(egret.TouchEvent.TOUCH_TAP, this.onRetry, this);
        this.addChild(retry);
        var home = new egret.Bitmap(RES.getRes("icon_home_png"));
        home.touchEnabled = true;
        home.x = 20;
        home.y = 20;
        home.once(egret.TouchEvent.TOUCH_TAP, this.onHome, this);
        this.addChild(home);
    };
    GameOver.prototype.onRetry = function () {
        this.dispatchEventWith(GameOver.GAME_OVER_RETRY);
    };
    GameOver.prototype.onHome = function () {
        this.dispatchEventWith(GameOver.GAME_OVER_HOME);
    };
    GameOver.GAME_OVER_RETRY = "GameOverRetry";
    GameOver.GAME_OVER_HOME = "GameOverHome";
    return GameOver;
}(egret.DisplayObjectContainer));
__reflect(GameOver.prototype, "GameOver");
//# sourceMappingURL=GameOver.js.map