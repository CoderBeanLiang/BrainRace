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
var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFromStage, _this);
        return _this;
    }
    Home.prototype.onAddToStage = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var bg = new Background();
        this.addChild(bg);
        this.start = new egret.Bitmap(RES.getRes("start_png"));
        this.start.touchEnabled = true;
        this.start.anchorOffsetX = this.start.width / 2;
        this.start.anchorOffsetY = this.start.height / 2;
        this.start.x = stageW / 2;
        this.start.y = stageH / 2 - this.start.height;
        this.start.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStartAnim, this);
        this.start.addEventListener(egret.TouchEvent.TOUCH_END, this.onStartClick, this);
        this.addChild(this.start);
        this.sort = new egret.Bitmap(RES.getRes("sort_png"));
        this.sort.touchEnabled = true;
        this.sort.anchorOffsetX = this.sort.width / 2;
        this.sort.anchorOffsetY = this.sort.height / 2;
        this.sort.x = stageW / 2;
        this.sort.y = stageH / 2 + this.sort.height;
        this.addChild(this.sort);
    };
    Home.prototype.onRemovedFromStage = function () {
        // 
    };
    Home.prototype.onStartAnim = function () {
        egret.Tween.get(this.start).to({ scaleX: 0.8, scaleY: 0.8 }, 200);
    };
    Home.prototype.onStartClick = function () {
        console.log("StartClicked");
        this.dispatchEventWith(Home.START_CLICK);
    };
    Home.START_CLICK = "HomeStartClick";
    return Home;
}(egret.DisplayObjectContainer));
__reflect(Home.prototype, "Home");
//# sourceMappingURL=Home.js.map