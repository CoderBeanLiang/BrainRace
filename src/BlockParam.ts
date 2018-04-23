class BlockParam {

    public static TYPE_COLOR:string = "Color";
    public static TYPE_NUMBER:string = "Number";
    public static MAGIC_ANSWER:number = 0xffffffff;

    public static COLOR_RED:number = 0xffff0000;
    public static COLOR_GREEN:number = 0xff00ff00;
    public static COLOR_BLUE:number = 0xff0000ff;
    public static COLOR_YELLOW:number = 0xffffff00;
    public static COLOR_ORANGE:number = 0xffff9c00;
    public static COLOR_PURPLE:number = 0xffff00ff;

    public static RES_RED = "block_red_png";
    public static RES_GREEN = "block_green_png";
    public static RES_BLUE = "block_blue_png";
    public static RES_YELLOW = "block_yellow_png";
    public static RES_ORANGE = "block_orange_png";
    public static RES_PURPLE = "block_purple_png";

    public static colorArr:number[] = [BlockParam.COLOR_RED,
                                       BlockParam.COLOR_ORANGE,
                                       BlockParam.COLOR_YELLOW,
                                       BlockParam.COLOR_GREEN,
                                       BlockParam.COLOR_BLUE,
                                       BlockParam.COLOR_PURPLE];

    public static colorResArr:string[] = [BlockParam.RES_RED,
                                       BlockParam.RES_ORANGE,
                                       BlockParam.RES_YELLOW,
                                       BlockParam.RES_GREEN,
                                       BlockParam.RES_BLUE,
                                       BlockParam.RES_PURPLE];

    public static getRandomColor():number {
        var index = Math.floor(Math.random() * 6);
        return BlockParam.colorArr[index];
    }

    public static getRandomColorRes():string {
        var index = Math.floor(Math.random() * 6);
        return BlockParam.colorResArr[index];
    }

}