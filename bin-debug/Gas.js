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
var Gas = (function (_super) {
    __extends(Gas, _super);
    function Gas(gasInit, gasMax) {
        var _this = _super.call(this) || this;
        _this.gas = 0;
        _this.gasMax = 0;
        _this.gas = gasInit;
        _this.gasMax = gasMax;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Gas.prototype.onAddToStage = function () {
        var bg = new egret.Bitmap(RES.getRes("gas_bg_png"));
        this.addChild(bg);
        this.gasRect = new egret.Shape();
        this.gasRect.graphics.beginFill(0xff0000);
        this.gasRect.graphics.drawRect(15, 20, 385, 50);
        this.gasRect.graphics.endFill();
        this.addChild(this.gasRect);
        var mask = new egret.Bitmap(RES.getRes("gas_mask_png"));
        this.addChild(mask);
        this.gasRect.mask = mask;
        this.gasRect.scaleX = this.gas / this.gasMax;
        var line = new egret.Bitmap(RES.getRes("gas_line_png"));
        this.addChild(line);
    };
    Gas.prototype.addToGas = function (add) {
        this.gas += add;
        if (this.gas < 0) {
            this.gas = 0;
        }
        if (this.gas > this.gasMax) {
            this.gas = this.gasMax;
        }
    };
    Gas.prototype.getGasLast = function () {
        return this.gas;
    };
    Gas.prototype.updateGas = function (speed) {
        this.gas -= speed;
        this.gas = Math.floor(this.gas);
        if (this.gas < 0) {
            this.gas = 0;
        }
        this.updateGasAnim();
    };
    Gas.prototype.updateGasAnim = function () {
        this.gasRect.scaleX = this.gas / this.gasMax;
    };
    return Gas;
}(egret.DisplayObjectContainer));
__reflect(Gas.prototype, "Gas");
//# sourceMappingURL=Gas.js.map