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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Gas.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0, 0, 200, 50);
        bg.graphics.endFill();
        this.addChild(bg);
        this.gasText = new egret.TextField();
        this.gasText.width = 200;
        this.gasText.height = 50;
        this.gasText.text = "GAS：" + this.gas;
        this.addChild(this.gasText);
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
        this.gasText.text = "GAS：" + this.gas;
    };
    return Gas;
}(egret.DisplayObjectContainer));
__reflect(Gas.prototype, "Gas");
//# sourceMappingURL=Gas.js.map