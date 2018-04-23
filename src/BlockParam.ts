class BlockParam {

    public static TYPE_COLOR:string = "Color";
    public static TYPE_NUMBER:string = "Number";
    public static MAGIC_ANSWER:number = 0xffffff;

    public static COLOR_RED:number = 0xff0000;
    public static COLOR_GREEN:number = 0x00ff00;
    public static COLOR_BLUE:number = 0x0000ff;
    public static COLOR_YELLOW:number = 0xffff00;
    public static COLOR_ORANGE:number = 0xff9c00;
    public static COLOR_PURPLE:number = 0xff00ff;

    public static RES_RED = "block_red_png";
    public static RES_GREEN = "block_green_png";
    public static RES_BLUE = "block_blue_png";
    public static RES_YELLOW = "block_yellow_png";
    public static RES_ORANGE = "block_orange_png";
    public static RES_PURPLE = "block_purple_png";

    public static RES_ZERO = "block_zero_png";
    public static RES_ONE = "block_one_png";
    public static RES_TWO = "block_two_png";
    public static RES_THREE = "block_three_png";
    public static RES_FOUR = "block_four_png";
    public static RES_FIVE = "block_five_png";
    public static RES_SIX = "block_six_png";
    public static RES_SEVEN = "block_seven_png";
    public static RES_EIGHT = "block_eight_png";
    public static RES_NINE = "block_nine_png";

    public static colorArr:number[] = [
        BlockParam.COLOR_RED,                               
        BlockParam.COLOR_ORANGE,
        BlockParam.COLOR_YELLOW,
        BlockParam.COLOR_GREEN,
        BlockParam.COLOR_BLUE,
        BlockParam.COLOR_PURPLE
    ];

    public static colorResArr:string[] = [
        BlockParam.RES_RED,                               
        BlockParam.RES_ORANGE,
        BlockParam.RES_YELLOW,
        BlockParam.RES_GREEN,
        BlockParam.RES_BLUE,
        BlockParam.RES_PURPLE
    ];

    public static numResArr:string[] = [
        BlockParam.RES_ZERO,
        BlockParam.RES_ONE,
        BlockParam.RES_TWO,
        BlockParam.RES_THREE,
        BlockParam.RES_FOUR,
        BlockParam.RES_FIVE,
        BlockParam.RES_SIX,
        BlockParam.RES_SEVEN,
        BlockParam.RES_EIGHT,
        BlockParam.RES_NINE,
    ];

    public static getRandomColor():number {
        var index = Math.floor(Math.random() * 6);
        return BlockParam.colorArr[index];
    }

    public static getRandomColorRes():string {
        var index = Math.floor(Math.random() * 6);
        return BlockParam.colorResArr[index];
    }

}