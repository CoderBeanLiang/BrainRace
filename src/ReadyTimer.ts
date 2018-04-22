/**
 * 游戏开始的计时显示容器
 */

class ReadyTimer extends egret.DisplayObjectContainer {

    public static COMPLETE:string = "ReadyTimerComplete";

    private timer:egret.Timer;

    private count:number = 0;

    private text:egret.TextField;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.initText();
        this.start();
    }

    public start() {
        console.log("start");
        this.timer = new egret.Timer(1000, 3);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerFunc, this);
        this.timer.start();

        this.showText("Ready 1");
    }

    private onTimerFunc(evt:egret.TimerEvent) {
        console.log("Count", this.count);
        if (this.count == 0) {
            this.showText("Ready2")
        } else if (this.count == 1) {
            this.showText("Go!");
        } else if (this.count == 2) {
            this.complete();
        }
        this.count++;
    }

    private complete() {
        this.dispatchEventWith(ReadyTimer.COMPLETE);
    }

    private initText() {
        this.text = new egret.TextField();
        this.text.text = "xxxxxxxxx";
        this.text.y = this.stage.stageHeight / 2;
        this.text.x = this.stage.stageWidth / 2;
        this.addChild(this.text);
        console.log("initAfter");
    }

    private showText(text:string) {
        this.text.text = text;
    }

}