class Score extends egret.DisplayObjectContainer {

    private score:number = 0;
    
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        this.setScoreBmp();
    }

    public updateScore(score:number) {
        this.score += score;
        this.setScoreBmp();
    }

    public showScore(score:number) {
        this.score = score;
        this.setScoreBmp();
    }

    public getScore(): number {
        return this.score;
    }

    private setScoreBmp() {
        this.removeChildren();

        let bmpX = 0;

        let scoreText = (this.score / 100).toFixed(2);
        for (var i = scoreText.length - 1 ; i >= 0; i--) {
            let name = this.getScoreResName(scoreText.charAt(i));
            let bmp = new egret.Bitmap(RES.getRes(name));
            bmp.x = bmpX - bmp.width;
            this.addChild(bmp);
            bmpX = bmp.x;
        }
    }

    private getScoreResName(char:string):string {
        if ("." == char) {
            return "score_dot_png";
        } else {
            return "score_" + char + "_png";
        }
    }

}