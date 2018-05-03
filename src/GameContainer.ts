class GameContainer extends egret.DisplayObjectContainer {

    private stageW:number;
    private stageH:number;
    private stageCenterX:number;

    private lastTouchMoveX:number;

    // 路面背景
    private roadBg:Background;
    // 路面左右边缘
    //private roadLeftEdge:number;
    //private roadRightEdge:number;

    private subject:Subject;

    // 顶部油箱分数问题区域
    private topUI:GameTopUI;

    private gasInit:number = 10000;
    private gasMax:number = 30000;
    private gasAdd:number = 200;
    private hasGas:boolean;

    // 玩家赛车
    private car:Car;
    private carWidthHalf:number;
    // 当前速度
    private currentSpeed = 0;
    // 稳定速度
    private fixedSpeed = 20;
    // 方块增速
    private addedSpeed = 10;
    // 加速度
    private acceleration = 0.5;
    // 碰撞物体记录
    private objectCollision: egret.DisplayObject;
    // 定时器
    private readyTimer: ReadyTimer;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
    }

    private onAddToStage(event:egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createGameScene();
    }
	
	private onRemovedFromStage(event:egret.Event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
        this.readyTimer.removeEventListener(ReadyTimer.COMPLETE, this.gameStart, this);
    }

    // 创建场景，指游戏时的场景，路面，车辆，方块等
    private createGameScene() {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.stageCenterX = this.stageW / 2;

        this.roadBg = new Background();
        this.addChild(this.roadBg);

        this.car = new Car(this.fixedSpeed, this.acceleration);
        this.car.addEventListener(Car.COMPLETE_STOP, this.gameStop, this);
        this.carWidthHalf = this.car.width / 2;
        this.car.anchorOffsetX = this.carWidthHalf;
        this.car.y = this.stageH  / 3 * 2;
        this.car.x = this.stageCenterX;
        this.addChild(this.car);

        let roadLeftEdge = Math.ceil(this.roadBg.getLeftEdge());
        let roadRightEdge = Math.floor(this.roadBg.getRightEdge());
        this.car.setRoadEdge(roadLeftEdge, roadRightEdge);

        this.topUI = new GameTopUI(this.gasInit, this.gasMax);
        this.addChild(this.topUI);

        this.subject = new Subject();
        this.roadBg.addEventListener(Subject.EVENT_UPDATE, this.subject.updateSubject, this.subject);
        this.subject.y = 72;
        this.addChild(this.subject);

        // ReadyGo必须最后添加，因为移除时移除的最上层子容器
        this.readyTimer = new ReadyTimer();
        this.readyTimer.addEventListener(ReadyTimer.COMPLETE, this.gameStart, this);
        this.addChild(this.readyTimer);
    }

    private gameStart() {
        this.removeChildAt(this.numChildren - 1);
        this.addEventListener(egret.Event.ENTER_FRAME, this.updateGame, this);

        this.touchEnabled = true;
        this.parent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);

        this.car.start();
        this.hasGas = true;
    }

    private gameStop() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.updateGame, this);

        let value = this.topUI.getScore();

        if(typeof(wx) != 'undefined') {
            let openDataContext = wx.getOpenDataContext();
            if(openDataContext != null) {
                openDataContext.postMessage({
                    isScore: true,
                    score: value
                });
            }
        }
        this.dispatchEventWith(Car.COMPLETE_STOP, false, value);
        // 显示分数或者分发结束事件给Main.ts
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
        if (this.hasGas) {
            this.updateCollision();
        }
        
        // 获取小车当前速度
        this.currentSpeed = this.car.getCurrentSpeed();
        // 更新其他部件的位置
        this.roadBg.setSpeed(this.currentSpeed);
    }

    private updateCollision(): void {
        // 处理障碍物和汽车的碰撞
        let obstacle = this.roadBg.getObstacle();
        let carTop = UtilObject.BitmapTop(this.car);
        let carRect = this.car.getCarDisplayRect();

        if(this.objectCollision != null) {
            if(!UtilObject.Overlay(carRect, this.objectCollision)) {
                    this.onOverlapExit(this.car, this.objectCollision);
                    this.objectCollision = null;
            }
        }

        for(var i = 0; i < obstacle.length; ++i) {
            if(UtilObject.BitmapBottom(obstacle[i]) < carTop) {
                break;  // 后续障碍物都在汽车上方，不做判断
            } else if(UtilObject.Overlay(carRect, obstacle[i])) {
                // console.log("overlay");
                // 没油了停止检测
                if (!this.hasGas) {
                    break;
                }
                // 判断答案是否正确
                // 假设调试
                this.onOverlapEnter(this.car, obstacle[i]);
                this.objectCollision = obstacle[i];
                // 理论上同一时刻应仅有一个方块和车产生碰撞，此处应有break
            }
        }

        if (this.topUI.getGasLast() <= 0) {
            console.log("Car stop!")
            this.car.stop();
            this.hasGas = false;
        }

        // 获取小车当前速度
        this.currentSpeed = this.car.getCurrentSpeed();
        // 更新其他部件的位置
        this.roadBg.setSpeed(this.currentSpeed);
        this.topUI.updateGas(this.currentSpeed);
        this.topUI.updateScore(this.currentSpeed);
    }

	public onOverlapEnter(obj: egret.DisplayObject, obs: egret.DisplayObject): void {

		if(obs instanceof Block) {

            let question = this.roadBg.getQuestion();
			if(question.judge(obs)) {
				// 答案正确
				if(obj instanceof Car) {
                    this.car.addToCurrentSpeed(this.addedSpeed);
                    this.topUI.addToGas(this.gasAdd);
				}
			} else {
				// 答案错误
                if(obj instanceof Car) {
                    this.car.addToCurrentSpeed(-this.addedSpeed);
                    this.topUI.addToGas(-this.gasAdd);
				}
			}
		}
	}

	public onOverlapExit(obj: egret.DisplayObject, obs: egret.DisplayObject): void {
		if(obs instanceof Block) {
			let question = this.roadBg.getQuestion();
			if(question.judge(obs)) {
				// 答案正确
				if(obj instanceof Car) {
					this.roadBg.newQuestion();
				}
			} else {
				// 答案错误
			}
		}
	}
}