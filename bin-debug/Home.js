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
        var title = new egret.Bitmap(RES.getRes("title_png"));
        title.x = (stageW - title.width) / 2;
        title.y = stageH * 0.2;
        this.addChild(title);
        // 因为有动画，所以直接将锚点设为中心点
        this.start = new egret.Bitmap(RES.getRes("start_png"));
        this.start.touchEnabled = true;
        this.start.anchorOffsetX = this.start.width / 2;
        this.start.anchorOffsetY = this.start.height / 2;
        this.start.x = stageW / 2;
        this.start.y = stageH * 0.7 - this.start.height * 0.6;
        this.start.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStartAnim, this);
        this.start.addEventListener(egret.TouchEvent.TOUCH_END, this.onStartClick, this);
        this.start.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onStartCancel, this);
        this.addChild(this.start);
        // 因为有动画，所以直接将锚点设为中心点
        this.sort = new egret.Bitmap(RES.getRes("sort_png"));
        this.sort.touchEnabled = true;
        this.sort.anchorOffsetX = this.sort.width / 2;
        this.sort.anchorOffsetY = this.sort.height / 2;
        this.sort.x = stageW / 2;
        this.sort.y = stageH * 0.7 + this.sort.height * 0.6;
        this.sort.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSortAnim, this);
        this.sort.addEventListener(egret.TouchEvent.TOUCH_END, this.onSortClick, this);
        this.sort.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onSortCancel, this);
        this.addChild(this.sort);
    };
    Home.prototype.onRemovedFromStage = function () {
        // 
    };
    Home.prototype.onStartAnim = function () {
        egret.Tween.get(this.start).to({ scaleX: 0.8, scaleY: 0.8 }, 200);
    };
    Home.prototype.onStartCancel = function () {
        egret.Tween.get(this.start).to({ scaleX: 1.0, scaleY: 1.0 }, 200);
    };
    Home.prototype.onStartClick = function () {
        console.log("StartClicked");
        this.dispatchEventWith(Home.START_CLICK);
    };
    Home.prototype.onBackAnim = function () {
        egret.Tween.get(this.back).to({ scaleX: 0.8, scaleY: 0.8 }, 200);
    };
    Home.prototype.onBackCancel = function () {
        egret.Tween.get(this.back).to({ scaleX: 1.0, scaleY: 1.0 }, 200);
    };
    Home.prototype.onBackClick = function () {
        this.back.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBackAnim, this);
        this.back.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBackClick, this);
        this.back.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBackCancel, this);
        if (this.contains(this.back)) {
            this.removeChild(this.back);
        }
        if (this.contains(this.rank)) {
            this.removeChild(this.rank);
        }
        this.onAddToStage();
    };
    Home.prototype.onSortAnim = function () {
        egret.Tween.get(this.sort).to({ scaleX: 0.8, scaleY: 0.8 }, 200);
    };
    Home.prototype.onSortCancel = function () {
        egret.Tween.get(this.sort).to({ scaleX: 1.0, scaleY: 1.0 }, 200);
    };
    Home.prototype.onSortClick = function () {
        this.sort.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSortAnim, this);
        this.sort.removeEventListener(egret.TouchEvent.TOUCH_END, this.onSortClick, this);
        this.sort.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onSortCancel, this);
        this.start.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStartAnim, this);
        this.start.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStartClick, this);
        this.start.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onStartCancel, this);
        this.removeChild(this.start);
        this.removeChild(this.sort);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.back = new egret.Bitmap(RES.getRes("back_png"));
        this.back.touchEnabled = true;
        this.back.anchorOffsetX = this.back.width / 2;
        this.back.anchorOffsetY = this.back.height / 2;
        this.back.x = stageW / 2;
        this.back.y = stageH - this.back.height;
        this.back.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBackAnim, this);
        this.back.addEventListener(egret.TouchEvent.TOUCH_END, this.onBackClick, this);
        this.back.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBackCancel, this);
        this.addChild(this.back);
        if (typeof (wx) != 'undefined') {
            var openDataContext = wx.getOpenDataContext();
            if (openDataContext != null) {
                //主要示例代码开始
                var bitmapdata_1 = new egret.BitmapData(window["sharedCanvas"]);
                bitmapdata_1.$deleteSource = false;
                var texture = new egret.Texture();
                texture._setBitmapData(bitmapdata_1);
                this.rank = new egret.Bitmap(texture);
                this.rank.anchorOffsetX = this.rank.width / 2;
                this.rank.anchorOffsetY = this.rank.height / 2;
                this.rank.x = stageW / 2;
                this.rank.y = this.rank.height / 2 - 20;
                this.addChild(this.rank);
                egret.startTick(function (timeStarmp) {
                    egret.WebGLUtils.deleteWebGLTexture(bitmapdata_1.webGLTexture);
                    bitmapdata_1.webGLTexture = null;
                    return false;
                }, this);
                //发送消息
                openDataContext.postMessage({
                    isDisplay: true,
                    text: 'hello',
                    year: (new Date()).getFullYear()
                });
            }
        }
    };
    Home.START_CLICK = "HomeStartClick";
    return Home;
}(egret.DisplayObjectContainer));
__reflect(Home.prototype, "Home");
//# sourceMappingURL=Home.js.map