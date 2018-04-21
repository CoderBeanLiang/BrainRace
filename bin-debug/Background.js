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
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.road = new Array();
        _this.speed = 10;
        _this.leftEdge = 1;
        _this.rightEdge = 1;
        _this.initMember();
        _this.initListener();
        return _this;
    }
    Background.prototype.setSpeed = function (speed) {
        this.speed = speed;
    };
    Background.prototype.getLeftEdge = function () {
        return this.leftEdge * this.scaleX;
    };
    Background.prototype.getRightEdge = function () {
        return this.rightEdge * this.scaleX;
    };
    Background.prototype.initMember = function () {
    };
    Background.prototype.initListener = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    };
    Background.prototype.createRoad = function () {
        var road = this.road;
        while (road.length == 0 || this.BitmapTop(road[road.length - 1]) > 0) {
            this.appendRoad("road_png");
        }
    };
    Background.prototype.shiftRoad = function () {
        var road = this.road;
        road.shift();
    };
    Background.prototype.appendRoad = function (name) {
        var road = this.road;
        var track = new egret.Bitmap();
        this.touchChildren;
        track.texture = RES.getRes(name);
        track.scaleY = this.stage.stageWidth / track.width;
        track.scaleX = this.stage.stageWidth / track.width;
        if (road.length == 0) {
            track.y = this.stage.stageHeight - this.BitmapHeight(track);
        }
        else {
            track.y = this.BitmapTop(road[road.length - 1]) - this.BitmapHeight(track);
        }
        road.push(track);
        this.addChild(track);
    };
    Background.prototype.onEnterFrame = function (e) {
        var road = this.road;
        for (var i = 0; i < road.length; i++) {
            road[i].y += this.speed;
        }
        if (road.length > 0) {
            if (this.BitmapTop(road[0]) > this.stage.stageHeight) {
                this.shiftRoad();
            }
        }
        if (road.length > 0) {
            var index = road.length - 1;
            if (this.BitmapTop(road[index]) > 0) {
                this.appendRoad("road_png");
            }
        }
    };
    Background.prototype.onAddToStage = function (event) {
        this.createRoad();
    };
    Background.prototype.BitmapTop = function (bitmap) {
        return bitmap.y - bitmap.anchorOffsetY * bitmap.scaleY;
    };
    Background.prototype.BitmapHeight = function (bitmap) {
        return bitmap.height * bitmap.scaleY;
    };
    return Background;
}(egret.DisplayObjectContainer));
__reflect(Background.prototype, "Background");
//# sourceMappingURL=Background.js.map