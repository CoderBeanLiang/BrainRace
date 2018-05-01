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
var QuestionShow = (function (_super) {
    __extends(QuestionShow, _super);
    function QuestionShow() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    QuestionShow.prototype.init = function () {
        var rect = new egret.Shape();
        rect.graphics.beginFill(0x000000);
        rect.graphics.drawRect(0, 0, 640, 50);
        rect.graphics.endFill();
        this.addChild(rect);
        var text = new egret.TextField();
        text.text = "正确的方块颜色是    ";
        this.addChild(text);
    };
    return QuestionShow;
}(egret.DisplayObjectContainer));
__reflect(QuestionShow.prototype, "QuestionShow");
//# sourceMappingURL=QuestionShow.js.map