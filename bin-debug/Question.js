var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Question = (function () {
    function Question() {
        this.wrong = 1;
        this.correct = 1;
    }
    Question.prototype.empty = function () {
        return this.wrong + this.correct <= 0;
    };
    Question.prototype.produce = function () {
        var wrong = this.wrong;
        var correct = this.correct;
        var total = wrong + correct;
        if (total == 0) {
            return null;
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
    return Question;
}());
__reflect(Question.prototype, "Question");
//# sourceMappingURL=Question.js.map