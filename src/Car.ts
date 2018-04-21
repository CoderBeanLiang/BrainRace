class Car extends egret.DisplayObjectContainer {

    // 赛车精灵贴图
    private carBmp:egret.Bitmap;

    // 火焰精灵贴图
    private tailBmp:egret.Bitmap;

    // 稳定速度
    private fixedSpeed:number = 0;

    // 加速度
    private acceleration:number = 0;

    public constructor(texture:egret.Texture, fixedSpeed:number, acceleration:number) {
        super();

        this.fixedSpeed = fixedSpeed;
        this.acceleration = acceleration;
        this.carBmp = new egret.Bitmap(texture);
        this.addChild(this.carBmp);
    }

}