
class Background extends egret.DisplayObjectContainer {

	private road: Array<egret.Bitmap> = new Array<egret.Bitmap>();
	private speed: number = 0;
	private leftEdge: number = 120;
	private rightEdge: number = 520;

	private obstacle: Array<egret.DisplayObject> = new Array<egret.DisplayObject>();
	private offset: number = 200;
	private interval: number = 200;

	private question: Question;

	public constructor() {

		super();

        this.initMember();
		this.initListener();
	}

	public setSpeed(speed: number): void {
		this.speed = speed;
	}

	public getLeftEdge(): number {
		let road = this.road;
		if(road.length == 0)
		{
			return this.leftEdge;
		}
		return this.leftEdge * road[0].scaleX;
	}

	public getRightEdge(): number {
		let road = this.road;
		if(road.length == 0)
		{
			return this.rightEdge;
		}
		return this.rightEdge * road[0].scaleX;
	}

	public getRoadWith(): number {
		return this.getRightEdge() - this.getLeftEdge();
	}

	// 返回障碍物列表
	public getObstacle(): Array<egret.DisplayObject> {
		return this.obstacle;
	}

	private initMember(): void {

	}

	private initListener(): void {
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private createRoad(): void {
		let road = this.road;

		while(road.length == 0 || UtilObject.BitmapTop(road[road.length - 1]) > 0) {
			this.appendRoad("road_png");
		}
	}

	private shiftRoad(): void {
		let road = this.road;
		let track = road.shift();
		this.removeChild(track);
	}

	private appendRoad(name: string): void {
		let road = this.road;
		let track = new egret.Bitmap();
		track.texture = RES.getRes(name);
		track.scaleY = this.stage.stageWidth / track.width;
		track.scaleX = this.stage.stageWidth / track.width;
		if(road.length == 0) {
			track.y = this.stage.stageHeight - UtilObject.BitmapHeight(track);
		}
		else {
			track.y = UtilObject.BitmapTop(road[road.length - 1]) - UtilObject.BitmapHeight(track);
		}
		road.push(track);
		this.addChildAt(track, 0);
	}

	private appendObstacle(name: string): void {
		let obstacle = this.obstacle;
		let block = this.produceObstacle();
		block.x = Math.random() * (this.getRoadWith() - block.width) + this.getLeftEdge();
		if(obstacle.length == 0) {
			block.y = 0 - UtilObject.BitmapHeight(block);
		}
		else {
			let offset = this.interval + Math.random() * this.offset;
			block.y = UtilObject.BitmapTop(obstacle[obstacle.length - 1]) - UtilObject.BitmapHeight(block) - offset;
		}
		obstacle.push(block);
		this.addChildAt(block, 100);
	}

	private shiftObstacle(): void {
		let obstacle = this.obstacle;
		let block = obstacle.shift();
		this.removeChild(block);
	}


	private produceObstacle(): Block {

		let question = this.question;
		if(question == null) {
			this.question = new QuestionColor();
			question = this.question;
		}
		if(question.empty()) {
			this.question = new QuestionColor();
			question = this.question;
		}
		return question.produce();
	}

	private onEnterFrame(e: egret.Event) {
		let road = this.road;
		let obstacle = this.obstacle;
		for (var i = 0; i < road.length; i++) {
			road[i].y += this.speed;
		}
		for (var i = 0; i < obstacle.length; i++) {
			obstacle[i].y += this.speed;
		}
		// 删除窗口底部的路面
		if(road.length > 0)
		{
			if(UtilObject.BitmapTop(road[0]) > this.stage.stageHeight)
			{
				this.shiftRoad();
			}
		}
		// 添加窗口顶部的路面
		if(road.length > 0)
		{
			let index = road.length - 1;
			if(UtilObject.BitmapTop(road[index]) > 0)
			{
				this.appendRoad("road_png");
			}
		}
		// 删除窗口底部的障碍物
		if(obstacle.length > 0)
		{
			if(UtilObject.BitmapTop(obstacle[0]) > this.stage.stageHeight)
			{
				this.shiftObstacle();
			}
		}
		// 删除窗口顶部的障碍物
		if(obstacle.length > 0)
		{
			let index = obstacle.length - 1;
			if(UtilObject.BitmapTop(obstacle[index]) > 0)
			{
				this.appendObstacle("tail_png");
			}
		}
		if(obstacle.length == 0)
		{
			this.appendObstacle("tail_png");
		}
	}

    private onAddToStage(event:egret.Event) {
        this.createRoad();
    }
}