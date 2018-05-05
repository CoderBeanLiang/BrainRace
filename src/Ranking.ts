class Ranking extends egret.DisplayObjectContainer {

    private rank: egret.Bitmap;
    private back:egret.Bitmap;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;

        let bg = new egret.Shape();
        bg.graphics.beginFill(0x333333);
        bg.graphics.drawRect(0, 0, stageW, stageH);
        bg.graphics.endFill();
        bg.alpha = 0.9;
        bg.touchEnabled = true;
        this.addChild(bg);

        this.back = new egret.Bitmap(RES.getRes("back_png"));
        this.back.touchEnabled = true;
        this.back.anchorOffsetX = this.back.width / 2;
        this.back.anchorOffsetY = this.back.height / 2;
        this.back.x = stageW / 2;
        this.back.y = stageH - this.back.height;
        this.back.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBackAnim, this);
        this.back.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBackCancel, this);
        this.back.once(egret.TouchEvent.TOUCH_END, this.onBackClick, this);
        this.addChild(this.back);

        if(typeof(wx) != 'undefined') {
            let openDataContext = wx.getOpenDataContext();

            if(openDataContext != null) {
                //主要示例代码开始
                const bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
                bitmapdata.$deleteSource = false;
                const texture = new egret.Texture();
                texture._setBitmapData(bitmapdata);
                this.rank = new egret.Bitmap(texture);
                this.rank.width = stageW;
                this.rank.height = stageH;
                this.rank.y = 0 - this.back.height / 2;
                this.addChild(this.rank);

                egret.startTick((timeStarmp: number) => {
                    egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                    bitmapdata.webGLTexture = null;
                    return false;
                }, this);
                //发送消息
                openDataContext.postMessage({
                    isDisplay: true,
                    text: 'hello',
                    year: (new Date()).getFullYear()
                });
            }
        }
    }

    private onBackAnim() {
        egret.Tween.get(this.back).to( {scaleX:0.8, scaleY:0.8}, 200 );
    }

    private onBackCancel() {
        egret.Tween.get(this.back).to( {scaleX:1.0, scaleY:1.0}, 200 );
    }

    private onBackClick() {
        this.back.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBackAnim, this);
        this.back.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBackCancel, this);

        this.parent.removeChild(this);
    }

}