var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Question = (function () {
    function Question() {
        this.wrong = 2;
        this.correct = 1;
        this.initCount();
    }
    Question.prototype.produce = function () {
        var wrong = this.wrong;
        var correct = this.correct;
        var total = wrong + correct;
        if (total == 0) {
            this.initCount();
            return this.produce();
        }
        else {
            var index = Math.floor(total * Math.random());
            if (index < wrong) {
                --this.wrong;
                return this.produceWrong();
            }
            else {
                --this.correct;
                return this.produceCorrect();
            }
        }
    };
    Question.prototype.title = function () {
        return this.produceDescription();
    };
    Question.prototype.reclaim = function (block) {
        this.reclaimBlock(block);
    };
    Question.prototype.judge = function (block) {
        return this.judgeBlock(block);
    };
    return Question;
}());
__reflect(Question.prototype, "Question");
