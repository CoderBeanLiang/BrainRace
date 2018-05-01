class QuestionColor extends Question {

	private index: number;

	public constructor() {

		super();
		
		this.index = BlockParam.getRandomColorIndex();
	}

	protected produceWrong(): Block {
		let color = this.randomColor();
		return Block.produce(BlockParam.TYPE_COLOR, color);
	}

	protected produceCorrect(): Block {
		let color = BlockParam.getColorByIndex(this.index);
		return Block.produce(BlockParam.TYPE_COLOR, color);
	}

	protected produceDescription(): String {
		return BlockParam.getColorResDescByIndex(this.index);
	}

	protected initCount(): boolean {
		this.wrong = 2;
		this.correct = 1;
		return true;
	}

	protected judgeBlock(block: Block): boolean {
		return block.getAnswer() == BlockParam.getColorByIndex(this.index);
	}

	protected reclaimBlock(block: Block): void {
		Block.reclaim(block, BlockParam.TYPE_COLOR);
    }

	private randomColor(): number {
		let index = BlockParam.getRandomColorIndex();
		if(index == this.index) {
			return this.randomColor();
		} else {
			return BlockParam.getColorByIndex(index);
		}
	}
}