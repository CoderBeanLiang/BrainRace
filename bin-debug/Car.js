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
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(texture, fixedSpeed, acceleration) {
        var _this = _super.call(this) || this;
        // 当前速度（其实就是指一帧移动多少像素）
        _this.currentSpeed = 0;
        // 稳定速度（其实就是指一帧移动多少像素）
        _this.fixedSpeed = 0;
        // 加速度
        _this.acceleration = 0;
        _this.fixedSpeed = fixedSpeed;
        _this.acceleration = acceleration;
        _this.carBmp = new egret.Bitmap(texture);
        _this.addChild(_this.carBmp);
        return _this;
        //this.addEventListener(egret.TouchEvent.ENTER_FRAME, this., this);
    }
    Car.prototype.getCurrentSpeed = function () {
        return this.calculateSpeed();
    };
    // 计算出当前小车速度
    // 车速始终向稳定速度趋近
    Car.prototype.calculateSpeed = function () {
        if (this.currentSpeed < this.fixedSpeed) {
            this.currentSpeed += this.acceleration;
            if (this.currentSpeed > this.fixedSpeed) {
                this.currentSpeed = this.fixedSpeed;
            }
        }
        else if (this.currentSpeed > this.fixedSpeed) {
            this.currentSpeed -= this.acceleration;
            if (this.currentSpeed < this.fixedSpeed) {
                this.currentSpeed = this.fixedSpeed;
            }
        }
        return this.currentSpeed;
    };
    return Car;
}(egret.DisplayObjectContainer));
__reflect(Car.prototype, "Car");
//# sourceMappingURL=Car.js.map