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
    UtilObject.overlay = function (obj, obs) {
        return this.BitmapRight(obj) < this.BitmapLeft(obs)
            || this.BitmapLeft(obj) > this.BitmapRight(obs)
            || this.BitmapBottom(obj) < this.BitmapTop(obs)
            || this.BitmapTop(obj) > this.BitmapBottom(obs) ? false : true;
    };
    return UtilObject;
}());
__reflect(UtilObject.prototype, "UtilObject");
//# sourceMappingURL=UtilObject.js.map