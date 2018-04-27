class Gas extends egret.DisplayObjectContainer {

    private gas:number = 0;
    private gasMax:number = 0;

    private gasText:egret.TextField;

    public constructor(gasInit:number, gasMax:number) {
        super();
        this.gas = gasInit;
        this.gasMax = gasMax;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        let bg:egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0,0,200,50);
        bg.graphics.endFill();
        this.addChild(bg);

        this.gasText = new egret.TextField();
        this.gasText.width = 200;
        this.gasText.height = 50;
        this.gasText.text = "GAS：" + this.gas;
        this.addChild(this.gasText);
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
        this.gasText.text = "GAS：" + this.gas;
    }
}