class UtilObject {

	public constructor() {
	}

	public static BitmapTop(bitmap: egret.DisplayObject): number {
		return bitmap.y - bitmap.anchorOffsetY * bitmap.scaleY;
	}

	public static BitmapBottom(bitmap: egret.DisplayObject): number {
		return bitmap.y + (bitmap.height - bitmap.anchorOffsetY) * bitmap.scaleY;
	}

	public static BitmapLeft(bitmap: egret.DisplayObject): number {
		return bitmap.x - bitmap.anchorOffsetX * bitmap.scaleX;
	}

	public static BitmapRight(bitmap: egret.DisplayObject): number {
		return bitmap.x + (bitmap.width - bitmap.anchorOffsetX) * bitmap.scaleX;
	}

	public static BitmapHeight(bitmap: egret.DisplayObject): number {
		return bitmap.height * bitmap.scaleY;
	}

	public static overlay(obj: egret.DisplayObject, obs: egret.DisplayObject) {
		return this.BitmapRight(obj) < this.BitmapLeft(obs)
		 || this.BitmapLeft(obj) > this.BitmapRight(obs)
		 || this.BitmapBottom(obj) < this.BitmapTop(obs)
		 || this.BitmapTop(obj) > this.BitmapBottom(obs) ? false : true;
	}
}