/**
 * 区块
 * 每个区块对应一个数字答案，该数字用于和游戏管理器生成的答案进行比较
 * 区块大小限制在一个浮动区间内
 */

class Block extends egret.DisplayObjectContainer {

    // 对象池
    private static cacheDict:Object = {};

    // 生产
    public static produce(typeName:string, answer:number):Block {
        if (Block.cacheDict[typeName] == null) {
            Block.cacheDict[typeName] = [];
        }

        var dict:Block[] = Block.cacheDict[typeName];
        var block:Block;
        if (dict.length > 0) {
            block = dict.pop();
        } else {
            block = new Block(typeName);
        }

        // 变更区块
        block.setAnswer(answer);
        return block;
    }

    // 回收
    public static reclaim(block:Block, typeName:string):void {
        if (Block.cacheDict[typeName] == null) {
            Block.cacheDict[typeName] = [];
        }

        var dict:Block[] = Block.cacheDict[typeName];
        if (dict.indexOf(block) == -1) {
            dict.push(block);
        }
    }


    // 区块大小
    private blockW:number = 0;
    private blockH:number = 0;

    // 区块类型名称
    private typeName:string;
    private answer:number = 0;

    public constructor(typeName:string) {
        super();
        this.typeName = typeName;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
    }

    // private onAddToStage() {
    //     this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    //     this.createBlock();
    // }

    public getType():string {
        return this.typeName;
    }

    public getAnswer():number {
        return this.answer;
    }

    public setAnswer(answer:number) {
        this.removeChildren();
        switch(this.typeName) {
            case BlockParam.TYPE_COLOR:
                this.createColorBlock(answer);
                break;
            case BlockParam.TYPE_NUMBER:
                this.createNumberBlock(answer);
                break;
            default:
                this.createMagicBlock();
                break
        }
    }

    /**
     * 创建颜色方块，使用遮罩
     */
    private createColorBlock(color:number) {
        this.answer = color;

        let scale = 1;

        let resName = BlockParam.getRandomColorRes();
        var bmp:egret.Bitmap = new egret.Bitmap(RES.getRes(resName));
        this.blockW = scale * bmp.width;
        this.blockH = scale * bmp.height;

        var bg:egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0, 0, this.blockW, this.blockH);
        bg.graphics.endFill();
        this.addChild(bg);

        var rect:egret.Shape = new egret.Shape();
        rect.graphics.beginFill(color);
        rect.graphics.drawRect(0, 0, this.blockW, this.blockH);
        rect.graphics.endFill();
        this.addChild(rect);

        bmp.scaleX = scale;
        bmp.scaleY = scale;
        this.addChild(bmp);

        rect.mask = bmp;
    }

    private createNumberBlock(num:number) {
        this.answer = num;

        let scale = 1;

        var temp = num;
        var bmpArr:egret.Bitmap[] = [];

        // 计算加载位图
        // 10 是避免死循环，实际不会有这么大的数
        for (var i = 0; i < 10; i++) {
            if (temp > 0) {
                let resName = BlockParam.numResArr[temp % 10];
                bmpArr.push(new egret.Bitmap(RES.getRes(resName)));
                temp = Math.floor(temp / 10);
            } else {
                break;
            }
        }

        // 依次显示位图
        for(var i = 0; i < bmpArr.length; i++) {
            let bmp = bmpArr[bmpArr.length - 1 - i];
            
            bmp.x = this.blockW;

            this.addChild(bmp);

            this.blockW += scale * bmp.width;
            this.blockH = scale * bmp.height;
        }

        // 添加白背景色
        var bg:egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0, 0, this.blockW, this.blockH);
        bg.graphics.endFill();
        this.addChildAt(bg, 0);
    }

    private createMagicBlock() {
        this.answer = BlockParam.MAGIC_ANSWER;
    }

}