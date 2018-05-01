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
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        var _this = _super.call(this) || this;
        _this.score = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Score.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    Score.prototype.init = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0, 0, 200, 50);
        bg.graphics.endFill();
        this.addChild(bg);
        this.scoreText = new egret.TextField();
        this.scoreText.width = 200;
        this.scoreText.height = 50;
        this.scoreText.textAlign = egret.HorizontalAlign.RIGHT;
        this.addChild(this.scoreText);
        this.setText();
    };
    Score.prototype.updateScore = function (score) {
        this.score += score;
        this.setText();
    };
    Score.prototype.getScore = function () {
        return this.score;
    };
    Score.prototype.setText = function () {
        this.scoreText.text = (this.score / 100).toFixed(2) + " 米";
    };
    return Score;
}(egret.DisplayObjectContainer));
__reflect(Score.prototype, "Score");
//# sourceMappingURL=Score.js.map