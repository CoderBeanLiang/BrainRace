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
    BlockParam.getRandomColorIndex = function () {
        return Math.floor(Math.random() * 6);
    };
    BlockParam.getColorByIndex = function (index) {
        if (index >= 0 && index <= BlockParam.COLOR_NUM) {
            return BlockParam.colorArr[Math.ceil(index)];
        }
        return BlockParam.colorArr[0];
    };
    BlockParam.getColorResNameByIndex = function (index) {
        if (index >= 0 && index <= BlockParam.COLOR_NUM) {
            return BlockParam.colorResArr[Math.ceil(index)];
        }
        return BlockParam.colorResArr[0];
    };
    BlockParam.getColorResDescByIndex = function (index) {
        if (index >= 0 && index <= BlockParam.COLOR_NUM) {
            return BlockParam.colorDescArr[Math.ceil(index)];
        }
        return BlockParam.colorDescArr[0];
    };
    BlockParam.getNumResNameArr = function (num) {
        // 10 是避免死循环，实际不会有这么大的数
        var nameArr = [];
        var temp = Math.floor(num);
        for (var i = 0; i < 10; i++) {
            if (temp > 0) {
                var resName = BlockParam.numResArr[temp % 10];
                nameArr.push(resName);
                temp = Math.floor(temp / 10);
            }
            else {
                break;
            }
        }
        if (nameArr.length == 0) {
            nameArr.push(BlockParam.numResArr[0]);
        }
        return nameArr;
    };
    BlockParam.COLOR_NUM = 6; // 目前6种颜色
    BlockParam.TYPE_COLOR = "Color";
    BlockParam.TYPE_NUMBER = "Number";
    BlockParam.MAGIC_ANSWER = 0xffffff;
    BlockParam.COLOR_RED = 0xff0000;
    BlockParam.COLOR_GREEN = 0x00ff00;
    BlockParam.COLOR_BLUE = 0x0000ff;
    BlockParam.COLOR_YELLOW = 0xffff00;
    BlockParam.COLOR_ORANGE = 0xff9c00;
    BlockParam.COLOR_PURPLE = 0xff00ff;
    BlockParam.RES_RED = "block_red_png";
    BlockParam.RES_GREEN = "block_green_png";
    BlockParam.RES_BLUE = "block_blue_png";
    BlockParam.RES_YELLOW = "block_yellow_png";
    BlockParam.RES_ORANGE = "block_orange_png";
    BlockParam.RES_PURPLE = "block_purple_png";
    BlockParam.DESC_RED = "红";
    BlockParam.DESC_GREEN = "绿";
    BlockParam.DESC_BLUE = "蓝";
    BlockParam.DESC_YELLOW = "黄";
    BlockParam.DESC_ORANGE = "橙";
    BlockParam.DESC_PURPLE = "紫";
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
    // 需要和上面的顺序一一对应
    BlockParam.colorResArr = [
        BlockParam.RES_RED,
        BlockParam.RES_ORANGE,
        BlockParam.RES_YELLOW,
        BlockParam.RES_GREEN,
        BlockParam.RES_BLUE,
        BlockParam.RES_PURPLE
    ];
    BlockParam.colorDescArr = [
        BlockParam.DESC_RED,
        BlockParam.DESC_ORANGE,
        BlockParam.DESC_YELLOW,
        BlockParam.DESC_GREEN,
        BlockParam.DESC_BLUE,
        BlockParam.DESC_PURPLE
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
