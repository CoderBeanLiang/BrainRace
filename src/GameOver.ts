class GameOver extends egret.DisplayObjectContainer {

    public static GAME_OVER_RETRY = "GameOverRetry";
    public static GAME_OVER_HOME = "GameOverHome";

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    private init() {
        let mask = new egret.Shape();
        mask.graphics.beginFill(0x000000);
        mask.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        mask.graphics.endFill();
        mask.alpha = 0.6;
        this.addChild(mask);

        let retry = new egret.Bitmap(RES.getRes("retry_png"));
        retry.touchEnabled = true;
        retry.anchorOffsetX = retry.width / 2;
        retry.anchorOffsetY = retry.height / 2;
        retry.x = this.stage.stageWidth / 2;
        retry.y = this.stage.stageHeight / 2;
        retry.once(egret.TouchEvent.TOUCH_TAP, this.onRetry, this);
        this.addChild(retry);

        let home = new egret.Bitmap(RES.getRes("icon_home_png"));
        home.touchEnabled = true;
        home.x = 20;
        home.y = 20;
        home.once(egret.TouchEvent.TOUCH_TAP, this.onHome, this);
        this.addChild(home);
    }

    private onRetry() {
        this.dispatchEventWith(GameOver.GAME_OVER_RETRY);
    }

    private onHome() {
        this.dispatchEventWith(GameOver.GAME_OVER_HOME);
    }
}