
class Background extends egret.DisplayObjectContainer {

	private road: Array<egret.Bitmap> = new Array<egret.Bitmap>();
	private speed: number = 0;
	private leftEdge: number = 120;
	private rightEdge: number = 520;

	private obstacle: Array<egret.DisplayObject> = new Array<egret.DisplayObject>();
	private obstacleOffset: number = 200;
	private obstacleInterval: number = 200;


	private scenery: Array<egret.Bitmap> = new Array<egret.Bitmap>();
	private sceneryOffset: number = 400;
	private sceneryInterval: number = 200;
	private sceneryGuardrailWidth: number = 30;

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

	public getRoadWidth(): number {
		return this.getRightEdge() - this.getLeftEdge();
	}

	// 返回障碍物列表
	public getObstacle(): Array<egret.DisplayObject> {
		return this.obstacle;
	}

	public getQuestion(): Question {
		return this.question;
	}

	public newQuestion(): void {
		
		let value = UtilMath.RandomInt(0, 1);
		if(value == 0) {
			this.question = new QuestionNumber();
		} else {
			this.question = new QuestionColor();
		}
		this.dispatchEventWith(Subject.EVENT_UPDATE, false, this.question.title());
	}

	private initMember(): void {

	}

	private initListener(): void {
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
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

	private shiftScenery(): void {
		let scenery = this.scenery;
		let object = scenery.shift();
		this.removeChild(object);
	}

	private appendScenery(name: string): void {
		let scenery = this.scenery;
		let object = new egret.Bitmap();
		object.texture = RES.getRes(name);
		if(scenery.length == 0) {
			object.y = 0 - UtilObject.BitmapHeight(object);
		}
		else {
			let offset = this.sceneryInterval + Math.random() * this.sceneryOffset;
			object.y = UtilObject.BitmapTop(scenery[scenery.length - 1]) - UtilObject.BitmapHeight(object) - offset;
		}
		let witdh = UtilObject.BitmapWidth(object);
		if(UtilMath.RandomInt(0, 1) == 0) {
			object.x = UtilMath.Random(0, this.leftEdge - witdh - this.sceneryGuardrailWidth);
		} else {
			object.x = UtilMath.Random(this.rightEdge + this.sceneryGuardrailWidth, this.stage.width - witdh);
		}
		scenery.push(object);
		this.addChildAt(object, 100);
	}

	private appendObstacle(name: string): void {
		let obstacle = this.obstacle;
		let block = this.produceObstacle();
		block.x = Math.random() * (this.getRoadWidth() - block.width) + this.getLeftEdge();
		if(obstacle.length == 0) {
			block.y = 0 - UtilObject.BitmapHeight(block);
		}
		else {
			let offset = this.obstacleInterval + Math.random() * this.obstacleOffset;
			block.y = UtilObject.BitmapTop(obstacle[obstacle.length - 1]) - UtilObject.BitmapHeight(block) - offset;
		}
		obstacle.push(block);
		this.addChildAt(block, 100);
	}

	private shiftObstacle(): void {
		let obstacle = this.obstacle;
		let block = obstacle.shift();
		let question = this.question;
		this.removeChild(block);
		if(block instanceof Block) {
			question.reclaim(block);
		}
	}


	private produceObstacle(): Block {

		let question = this.question;
		if(question == null) {
			this.newQuestion();
			question = this.question;
		}
		return question.produce();
	}

	private onEnterFrame(e: egret.Event) {
		let road = this.road;
		let scenery = this.scenery;
		let obstacle = this.obstacle;
		for (var i = 0; i < road.length; i++) {
			road[i].y += this.speed;
		}
		for (var i = 0; i < scenery.length; i++) {
			scenery[i].y += this.speed;
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
		// 删除窗口底部的景物
		if(scenery.length > 0)
		{
			if(UtilObject.BitmapTop(scenery[0]) > this.stage.stageHeight)
			{
				this.shiftScenery();
			}
		}
		// 添加窗口顶部的景物
		if(scenery.length > 0)
		{
			let index = scenery.length - 1;
			if(UtilObject.BitmapTop(scenery[index]) > 0)
			{
				this.appendScenery("tree"+ UtilMath.RandomInt(1, 7) + "_png");
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
		// 添加窗口顶部的障碍物
		if(obstacle.length > 0)
		{
			let index = obstacle.length - 1;
			if(UtilObject.BitmapTop(obstacle[index]) > 0)
			{
				this.appendObstacle("tail_png");
			}
		}
		if(scenery.length == 0)
		{
			this.appendScenery("tree1_png");
		}
		if(obstacle.length == 0)
		{
			this.appendObstacle("tail_png");
		}
	}

    private onAddToStage(event:egret.Event) {
        this.createRoad();
    }
	
	private onRemovedFromStage(event:egret.Event) {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
    }
}