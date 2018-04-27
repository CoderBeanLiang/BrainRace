abstract class Question {

	protected wrong: number = 2;
	protected correct: number = 1;
	protected description: String;

	public constructor() {

		this.initCount();

	}

	public produce(): Block {

		let wrong = this.wrong;
		let correct = this.correct;
		let total = wrong + correct;

		if(total == 0) {
			this.initCount();
			return this.produce();
		}
		else {
			let index = Math.floor(total * Math.random());
			if(index < wrong) {
				--this.wrong;
				return this.produceWrong();
			} else {
				--this.correct;
				return this.produceCorrect();
			}
		}
	}

	public title(): String {
		return this.produceDescription();	
	}
	
	public reclaim(block: Block): void {
		this.reclaimBlock(block);
	}

	public judge(block: Block): boolean {
		return this.judgeBlock(block);
	}

	protected abstract produceWrong(): Block;

	protected abstract produceCorrect(): Block;

	protected abstract produceDescription(): String;

	protected abstract initCount(): boolean;

	protected abstract judgeBlock(block: Block): boolean;

	protected abstract reclaimBlock(block: Block): void;
}