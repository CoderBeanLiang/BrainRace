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
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Score.prototype.onAddToStage = function () {
        this.setScoreBmp();
    };
    Score.prototype.updateScore = function (score) {
        this.score += score;
        this.setScoreBmp();
    };
    Score.prototype.showScore = function (score) {
        this.score = score;
        this.setScoreBmp();
    };
    Score.prototype.getScore = function () {
        return this.score;
    };
    Score.prototype.setScoreBmp = function () {
        this.removeChildren();
        var bmpX = 0;
        var scoreText = (this.score / 100).toFixed(2);
        for (var i = scoreText.length - 1; i >= 0; i--) {
            var name_1 = this.getScoreResName(scoreText.charAt(i));
            var bmp = new egret.Bitmap(RES.getRes(name_1));
            bmp.x = bmpX - bmp.width;
            this.addChild(bmp);
            bmpX = bmp.x;
        }
    };
    Score.prototype.getScoreResName = function (char) {
        if ("." == char) {
            return "score_dot_png";
        }
        else {
            return "score_" + char + "_png";
        }
    };
    return Score;
}(egret.DisplayObjectContainer));
__reflect(Score.prototype, "Score");
