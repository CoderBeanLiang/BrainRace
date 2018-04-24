/**
 * 游戏开始的计时显示容器
 */

class ReadyTimer extends egret.DisplayObjectContainer {

    public static COMPLETE:string = "ReadyTimerComplete";

    private stageW:number;
    private stageH:number;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;

        this.showReady();
    }

    private showReady() {
        var ready:egret.Bitmap = new egret.Bitmap(RES.getRes("ready_png"));
        ready.anchorOffsetX = ready.width / 2;
        ready.anchorOffsetY = ready.height / 2;
        ready.x = this.stageW / 2;
        ready.y = this.stageH / 2;
        ready.scaleX = 0.6;
        ready.scaleY = 0.6;
        this.addChild(ready);

        // 这段动画是先放大显示再快速闪动三次
        egret.Tween.get(ready).to( {scaleX:1, scaleY:1}, 300)
            .to( {alpha:0.1}, 100 )
            .to( {alpha:1.0}, 100 )
            .to( {alpha:0.1}, 100 )
            .to( {alpha:1.0}, 100 )
            .to( {alpha:0.1}, 100 )
            .to( {alpha:1.0}, 100 )
            .to( {alpha:0.0}, 100 )
            .call( this.showGo, this );
    }

    private showGo() {
        this.removeChildren();

        var readyGo:egret.Bitmap = new egret.Bitmap(RES.getRes("ready_go_png"));
        readyGo.anchorOffsetX = readyGo.width / 2;
        readyGo.anchorOffsetY = readyGo.height / 2;
        readyGo.x = this.stageW / 2;
        readyGo.y = this.stageH / 2;
        readyGo.scaleX = 0.9;
        readyGo.scaleY = 0.9;
        readyGo.alpha = 0.8
        this.addChild(readyGo);

        egret.Tween.get(readyGo).to( {scaleX:1.2, scaleY:1.2, alpha:1.0}, 300)
            .to( {alpha:0.0}, 200 )
            .call( this.complete, this );
    }

    private complete() {
        this.dispatchEventWith(ReadyTimer.COMPLETE);
    }

}