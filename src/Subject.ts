class Subject extends egret.DisplayObjectContainer {

    public static EVENT_UPDATE: string = "update";

    private subjectText:egret.TextField;

    private widthText: number = 100;

    private heightText: number = 50;
    
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(Subject.EVENT_UPDATE, this.updateSubject, this);
    }

    private onAddToStage() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.init();
    }

    private init() {
        let bg = new egret.Shape();
        let pivotX = this.stage.width / 2 - this.widthText / 2;
        let pivotY = this.stage.height - this.heightText;
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0, 0, this.widthText, this.heightText);
        bg.graphics.endFill();
        this.addChild(bg);

        this.subjectText = new egret.TextField();
        this.subjectText.width = this.widthText;
        this.subjectText.height = this.heightText;
        this.subjectText.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.subjectText);

        bg.x = pivotX;
        bg.y = 0;
        this.subjectText.x = pivotX;
        this.subjectText.y = 0;
    }

    public updateSubject(subject: egret.Event) {
        this.subjectText.text = subject.data;
    }

}