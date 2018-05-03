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
var GameTopUI = (function (_super) {
    __extends(GameTopUI, _super);
    // 构造
    function GameTopUI(gasInit, gasMax) {
        var _this = _super.call(this) || this;
        // 汽油白边框参数
        _this.gasLineX = 15;
        _this.gasLineY = 10;
        // 这些是汽油不包括白色边框的参数
        _this.gasLeft = 20;
        _this.gasTop = 15;
        _this.gasHeight = 50;
        _this.gasWidth = 420;
        _this.gas = 0;
        _this.gasMax = 0;
        _this.scoreTop = 70;
        _this.scoreRight = 630;
        _this.gas = gasInit;
        _this.gasMax = gasMax;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GameTopUI.prototype.onAddToStage = function () {
        var bg = new egret.Bitmap(RES.getRes("bg_top_png"));
        this.addChild(bg);
        this.gasRect = new egret.Shape();
        this.gasRect.graphics.beginFill(0xff0000);
        this.gasRect.graphics.drawRect(0, 0, this.gasWidth, this.gasHeight);
        this.gasRect.graphics.endFill();
        this.gasRect.x = this.gasLeft;
        this.gasRect.y = this.gasTop;
        this.addChild(this.gasRect);
        var mask = new egret.Bitmap(RES.getRes("gas_mask_png"));
        mask.x = this.gasLineX;
        mask.y = this.gasLineY;
        this.addChild(mask);
        this.gasRect.mask = mask;
        this.gasRect.scaleX = this.gas / this.gasMax;
        var line = new egret.Bitmap(RES.getRes("gas_line_png"));
        line.x = this.gasLineX;
        line.y = this.gasLineY;
        this.addChild(line);
        this.score = new Score();
        this.score.y = this.scoreTop;
        this.score.x = this.scoreRight;
        this.addChild(this.score);
    };
    GameTopUI.prototype.addToGas = function (add) {
        this.gas += add;
        if (this.gas < 0) {
            this.gas = 0;
        }
        if (this.gas > this.gasMax) {
            this.gas = this.gasMax;
        }
    };
    GameTopUI.prototype.getGasLast = function () {
        return this.gas;
    };
    GameTopUI.prototype.getScore = function () {
        return this.score.getScore();
    };
    GameTopUI.prototype.updateScore = function (speed) {
        this.score.updateScore(speed);
    };
    GameTopUI.prototype.updateGas = function (speed) {
        this.gas -= speed;
        this.gas = Math.floor(this.gas);
        if (this.gas < 0) {
            this.gas = 0;
        }
        this.updateGasAnim();
    };
    GameTopUI.prototype.updateGasAnim = function () {
        this.gasRect.scaleX = this.gas / this.gasMax;
    };
    return GameTopUI;
}(egret.DisplayObjectContainer));
__reflect(GameTopUI.prototype, "GameTopUI");
//# sourceMappingURL=GameTopUI.js.map