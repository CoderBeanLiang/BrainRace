class Gas extends egret.DisplayObjectContainer {

    private gasRect:egret.Shape;

    private gas:number = 0;
    private gasMax:number = 0;

    public constructor(gasInit:number, gasMax:number) {
        super();
        this.gas = gasInit;
        this.gasMax = gasMax;
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        let bg = new egret.Bitmap(RES.getRes("gas_bg_png"));
        this.addChild(bg);

        this.gasRect = new egret.Shape();
        this.gasRect.graphics.beginFill(0xff0000);
        this.gasRect.graphics.drawRect(15, 20, 385, 50);
        this.gasRect.graphics.endFill();
        this.addChild(this.gasRect);

        let mask = new egret.Bitmap(RES.getRes("gas_mask_png"));
        this.addChild(mask);

        this.gasRect.mask = mask;
        this.gasRect.scaleX = this.gas / this.gasMax;

        let line = new egret.Bitmap(RES.getRes("gas_line_png"));
        this.addChild(line);
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