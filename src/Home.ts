class Home extends egret.DisplayObjectContainer {

    public static START_CLICK:string = "HomeStartClick";

    private start:egret.Bitmap;
    private back:egret.Bitmap;
    private sort:egret.Bitmap;
    private rank: egret.Bitmap;
    private title:egret.Bitmap;

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

        this.title = new egret.Bitmap(RES.getRes("title_png"));
        this.title.x = (stageW - this.title.width) / 2;
        this.title.y = stageH * 0.2;
        this.addChild(this.title);

        // 因为有动画，所以直接将锚点设为中心点
        this.start = new egret.Bitmap(RES.getRes("start_png"));
        this.start.touchEnabled = true;
        this.start.anchorOffsetX = this.start.width / 2;
        this.start.anchorOffsetY = this.start.height / 2;
        this.start.x = stageW / 2;
        this.start.y = stageH * 0.7 - this.start.height * 0.6;
        this.start.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStartAnim, this);
        this.start.addEventListener(egret.TouchEvent.TOUCH_END, this.onStartClick, this);
        this.start.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onStartCancel, this);
        this.addChild(this.start);

        // 因为有动画，所以直接将锚点设为中心点
        this.sort = new egret.Bitmap(RES.getRes("sort_png"));
        this.sort.touchEnabled = true;
        this.sort.anchorOffsetX = this.sort.width / 2;
        this.sort.anchorOffsetY = this.sort.height / 2;
        this.sort.x = stageW / 2;
        this.sort.y = stageH * 0.7 + this.sort.height * 0.6;
        this.sort.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSortAnim, this);
        this.sort.addEventListener(egret.TouchEvent.TOUCH_END, this.onSortClick, this);
        this.sort.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onSortCancel, this);
        this.addChild(this.sort);
    }

    private onRemovedFromStage() {
        // 
    }

    private onStartAnim() {
        egret.Tween.get(this.start).to( {scaleX:0.8, scaleY:0.8}, 200 );
    }

    private onStartCancel() {
        egret.Tween.get(this.start).to( {scaleX:1.0, scaleY:1.0}, 200 );
    }

    private onStartClick() {
        console.log("StartClicked");
        this.dispatchEventWith(Home.START_CLICK);
    }

    private onBackAnim() {
        egret.Tween.get(this.back).to( {scaleX:0.8, scaleY:0.8}, 200 );
    }

    private onBackCancel() {
        egret.Tween.get(this.back).to( {scaleX:1.0, scaleY:1.0}, 200 );
    }

    private onBackClick() {
        this.back.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBackAnim, this);
        this.back.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBackClick, this);
        this.back.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBackCancel, this);
        if(this.contains(this.back)) {
            this.removeChild(this.back);
        }
        if(this.contains(this.rank)) {
            this.removeChild(this.rank);
        }

        this.onAddToStage();
    }

    private onSortAnim() {
        egret.Tween.get(this.sort).to( {scaleX:0.8, scaleY:0.8}, 200 );
    }

    private onSortCancel() {
        egret.Tween.get(this.sort).to( {scaleX:1.0, scaleY:1.0}, 200 );
    }

    private onSortClick() {

        this.sort.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSortAnim, this);
        this.sort.removeEventListener(egret.TouchEvent.TOUCH_END, this.onSortClick, this);
        this.sort.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onSortCancel, this);
        this.start.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStartAnim, this);
        this.start.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStartClick, this);
        this.start.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onStartCancel, this);
        this.removeChild(this.start);
        this.removeChild(this.sort);
        this.removeChild(this.title);

        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;

        this.back = new egret.Bitmap(RES.getRes("back_png"));
        this.back.touchEnabled = true;
        this.back.anchorOffsetX = this.back.width / 2;
        this.back.anchorOffsetY = this.back.height / 2;
        this.back.x = stageW / 2;
        this.back.y = stageH - this.back.height;
        this.back.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBackAnim, this);
        this.back.addEventListener(egret.TouchEvent.TOUCH_END, this.onBackClick, this);
        this.back.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBackCancel, this);
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
}