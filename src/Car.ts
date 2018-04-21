class Car extends egret.DisplayObjectContainer {

    // 赛车精灵贴图
    private carBmp:egret.Bitmap;

    // 火焰精灵贴图
    private tailBmp:egret.Bitmap;

    // 当前速度（其实就是指一帧移动多少像素）
    private currentSpeed:number = 0;

    // 稳定速度（其实就是指一帧移动多少像素）
    private fixedSpeed:number = 0;

    // 加速度
    private acceleration:number = 0;

    public constructor(texture:egret.Texture, fixedSpeed:number, acceleration:number) {
        super();

        this.fixedSpeed = fixedSpeed;
        this.acceleration = acceleration;
        this.carBmp = new egret.Bitmap(texture);
        this.addChild(this.carBmp);

        //this.addEventListener(egret.TouchEvent.ENTER_FRAME, this., this);
    }

    public getCurrentSpeed():number {
        return this.calculateSpeed();
    }

    // 计算出当前小车速度
    // 车速始终向稳定速度趋近
    private calculateSpeed():number {
        if (this.currentSpeed < this.fixedSpeed) {
            this.currentSpeed += this.acceleration;
            if (this.currentSpeed > this.fixedSpeed) {
                this.currentSpeed = this.fixedSpeed;
            }
        } else if (this.currentSpeed > this.fixedSpeed) {
            this.currentSpeed -= this.acceleration;
            if (this.currentSpeed < this.fixedSpeed) {
                this.currentSpeed = this.fixedSpeed;
            }
        }
        return this.currentSpeed;
    }

}