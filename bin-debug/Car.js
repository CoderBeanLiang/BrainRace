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
        _this.roadLeftEdge = 0;
        _this.roadRightEdge = 1;
        // 当前速度（其实就是指一帧移动多少像素）
        _this.currentSpeed = 0;
        // 期望稳定速度（其实就是指一帧移动多少像素）
        _this.fixedSpeed = 0;
        // 当前稳定速度（小车停止时的稳定速度是0）
        _this.realFixedSpeed = 0;
        // 加速度
        _this.acceleration = 0;
        _this.fixedSpeed = fixedSpeed;
        _this.acceleration = acceleration;
        _this.carBmp = new egret.Bitmap(texture);
        _this.addChild(_this.carBmp);
        _this.carWidthHalf = _this.width / 2;
        return _this;
        //this.addEventListener(egret.TouchEvent.ENTER_FRAME, this., this);
    }
    Car.prototype.start = function () {
        this.realFixedSpeed = this.fixedSpeed;
    };
    Car.prototype.stop = function () {
        this.realFixedSpeed = 0;
    };
    Car.prototype.setRoadEdge = function (left, right) {
        this.roadLeftEdge = left;
        this.roadRightEdge = right;
    };
    Car.prototype.setOffsetX = function (offsetX) {
        this.setCarPosition(offsetX);
    };
    // 设置当前速度的增值
    Car.prototype.addToCurrentSpeed = function (add) {
        this.currentSpeed += add;
    };
    Car.prototype.getCurrentSpeed = function () {
        return this.calculateSpeed();
    };
    // 计算出当前小车速度
    // 车速始终向稳定速度趋近
    Car.prototype.calculateSpeed = function () {
        if (this.currentSpeed < this.realFixedSpeed) {
            this.currentSpeed += this.acceleration;
            if (this.currentSpeed > this.realFixedSpeed) {
                this.currentSpeed = this.realFixedSpeed;
            }
        }
        else if (this.currentSpeed > this.realFixedSpeed) {
            this.currentSpeed -= this.acceleration;
            if (this.currentSpeed < this.realFixedSpeed) {
                this.currentSpeed = this.realFixedSpeed;
            }
        }
        return this.currentSpeed;
    };
    Car.prototype.setCarPosition = function (offsetX) {
        // 当前速度小于 1 说明车子速度过低，应限制横向移动
        if (this.currentSpeed < 1) {
            return;
        }
        var newX = this.x + offsetX;
        if (newX < this.roadLeftEdge + this.carWidthHalf) {
            newX = this.roadLeftEdge + this.carWidthHalf;
        }
        else if (newX > this.roadRightEdge - this.carWidthHalf) {
            newX = this.roadRightEdge - this.carWidthHalf;
        }
        this.x = newX;
    };
    return Car;
}(egret.DisplayObjectContainer));
__reflect(Car.prototype, "Car");
//# sourceMappingURL=Car.js.map