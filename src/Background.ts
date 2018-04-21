
class Background extends egret.DisplayObjectContainer {

	private road: Array<egret.Bitmap> = new Array<egret.Bitmap>();
	private speed: number = 10;

	public constructor() {

		super();

		this.width = 400;
        this.initMember();
		this.initListener();
	}

	private initMember(): void {

	}

	private initListener(): void {
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private createRoad(): void {
		let road = this.road;

		while(road.length == 0 || this.BitmapTop(road[road.length - 1]) > 0) {
			this.appendRoad("road_png");
		}
	}

	private shiftRoad(): void {
		let road = this.road;
		road.shift();
	}

	private appendRoad(name: string): void {
		let road = this.road;
		let track = new egret.Bitmap();
		this.touchChildren
		track.texture = RES.getRes(name);
		track.scaleY = this.stage.stageWidth / track.width;
		track.scaleX = this.stage.stageWidth / track.width;
		if(road.length == 0) {
			track.y = this.stage.stageHeight - this.BitmapHeight(track);
		}
		else {
			track.y = this.BitmapTop(road[road.length - 1]) - this.BitmapHeight(track);
		}
		road.push(track);
		this.addChild(track);
	}

	private onEnterFrame(e: egret.Event) {
		let road = this.road;
		for (var i = 0; i < road.length; i++) {
			road[i].y += this.speed;
		}
		if(road.length > 0)
		{
			if(this.BitmapTop(road[0]) > this.stage.stageHeight)
			{
				this.shiftRoad();
			}
		}
		if(road.length > 0)
		{
			let index = road.length - 1;
			if(this.BitmapTop(road[index]) > 0)
			{
				this.appendRoad("road_png");
			}
		}
	}

    private onAddToStage(event:egret.Event) {
        this.createRoad();
    }

	private BitmapTop(bitmap: egret.Bitmap): number {
		return bitmap.y - bitmap.anchorOffsetY * bitmap.scaleY;
	}

	private BitmapHeight(bitmap: egret.Bitmap): number {
		return bitmap.height * bitmap.scaleY;
	}
}