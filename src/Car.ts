class Car extends egret.DisplayObjectContainer {

    // 动画相关
    private mcFactory:egret.MovieClipDataFactory;
    private mcMove:egret.MovieClip;

    private carWidthHalf:number;
    private roadLeftEdge:number = 0;
    private roadRightEdge:number = 1;

    // 火焰精灵贴图
    private tailBmp:egret.Bitmap;

    // 当前速度（其实就是指一帧移动多少像素）
    private currentSpeed:number = 0;

    // 期望稳定速度（其实就是指一帧移动多少像素）
    private fixedSpeed:number = 0;
    // 当前稳定速度（小车停止时的稳定速度是0）
    private realFixedSpeed:number = 0;

    // 加速度
    private acceleration:number = 0;

    public constructor(fixedSpeed:number, acceleration:number) {
        super();

        this.fixedSpeed = fixedSpeed;
        this.acceleration = acceleration;

        // 动画相关初始化
        let jsonData = RES.getRes("car_json");
        let texture = RES.getRes("car_png");
        this.mcFactory = new egret.MovieClipDataFactory(jsonData, texture);
        this.mcMove = new egret.MovieClip(this.mcFactory.generateMovieClipData("car_move"));

        this.addChild(this.mcMove);

        this.carWidthHalf = this.width / 2;

        //this.addEventListener(egret.TouchEvent.ENTER_FRAME, this., this);
    }

    public start() {
        this.realFixedSpeed = this.fixedSpeed;
        this.mcMove.gotoAndPlay(1, -1);
    }

    public stop() {
        this.realFixedSpeed = 0;
    }

    public setRoadEdge(left:number, right:number) {
        this.roadLeftEdge = left;
        this.roadRightEdge = right;
    }

    public setOffsetX(offsetX:number) {
        this.setCarPosition(offsetX);
    }

    // 设置当前速度的增值
    public addToCurrentSpeed(add:number) {
        this.currentSpeed += add;
    }

    public getCurrentSpeed():number {
        return this.calculateSpeed();
    }

    // 计算当前车速，车速始终向稳定速度趋近
    private calculateSpeed():number {
        if (this.currentSpeed < this.realFixedSpeed) {
            this.currentSpeed += this.acceleration;
            if (this.currentSpeed > this.realFixedSpeed) {
                this.currentSpeed = this.realFixedSpeed;
            }
        } else if (this.currentSpeed > this.realFixedSpeed) {
            this.currentSpeed -= this.acceleration;
            if (this.currentSpeed < this.realFixedSpeed) {
                this.currentSpeed = this.realFixedSpeed;
            }
        }
        // 小车速度与动画帧率直接相关
        this.mcMove.frameRate = this.currentSpeed;
        return this.currentSpeed;
    }

    private setCarPosition(offsetX:number) {
        // 当前速度小于 1 说明车子速度过低，应限制横向移动
        if (this.currentSpeed < 1) {
            return;
        }

        var newX = this.x + offsetX;
        if (newX < this.roadLeftEdge + this.carWidthHalf) {
            newX = this.roadLeftEdge + this.carWidthHalf;
        } else if (newX > this.roadRightEdge - this.carWidthHalf) {
            newX = this.roadRightEdge - this.carWidthHalf;
        }
        this.x = newX;
    }

}