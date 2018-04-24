class GameContainer extends egret.DisplayObjectContainer {

    private stageW:number;
    private stageH:number;
    private stageCenterX:number;

    private lastTouchMoveX:number;

    // 标识小车是否运行
    private isRunning:boolean = false;

    // 路面背景
    private roadBg:Background;
    // 路面左右边缘
    //private roadLeftEdge:number;
    //private roadRightEdge:number;

    // 玩家赛车
    private car:Car;
    private carWidthHalf:number;
    // 当前速度
    private currentSpeed = 0;
    // 稳定速度
    private fixedSpeed = 20;
    // 方块增速
    private addedSpeed = 1.5;
    // 加速度
    private acceleration = 1;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createGameScene();
    }

    // 创建场景，指游戏时的场景，路面，车辆，方块等
    private createGameScene() {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.stageCenterX = this.stageW / 2;

        this.roadBg = new Background();
        this.addChild(this.roadBg);

        this.car = new Car(this.fixedSpeed, this.acceleration);
        this.carWidthHalf = this.car.width / 2;
        this.car.anchorOffsetX = this.carWidthHalf;
        this.car.y = this.stageH  / 3 * 2;
        this.car.x = this.stageCenterX;
        this.addChild(this.car);

        let roadLeftEdge = Math.ceil(this.roadBg.getLeftEdge());
        let roadRightEdge = Math.floor(this.roadBg.getRightEdge());
        this.car.setRoadEdge(roadLeftEdge, roadRightEdge);

        let readyTimer = new ReadyTimer();
        readyTimer.addEventListener(ReadyTimer.COMPLETE, this.gameStart, this);
        this.addChild(readyTimer);

        // let buttonStop = new eui.Button();
        // buttonStop.label = "stop";
        // buttonStop.x = this.stageW - 100;
        // buttonStop.y = 10;
        // this.addChild(buttonStop);
        // buttonStop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        // let buttonStart = new eui.Button();
        // buttonStart.label = "start";
        // buttonStart.x = this.stageW - 200;
        // buttonStart.y = 10;
        // this.addChild(buttonStart);
        // buttonStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    }

    // private onButtonClick(evt: egret.TouchEvent) {
    //     var button = <eui.Button>evt.target;
    //     if (button.label == "start") {
    //         this.car.start();
    //     } else if (button.label == "stop") {
    //         this.car.stop();
    //     }
    // }

    private gameStart() {
        this.removeChildAt(this.numChildren - 1);
        this.addEventListener(egret.Event.ENTER_FRAME, this.updateGame, this);

        this.touchEnabled = true;
        this.parent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);

        this.car.start();
    }

    private touchHandler(evt:egret.TouchEvent) {
        var touchX:number = evt.localX;
        if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.lastTouchMoveX = touchX;
        } else if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
            var offsetX:number = touchX - this.lastTouchMoveX;
            this.car.setOffsetX(offsetX);
            this.lastTouchMoveX = touchX;
        }
    }

    private updateGame() {
        // 因碰撞会影响车速故先检测碰撞
        // 处理障碍物和汽车的碰撞
        let obstacle = this.roadBg.getObstacle();
        let cartop = UtilObject.BitmapTop(this.car);
        for(var i = 0; i < obstacle.length; ++i) {
            if(UtilObject.BitmapBottom(obstacle[i]) < cartop) {
                break;  // 后续障碍物都在汽车上方，不做判断
            } else if(UtilObject.overlay(this.car, obstacle[i])) {
                console.log("overlay");
                // 判断答案是否正确
                // 假设调试
                this.car.addToCurrentSpeed(this.addedSpeed);
                // 理论上同一时刻应仅有一个方块和车产生碰撞，此处应有break
            }
        }

        // 获取小车当前速度
        this.currentSpeed = this.car.getCurrentSpeed();
        // 更新其他部件的位置
        this.roadBg.setSpeed(this.currentSpeed);
    }
}