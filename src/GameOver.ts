class GameOver extends egret.DisplayObjectContainer {

    public static GAME_OVER_RETRY = "GameOverRetry";
    public static GAME_OVER_HOME = "GameOverHome";

    private info:any;

    public constructor(info:any) {
        super();
        this.info = info;
        this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    private init() {
        let mask = new egret.Shape();
        mask.graphics.beginFill(0x000000);
        mask.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        mask.graphics.endFill();
        mask.alpha = 0.75;
        this.addChild(mask);

        let score = new Score();
        score.showScore(this.info);
        score.anchorOffsetX = - score.width / 2;// Score数字是从后往前添加，所以默认锚点0在右侧
        score.x = this.stage.stageWidth / 2;
        score.y = this.stage.stageHeight / 3;
        score.scaleX = 2;
        score.scaleY = 2;
        this.addChild(score);

        let retry = new egret.Bitmap(RES.getRes("retry_png"));
        retry.touchEnabled = true;
        retry.anchorOffsetX = retry.width / 2;
        retry.anchorOffsetY = retry.height / 2;
        retry.x = this.stage.stageWidth / 2;
        retry.y = this.stage.stageHeight * 0.55;
        retry.once(egret.TouchEvent.TOUCH_TAP, this.onRetry, this);
        this.addChild(retry);

        let share = new egret.Bitmap(RES.getRes("share_png"));
        share.touchEnabled = true;
        share.anchorOffsetX = share.width / 2;
        share.anchorOffsetY = share.height / 2;
        share.x = this.stage.stageWidth / 2;
        share.y = this.stage.stageHeight * 0.75;
        share.once(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.addChild(share);

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

    private onShare() {
        if(typeof(wx) != 'undefined') {
            wx.onShareAppMessage(function () {
                // 用户点击了“转发”按钮
                return {
                    title: '转发标题'
                }
                })
            wx.showShareMenu({
                withShareTicket: false,
                success: res => {
                    console.log(res);
                },
                fail: err => {
                    console.log(err);
                },
                complete: () => {

                }
                });

            wx.shareAppMessage({
                title: '转发标题',
                imageUrl: null,
                query: null,
                success: res => {
                    console.log(res);
                },
                fail: err => {
                    console.log(err);
                },
                complete: () => {

                }
            });
        }
    }
}