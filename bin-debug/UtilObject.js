var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UtilObject = (function () {
    function UtilObject() {
    }
    UtilObject.BitmapTop = function (bitmap) {
        return bitmap.y - bitmap.anchorOffsetY * bitmap.scaleY;
    };
    UtilObject.BitmapBottom = function (bitmap) {
        return bitmap.y + (bitmap.height - bitmap.anchorOffsetY) * bitmap.scaleY;
    };
    UtilObject.BitmapLeft = function (bitmap) {
        return bitmap.x - bitmap.anchorOffsetX * bitmap.scaleX;
    };
    UtilObject.BitmapRight = function (bitmap) {
        return bitmap.x + (bitmap.width - bitmap.anchorOffsetX) * bitmap.scaleX;
    };
    UtilObject.BitmapHeight = function (bitmap) {
        return bitmap.height * bitmap.scaleY;
    };
    UtilObject.BitmapWidth = function (bitmap) {
        return bitmap.width * bitmap.scaleX;
    };
    UtilObject.Overlay = function (obj, obs) {
        var rect = new egret.Rectangle();
        rect.top = UtilObject.BitmapTop(obs);
        rect.left = UtilObject.BitmapLeft(obs);
        rect.right = UtilObject.BitmapRight(obs);
        rect.bottom = UtilObject.BitmapBottom(obs);
        return this.OverlayRectangle(obj, rect);
    };
    UtilObject.OverlayRectangle = function (obj, obs) {
        return obj.right < obs.left || obj.left > obs.right || obj.bottom < obs.top || obj.top > obs.bottom ? false : true;
    };
    return UtilObject;
}());
__reflect(UtilObject.prototype, "UtilObject");
//# sourceMappingURL=UtilObject.js.map