abstract class Question {

	private wrong: number = 1;
	private correct: number = 1;
	private description: String;

	public constructor() {

	}

	public empty(): boolean {
		return this.wrong + this.correct <= 0;
	}

	public produce(): Block {

		let wrong = this.wrong;
		let correct = this.correct;
		let total = wrong + correct;

		if(total == 0) {
			return null;
		}
		else{
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

	protected abstract produceWrong(): Block;

	protected abstract produceCorrect(): Block;
}