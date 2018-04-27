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

	public static Overlay(obj: egret.Rectangle, obs: egret.DisplayObject) {
		let rect = new egret.Rectangle();
		rect.top = UtilObject.BitmapTop(obs);
		rect.left = UtilObject.BitmapLeft(obs);
		rect.right = UtilObject.BitmapRight(obs);
		rect.bottom = UtilObject.BitmapBottom(obs);
		return this.OverlayRectangle(obj, rect);
	}

	public static OverlayRectangle(obj: egret.Rectangle, obs: egret.Rectangle) {
		return obj.right < obs.left	|| obj.left > obs.right || obj.bottom < obs.top || obj.top > obs.bottom ? false : true;
	}
}