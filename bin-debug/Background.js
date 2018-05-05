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
        _this.obstacleOffset = 200;
        _this.obstacleInterval = 200;
        _this.scenery = new Array();
        _this.sceneryOffset = 400;
        _this.sceneryInterval = 200;
        _this.sceneryGuardrailWidth = 30;
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
    Background.prototype.getRoadWidth = function () {
        return this.getRightEdge() - this.getLeftEdge();
    };
    // 返回障碍物列表
    Background.prototype.getObstacle = function () {
        return this.obstacle;
    };
    Background.prototype.getQuestion = function () {
        return this.question;
    };
    Background.prototype.newQuestion = function () {
        var value = UtilMath.RandomInt(0, 1);
        if (value == 0) {
            this.question = new QuestionNumber();
        }
        else {
            this.question = new QuestionColor();
        }
        this.dispatchEventWith(Subject.EVENT_UPDATE, false, this.question.title());
    };
    Background.prototype.initMember = function () {
    };
    Background.prototype.initListener = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
    };
    Background.prototype.createRoad = function () {
        var road = this.road;
        while (road.length == 0 || UtilObject.BitmapTop(road[road.length - 1]) > 0) {
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
            track.y = this.stage.stageHeight - UtilObject.BitmapHeight(track);
        }
        else {
            track.y = UtilObject.BitmapTop(road[road.length - 1]) - UtilObject.BitmapHeight(track);
        }
        road.push(track);
        this.addChildAt(track, 0);
    };
    Background.prototype.shiftScenery = function () {
        var scenery = this.scenery;
        var object = scenery.shift();
        this.removeChild(object);
    };
    Background.prototype.appendScenery = function (name) {
        var scenery = this.scenery;
        var object = new egret.Bitmap();
        object.texture = RES.getRes(name);
        if (scenery.length == 0) {
            object.y = 0 - UtilObject.BitmapHeight(object);
        }
        else {
            var offset = this.sceneryInterval + Math.random() * this.sceneryOffset;
            object.y = UtilObject.BitmapTop(scenery[scenery.length - 1]) - UtilObject.BitmapHeight(object) - offset;
        }
        var witdh = UtilObject.BitmapWidth(object);
        if (UtilMath.RandomInt(0, 1) == 0) {
            object.x = UtilMath.Random(0, this.leftEdge - witdh - this.sceneryGuardrailWidth);
        }
        else {
            object.x = UtilMath.Random(this.rightEdge + this.sceneryGuardrailWidth, this.stage.width - witdh);
        }
        scenery.push(object);
        this.addChildAt(object, 100);
    };
    Background.prototype.appendObstacle = function (name) {
        var obstacle = this.obstacle;
        var block = this.produceObstacle();
        block.x = Math.random() * (this.getRoadWidth() - block.width) + this.getLeftEdge();
        if (obstacle.length == 0) {
            block.y = 0 - UtilObject.BitmapHeight(block);
        }
        else {
            var offset = this.obstacleInterval + Math.random() * this.obstacleOffset;
            block.y = UtilObject.BitmapTop(obstacle[obstacle.length - 1]) - UtilObject.BitmapHeight(block) - offset;
        }
        obstacle.push(block);
        this.addChildAt(block, 100);
    };
    Background.prototype.shiftObstacle = function () {
        var obstacle = this.obstacle;
        var block = obstacle.shift();
        var question = this.question;
        this.removeChild(block);
        if (block instanceof Block) {
            question.reclaim(block);
        }
    };
    Background.prototype.produceObstacle = function () {
        var question = this.question;
        if (question == null) {
            this.newQuestion();
            question = this.question;
        }
        return question.produce();
    };
    Background.prototype.onEnterFrame = function (e) {
        var road = this.road;
        var scenery = this.scenery;
        var obstacle = this.obstacle;
        for (var i = 0; i < road.length; i++) {
            road[i].y += this.speed;
        }
        for (var i = 0; i < scenery.length; i++) {
            scenery[i].y += this.speed;
        }
        for (var i = 0; i < obstacle.length; i++) {
            obstacle[i].y += this.speed;
        }
        // 删除窗口底部的路面
        if (road.length > 0) {
            if (UtilObject.BitmapTop(road[0]) > this.stage.stageHeight) {
                this.shiftRoad();
            }
        }
        // 添加窗口顶部的路面
        if (road.length > 0) {
            var index = road.length - 1;
            if (UtilObject.BitmapTop(road[index]) > 0) {
                this.appendRoad("road_png");
            }
        }
        // 删除窗口底部的景物
        if (scenery.length > 0) {
            if (UtilObject.BitmapTop(scenery[0]) > this.stage.stageHeight) {
                this.shiftScenery();
            }
        }
        // 添加窗口顶部的景物
        if (scenery.length > 0) {
            var index = scenery.length - 1;
            if (UtilObject.BitmapTop(scenery[index]) > 0) {
                this.appendScenery("tree" + UtilMath.RandomInt(1, 7) + "_png");
            }
        }
        // 删除窗口底部的障碍物
        if (obstacle.length > 0) {
            if (UtilObject.BitmapTop(obstacle[0]) > this.stage.stageHeight) {
                this.shiftObstacle();
            }
        }
        // 添加窗口顶部的障碍物
        if (obstacle.length > 0) {
            var index = obstacle.length - 1;
            if (UtilObject.BitmapTop(obstacle[index]) > 0) {
                this.appendObstacle("tail_png");
            }
        }
        if (scenery.length == 0) {
            this.appendScenery("tree1_png");
        }
        if (obstacle.length == 0) {
            this.appendObstacle("tail_png");
        }
    };
    Background.prototype.onAddToStage = function (event) {
        this.createRoad();
    };
    Background.prototype.onRemovedFromStage = function (event) {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
    };
    return Background;
}(egret.DisplayObjectContainer));
__reflect(Background.prototype, "Background");
