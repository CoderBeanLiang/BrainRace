class UtilMath {
	public constructor() {
	}

	public static RandomInt(L: number, R: number): number {
		return Math.floor(L + (R - L + 1) * Math.random());
	}

}