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
        _this.speed = 0;
        _this.leftEdge = 120;
        _this.rightEdge = 520;
        _this.obstacle = new Array();
        _this.offset = 200;
        _this.interval = 50;
        _this.initMember();
        _this.initListener();
        return _this;
    }
    Background.prototype.setSpeed = function (speed) {
        this.speed = speed;
    };
    Background.prototype.getLeftEdge = function () {
        var road = this.road;
        if (road.length == 0) {
            return this.leftEdge;
        }
        return this.leftEdge * road[0].scaleX;
    };
    Background.prototype.getRightEdge = function () {
        var road = this.road;
        if (road.length == 0) {
            return this.rightEdge;
        }
        return this.rightEdge * road[0].scaleX;
    };
    Background.prototype.getRoadWith = function () {
        return this.getRightEdge() - this.getLeftEdge();
    };
    // 返回障碍物列表
    Background.prototype.getObstacle = function () {
        return this.obstacle;
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
        var track = road.shift();
        this.removeChild(track);
    };
    Background.prototype.appendRoad = function (name) {
        var road = this.road;
        var track = new egret.Bitmap();
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
        this.addChildAt(track, 0);
    };
    Background.prototype.appendObstacle = function (name) {
        var obstacle = this.obstacle;
        var block = this.produceObstacle();
        block.x = Math.random() * (this.getRoadWith() - block.width) + this.getLeftEdge();
        if (obstacle.length == 0) {
            block.y = 0 - this.BitmapHeight(block);
        }
        else {
            var offset = this.interval + Math.random() * this.offset;
            block.y = this.BitmapTop(obstacle[obstacle.length - 1]) - this.BitmapHeight(block) - offset;
        }
        obstacle.push(block);
        this.addChildAt(block, 100);
    };
    Background.prototype.shiftObstacle = function () {
        var obstacle = this.obstacle;
        var block = obstacle.shift();
        this.removeChild(block);
    };
    Background.prototype.produceObstacle = function () {
        var color = BlockParam.getRandomColor();
        return Block.produce(BlockParam.TYPE_COLOR, color);
    };
    Background.prototype.onEnterFrame = function (e) {
        var road = this.road;
        var obstacle = this.obstacle;
        for (var i = 0; i < road.length; i++) {
            road[i].y += this.speed;
        }
        for (var i = 0; i < obstacle.length; i++) {
            obstacle[i].y += this.speed;
        }
        // 删除窗口底部的路面
        if (road.length > 0) {
            if (this.BitmapTop(road[0]) > this.stage.stageHeight) {
                this.shiftRoad();
            }
        }
        // 添加窗口顶部的路面
        if (road.length > 0) {
            var index = road.length - 1;
            if (this.BitmapTop(road[index]) > 0) {
                this.appendRoad("road_png");
            }
        }
        // 删除窗口底部的障碍物
        if (obstacle.length > 0) {
            if (this.BitmapTop(obstacle[0]) > this.stage.stageHeight) {
                this.shiftObstacle();
            }
        }
        // 删除窗口顶部的障碍物
        if (obstacle.length > 0) {
            var index = obstacle.length - 1;
            if (this.BitmapTop(obstacle[index]) > 0) {
                this.appendObstacle("tail_png");
            }
        }
        if (obstacle.length == 0) {
            this.appendObstacle("tail_png");
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