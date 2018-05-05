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
var QuestionNumber = (function (_super) {
    __extends(QuestionNumber, _super);
    function QuestionNumber() {
        var _this = _super.call(this) || this;
        _this.number1 = UtilMath.RandomInt(10, 19);
        _this.number2 = UtilMath.RandomInt(2, 9);
        _this.answer = _this.number1 * _this.number2;
        return _this;
    }
    QuestionNumber.prototype.produceWrong = function () {
        var value = this.randomNumber();
        return Block.produce(BlockParam.TYPE_NUMBER, value);
    };
    QuestionNumber.prototype.produceCorrect = function () {
        return Block.produce(BlockParam.TYPE_NUMBER, this.answer);
    };
    QuestionNumber.prototype.produceDescription = function () {
        return new String(this.number1) + " x " + new String(this.number2) + " = ";
    };
    QuestionNumber.prototype.initCount = function () {
        this.wrong = 2;
        this.correct = 1;
        return true;
    };
    QuestionNumber.prototype.judgeBlock = function (block) {
        return block.getType() == BlockParam.TYPE_NUMBER && this.answer == block.getAnswer();
    };
    QuestionNumber.prototype.reclaimBlock = function (block) {
        Block.reclaim(block, block.getType());
    };
    QuestionNumber.prototype.randomNumber = function () {
        var number1 = UtilMath.RandomInt(10, 19);
        var number2 = UtilMath.RandomInt(2, 9);
        var value = number1 * number2;
        if (value == this.answer) {
            return this.randomNumber();
        }
        else {
            return value;
        }
    };
    return QuestionNumber;
}(Question));
__reflect(QuestionNumber.prototype, "QuestionNumber");
