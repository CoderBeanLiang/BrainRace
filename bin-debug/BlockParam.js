var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BlockParam = (function () {
    function BlockParam() {
    }
    BlockParam.getRandomColor = function () {
        var index = Math.floor(Math.random() * 6);
        return BlockParam.colorArr[index];
    };
    BlockParam.getRandomColorRes = function () {
        var index = Math.floor(Math.random() * 6);
        return BlockParam.colorResArr[index];
    };
    BlockParam.TYPE_COLOR = "Color";
    BlockParam.TYPE_NUMBER = "Number";
    BlockParam.MAGIC_ANSWER = 0xffffffff;
    BlockParam.COLOR_RED = 0xffff0000;
    BlockParam.COLOR_GREEN = 0xff00ff00;
    BlockParam.COLOR_BLUE = 0xff0000ff;
    BlockParam.COLOR_YELLOW = 0xffffff00;
    BlockParam.COLOR_ORANGE = 0xffff9c00;
    BlockParam.COLOR_PURPLE = 0xffff00ff;
    BlockParam.RES_RED = "block_red_png";
    BlockParam.RES_GREEN = "block_green_png";
    BlockParam.RES_BLUE = "block_blue_png";
    BlockParam.RES_YELLOW = "block_yellow_png";
    BlockParam.RES_ORANGE = "block_orange_png";
    BlockParam.RES_PURPLE = "block_purple_png";
    BlockParam.RES_ZERO = "block_zero_png";
    BlockParam.RES_ONE = "block_one_png";
    BlockParam.RES_TWO = "block_two_png";
    BlockParam.RES_THREE = "block_three_png";
    BlockParam.RES_FOUR = "block_four_png";
    BlockParam.RES_FIVE = "block_five_png";
    BlockParam.RES_SIX = "block_six_png";
    BlockParam.RES_SEVEN = "block_seven_png";
    BlockParam.RES_EIGHT = "block_eight_png";
    BlockParam.RES_NINE = "block_nine_png";
    BlockParam.colorArr = [
        BlockParam.COLOR_RED,
        BlockParam.COLOR_ORANGE,
        BlockParam.COLOR_YELLOW,
        BlockParam.COLOR_GREEN,
        BlockParam.COLOR_BLUE,
        BlockParam.COLOR_PURPLE
    ];
    BlockParam.colorResArr = [
        BlockParam.RES_RED,
        BlockParam.RES_ORANGE,
        BlockParam.RES_YELLOW,
        BlockParam.RES_GREEN,
        BlockParam.RES_BLUE,
        BlockParam.RES_PURPLE
    ];
    BlockParam.numResArr = [
        BlockParam.RES_ZERO,
        BlockParam.RES_ONE,
        BlockParam.RES_TWO,
        BlockParam.RES_THREE,
        BlockParam.RES_FOUR,
        BlockParam.RES_FIVE,
        BlockParam.RES_SIX,
        BlockParam.RES_SEVEN,
        BlockParam.RES_EIGHT,
        BlockParam.RES_NINE,
    ];
    return BlockParam;
}());
__reflect(BlockParam.prototype, "BlockParam");
//# sourceMappingURL=BlockParam.js.map