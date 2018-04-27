class Car extends egret.DisplayObjectContainer {

    public static COMPLETE_STOP:string = "CompleteStop";

    // 动画相关
    private mcFactory:egret.MovieClipDataFactory;
    private mcMove:egret.MovieClip;
    private mcFire:egret.MovieClip;

    // 小车区域
    private carRect:egret.Rectangle;

    private carWidthHalf:number;
    private roadLeftEdge:number = 0;
    private roadRightEdge:number = 1;

    // 当前速度（其实就是指一帧移动多少像素）
    private currentSpeed:number = 0;

    // 期望稳定速度（其实就是指一帧移动多少像素）
    private fixedSpeed:number = 0;
    // 当前稳定速度（小车停止时的稳定速度是0）
    private realFixedSpeed:number = 0;
    // 踩中方块对速度的影响需要限定在某一个范围内，初始化时设为定速的一半
    private addedSpeedRange:number = 0;

    // 加速度
    private acceleration:number = 0;

    // 标记是否因方块在加速
    private inSpeedUp:boolean = false;

    public constructor(fixedSpeed:number, acceleration:number) {
        super();

        this.fixedSpeed = fixedSpeed;
        this.acceleration = acceleration;
        this.addedSpeedRange = this.fixedSpeed / 2;

        // 动画相关初始化
        let jsonData = RES.getRes("car_anim_json");
        let texture = RES.getRes("car_anim_png");
        this.mcFactory = new egret.MovieClipDataFactory(jsonData, texture);
        this.mcMove = new egret.MovieClip(this.mcFactory.generateMovieClipData("car_anim"));
        this.mcFire = new egret.MovieClip(this.mcFactory.generateMovieClipData("car_fire"));

        this.mcFire.alpha = 0;
        this.mcFire.x = (this.mcMove.width - this.mcFire.width) / 2;
        this.mcFire.y = this.mcMove.y + this.mcMove.height;

        this.addChild(this.mcMove);
        this.addChild(this.mcFire);

        this.carWidthHalf = this.width / 2;
        this.carRect = new egret.Rectangle(this.x, this.y, this.mcMove.width, this.mcMove.height);

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

    public getCarDisplayRect():egret.Rectangle {
        this.carRect.x = this.x - this.carWidthHalf;
        this.carRect.y = this.y;
        return this.carRect;
    }

    // 设置当前速度的增值
    public addToCurrentSpeed(add:number) {
        if (this.currentSpeed > this.fixedSpeed - this.addedSpeedRange
            && this.currentSpeed < this.fixedSpeed + this.addedSpeedRange) {
                this.currentSpeed = this.fixedSpeed + add;
        }
        if(!this.inSpeedUp && add > 0) {
            this.inSpeedUp = true;
            // 播放加速动画
            this.showFireAnim(true);
        }
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
            if (this.currentSpeed == this.realFixedSpeed || this.realFixedSpeed <= 0) {
                // 说明小车加速效果消失了
                this.inSpeedUp = false;
                this.showFireAnim(false);
            }
            if (this.realFixedSpeed <= 0 && this.currentSpeed <= 0) {
                this.completeStop();
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

    private showFireAnim(show:boolean) {
        if (show) {
            this.mcFire.alpha = 1;
            this.mcFire.gotoAndPlay(1, -1);
        } else {
            this.mcFire.alpha = 0;
            this.mcFire.gotoAndStop(1);
        }
    }

    private completeStop() {
        this.dispatchEventWith(Car.COMPLETE_STOP);
    }

}