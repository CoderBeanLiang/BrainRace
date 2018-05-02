class QuestionNumber extends Question {

	private number1: number;

	private number2: number;

	private answer: number;

	public constructor() {

		super();
		
		this.number1 = UtilMath.RandomInt(0, 10);
		this.number2 = UtilMath.RandomInt(0, 10);
		this.answer = (this.number1 * this.number2) % 10;
	}

	protected produceWrong(): Block {
		let value = this.randomNumber();
		return Block.produce(BlockParam.TYPE_NUMBER, value);
	}

	protected produceCorrect(): Block {
		return Block.produce(BlockParam.TYPE_NUMBER, this.answer);
	}

	protected produceDescription(): String {
		return new String(this.number1) + " x " + new String(this.number2) + " = ";
	}

	protected initCount(): boolean {
		this.wrong = 2;
		this.correct = 1;
		return true;
	}

	protected judgeBlock(block: Block): boolean {
		return block.getType() == BlockParam.TYPE_NUMBER && this.answer == block.getAnswer();
	}

	protected reclaimBlock(block: Block): void {
		Block.reclaim(block, block.getType());
    }

	private randomNumber(): number {
		let value = UtilMath.RandomInt(0, 10);
		if(value == this.answer) {
			return this.randomNumber();
		} else {
			return value;
		}
	}
}