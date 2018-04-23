/**
 * 区块
 * 每个区块对应一个数字答案，该数字用于和游戏管理器生成的答案进行比较
 * 区块大小限制在一个浮动区间内
 */
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
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(typeName) {
        var _this = _super.call(this) || this;
        // 区块大小
        _this.blockW = 0;
        _this.blockH = 0;
        _this.answer = 0;
        _this.typeName = typeName;
        return _this;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    // 生产
    Block.produce = function (typeName, answer) {
        if (Block.cacheDict[typeName] == null) {
            Block.cacheDict[typeName] = [];
        }
        var dict = Block.cacheDict[typeName];
        var block;
        if (dict.length > 0) {
            block = dict.pop();
        }
        else {
            block = new Block(typeName);
        }
        // 变更区块
        block.setAnswer(answer);
        return block;
    };
    // 回收
    Block.reclaim = function (block, typeName) {
        if (Block.cacheDict[typeName] == null) {
            Block.cacheDict[typeName] = [];
        }
        var dict = Block.cacheDict[typeName];
        if (dict.indexOf(block) == -1) {
            dict.push(block);
        }
    };
    // private onAddToStage() {
    //     this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    //     this.createBlock();
    // }
    Block.prototype.getAnswer = function () {
        return this.answer;
    };
    Block.prototype.setAnswer = function (answer) {
        this.removeChildren();
        switch (this.typeName) {
            case BlockParam.TYPE_COLOR:
                this.createColorBlock(answer);
                break;
            case BlockParam.TYPE_NUMBER:
                this.createNumberBlock(answer);
                break;
            default:
                this.createMagicBlock();
                break;
        }
    };
    Block.prototype.createColorBlock = function (color) {
        this.answer = color;
        var scale = 1;
        var resName = BlockParam.getRandomColorRes();
        var bmp = new egret.Bitmap(RES.getRes(resName));
        this.blockW = scale * bmp.width;
        this.blockH = scale * bmp.height;
        var rect = new egret.Shape();
        rect.graphics.beginFill(color);
        rect.graphics.drawRect(0, 0, this.blockW, this.blockH);
        rect.graphics.endFill();
        this.addChild(rect);
        bmp.scaleX = scale;
        bmp.scaleY = scale;
        this.addChild(bmp);
        rect.mask = bmp;
    };
    Block.prototype.createNumberBlock = function (num) {
        this.answer = num;
        var scale = 1;
        var temp = num;
        var bmpArr = [];
        // 10 是避免死循环，实际不会有这么大的数
        for (var i = 0; i < 10; i++) {
            if (temp > 0) {
                var resName = BlockParam.numResArr[temp % 10];
                bmpArr.push(new egret.Bitmap(RES.getRes(resName)));
                temp = Math.floor(temp / 10);
            }
            else {
                break;
            }
        }
        for (var i = 0; i < bmpArr.length; i++) {
            var bmp = bmpArr[bmpArr.length - 1 - i];
            bmp.x = this.blockW;
            this.addChild(bmp);
            this.blockW += scale * bmp.width;
            this.blockH = scale * bmp.height;
        }
    };
    Block.prototype.createMagicBlock = function () {
        this.answer = BlockParam.MAGIC_ANSWER;
    };
    // 对象池
    Block.cacheDict = {};
    return Block;
}(egret.DisplayObjectContainer));
__reflect(Block.prototype, "Block");
//# sourceMappingURL=Block.js.map