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
        score.y = this.stage.stageHeight / 4;
        score.scaleX = 2;
        score.scaleY = 2;
        this.addChild(score);

        let meter = new egret.Bitmap(RES.getRes("meter_png"));
        meter.anchorOffsetX = meter.width >> 1;
        meter.x = this.stage.stageWidth >> 1;
        meter.y = score.y + score.height * 2.4;
        this.addChild(meter);

        let retry = new egret.Bitmap(RES.getRes("retry_png"));
        retry.touchEnabled = true;
        retry.anchorOffsetX = retry.width / 2;
        retry.anchorOffsetY = retry.height / 2;
        retry.x = this.stage.stageWidth / 2;
        retry.y = this.stage.stageHeight * 0.95 - retry.height;
        retry.once(egret.TouchEvent.TOUCH_TAP, this.onRetry, this);
        retry.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt:egret.TouchEvent) => {
            egret.Tween.get(retry).to( {scaleX:0.8, scaleY:0.8}, 200 );
        }, this);
        retry.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, (evt:egret.TouchEvent) => {
            egret.Tween.get(retry).to( {scaleX:1.0, scaleY:1.0}, 200 );
        }, this);
        this.addChild(retry);

        let share = new egret.Bitmap(RES.getRes("share_png"));
        share.touchEnabled = true;
        share.anchorOffsetX = share.width / 2;
        share.anchorOffsetY = share.height / 2;
        share.x = this.stage.stageWidth / 2;
        share.y = retry.y - share.height * 1.5;
        share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        share.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt:egret.TouchEvent) => {
            egret.Tween.get(share).to( {scaleX:0.8, scaleY:0.8}, 200 );
        }, this);
        share.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, (evt:egret.TouchEvent) => {
            egret.Tween.get(share).to( {scaleX:1.0, scaleY:1.0}, 200 );
        }, this);
        share.addEventListener(egret.TouchEvent.TOUCH_END, (evt:egret.TouchEvent) => {
            egret.Tween.get(share).to( {scaleX:1.0, scaleY:1.0}, 200 );
        }, this);
        this.addChild(share);

        let ranking = new egret.Bitmap(RES.getRes("ranking_png"));
        ranking.touchEnabled = true;
        ranking.anchorOffsetX = ranking.width >> 1;
        ranking.x = this.stage.stageWidth >> 1;
        ranking.y = share.y - share.height - ranking.height;
        ranking.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRanking, this);
        this.addChild(ranking);

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

    private onRanking() {
        let ranking = new Ranking();
        this.addChild(ranking);
    }

    private onShare() {
        if(typeof(wx) != 'undefined') {
            wx.shareAppMessage({
                title: '这是你没玩过的公路赛车，看看你能跑多远？',
                imageUrl: '/resource/assets/share_title.png',
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