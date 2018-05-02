var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UtilMath = (function () {
    function UtilMath() {
    }
    UtilMath.RandomInt = function (L, R) {
        return Math.floor(L + (R - L + 1) * Math.random());
    };
    return UtilMath;
}());
__reflect(UtilMath.prototype, "UtilMath");
//# sourceMappingURL=UtilMath.js.map