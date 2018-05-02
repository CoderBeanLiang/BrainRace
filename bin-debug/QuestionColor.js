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
var QuestionColor = (function (_super) {
    __extends(QuestionColor, _super);
    function QuestionColor() {
        var _this = _super.call(this) || this;
        _this.index = BlockParam.getRandomColorIndex();
        return _this;
    }
    QuestionColor.prototype.produceWrong = function () {
        var color = this.randomColor();
        return Block.produce(BlockParam.TYPE_COLOR, color);
    };
    QuestionColor.prototype.produceCorrect = function () {
        var color = BlockParam.getColorByIndex(this.index);
        return Block.produce(BlockParam.TYPE_COLOR, color);
    };
    QuestionColor.prototype.produceDescription = function () {
        return BlockParam.getColorResDescByIndex(this.index);
    };
    QuestionColor.prototype.initCount = function () {
        this.wrong = 2;
        this.correct = 1;
        return true;
    };
    QuestionColor.prototype.judgeBlock = function (block) {
        return block.getType() == BlockParam.TYPE_COLOR && block.getAnswer() == BlockParam.getColorByIndex(this.index);
    };
    QuestionColor.prototype.reclaimBlock = function (block) {
        Block.reclaim(block, block.getType());
    };
    QuestionColor.prototype.randomColor = function () {
        var index = BlockParam.getRandomColorIndex();
        if (index == this.index) {
            return this.randomColor();
        }
        else {
            return BlockParam.getColorByIndex(index);
        }
    };
    return QuestionColor;
}(Question));
__reflect(QuestionColor.prototype, "QuestionColor");
//# sourceMappingURL=QuestionColor.js.map