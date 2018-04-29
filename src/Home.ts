class Home extends egret.DisplayObjectContainer {

    public static START_CLICK:string = "HomeStartClick";

    private start:egret.Bitmap;
    private sort:egret.Bitmap;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
    }

    private onAddToStage() {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;


        let bg = new Background();
        this.addChild(bg);

        this.start = new egret.Bitmap(RES.getRes("start_png"));
        this.start.touchEnabled = true;
        this.start.anchorOffsetX = this.start.width / 2;
        this.start.anchorOffsetY = this.start.height / 2;
        this.start.x = stageW / 2;
        this.start.y = stageH / 2 - this.start.height;
        this.start.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStartAnim, this);
        this.start.addEventListener(egret.TouchEvent.TOUCH_END, this.onStartClick, this);
        this.addChild(this.start);

        this.sort = new egret.Bitmap(RES.getRes("sort_png"));
        this.sort.touchEnabled = true;
        this.sort.anchorOffsetX = this.sort.width / 2;
        this.sort.anchorOffsetY = this.sort.height / 2;
        this.sort.x = stageW / 2;
        this.sort.y = stageH / 2 + this.sort.height;
        this.addChild(this.sort);
    }

    private onRemovedFromStage() {
        // 
    }

    private onStartAnim() {
        egret.Tween.get(this.start).to( {scaleX:0.8, scaleY:0.8}, 200 );
    }

    private onStartClick() {
        console.log("StartClicked");
        this.dispatchEventWith(Home.START_CLICK);
    }
}