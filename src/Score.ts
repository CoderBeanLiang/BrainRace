class Score extends egret.DisplayObjectContainer {

    private score:number = 0;

    private scoreText:egret.TextField;
    
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    }

    private init() {
        let bg = new egret.Shape();
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0,0,200, 50);
        bg.graphics.endFill();
        this.addChild(bg);

        this.scoreText = new egret.TextField();
        this.scoreText.width = 200;
        this.scoreText.height = 50;
        this.scoreText.textAlign = egret.HorizontalAlign.RIGHT;
        this.addChild(this.scoreText);

        this.setText();
    }

    public updateScore(score:number) {
        this.score += score;
        this.setText();
    }

    public getScore(): number {
        return this.score;
    }

    private setText() {
        this.scoreText.text = (this.score / 100).toFixed(2) + " 米";
    }

}