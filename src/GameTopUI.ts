class GameTopUI extends egret.DisplayObjectContainer {

    // 汽油白边框参数
    private gasLineX = 15;
    private gasLineY = 10;
    // 这些是汽油不包括白色边框的参数
    private gasLeft = 20;
    private gasTop = 15;
    private gasHeight = 50;
    private gasWidth = 420;
        
    private gasRect:egret.Shape;

    private gas:number = 0;
    private gasMax:number = 0;

    private scoreTop = 70;
    private scoreRight = 630;
    private score:Score;

    // 构造
    public constructor(gasInit:number, gasMax:number) {
        super();
        this.gas = gasInit;
        this.gasMax = gasMax;
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        let bg = new egret.Bitmap(RES.getRes("bg_top_png"));
        this.addChild(bg);

        this.gasRect = new egret.Shape();
        this.gasRect.graphics.beginFill(0xff0000);
        this.gasRect.graphics.drawRect(0, 0, this.gasWidth, this.gasHeight);
        this.gasRect.graphics.endFill();
        this.gasRect.x = this.gasLeft;
        this.gasRect.y = this.gasTop;
        this.addChild(this.gasRect);

        let mask = new egret.Bitmap(RES.getRes("gas_mask_png"));
        mask.x = this.gasLineX;
        mask.y = this.gasLineY;
        this.addChild(mask);

        this.gasRect.mask = mask;
        this.gasRect.scaleX = this.gas / this.gasMax;

        let line = new egret.Bitmap(RES.getRes("gas_line_png"));
        line.x = this.gasLineX;
        line.y = this.gasLineY;
        this.addChild(line);

        this.score = new Score();
        this.score.y = this.scoreTop;
        this.score.x = this.scoreRight;
        this.addChild(this.score);
    }

    public addToGas(add:number) {
        this.gas += add;
        if (this.gas < 0) {
            this.gas = 0;
        }
        if (this.gas > this.gasMax) {
            this.gas = this.gasMax;
        }
    }

    public getGasLast():number {
        return this.gas;
    }

    public getScore():number {
        return this.score.getScore();
    }

    public updateScore(speed:number) {
        this.score.updateScore(speed);
    }

    public updateGas(speed:number) {
        this.gas -= speed;
        this.gas = Math.floor(this.gas);
        if (this.gas < 0) {
            this.gas = 0;
        }
        
        this.updateGasAnim();
    }

    private updateGasAnim() {
        this.gasRect.scaleX = this.gas / this.gasMax;
    }
}