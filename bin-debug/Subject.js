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
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.widthText = 100;
        _this.heightText = 50;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(Subject.EVENT_UPDATE, _this.updateSubject, _this);
        return _this;
    }
    Subject.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    };
    Subject.prototype.init = function () {
        var bg = new egret.Shape();
        var pivotX = this.stage.width / 2 - this.widthText / 2;
        var pivotY = this.stage.height - this.heightText;
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0, 0, this.widthText, this.heightText);
        bg.graphics.endFill();
        this.addChild(bg);
        this.subjectText = new egret.TextField();
        this.subjectText.width = this.widthText;
        this.subjectText.height = this.heightText;
        this.subjectText.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.subjectText);
        bg.x = pivotX;
        bg.y = 0;
        this.subjectText.x = pivotX;
        this.subjectText.y = 0;
    };
    Subject.prototype.updateSubject = function (subject) {
        this.subjectText.text = subject.data;
    };
    Subject.EVENT_UPDATE = "update";
    return Subject;
}(egret.DisplayObjectContainer));
__reflect(Subject.prototype, "Subject");
//# sourceMappingURL=Subject.js.map