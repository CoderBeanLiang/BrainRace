class QuestionShow extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.init();
    }

    private init() {
        let rect = new egret.Shape();
        rect.graphics.beginFill(0x000000);
        rect.graphics.drawRect(0, 0, 640, 50);
        rect.graphics.endFill();
        this.addChild(rect);

        let text = new egret.TextField();
        text.text = "正确的方块颜色是    ";
        this.addChild(text);
    }

    public setColor(colorIndex:number) {
        let scale = 0.25;

        let resName = BlockParam.getColorResNameByIndex(colorIndex);
        let colorBmp = new egret.Bitmap(RES.getRes(resName));
        let rectW = colorBmp.width * scale;
        let rectH = colorBmp.height * scale;
        colorBmp.x = 500;

        let rect = new egret.Shape();
        rect.graphics.beginFill(0xffffff);
        rect.graphics.drawRect(500, 0, rectW, rectH);
        rect.graphics.endFill();
        this.addChild(rect);
        this.addChild(colorBmp);
        
        rect.mask = colorBmp;
    }
}