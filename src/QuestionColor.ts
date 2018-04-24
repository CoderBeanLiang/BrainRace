class QuestionColor extends Question {

	public constructor() {
		super();
	}

	protected produceWrong(): Block {
		let color = BlockParam.getRandomColor();
		return Block.produce(BlockParam.TYPE_COLOR, color);
	}

	protected produceCorrect(): Block {
		let color = BlockParam.getRandomColor();
		return Block.produce(BlockParam.TYPE_COLOR, color);
	}
}