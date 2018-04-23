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
    private blockW:number = 100;
    private blockH:number = 100;

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

    private createColorBlock(color:number) {
        this.answer = color;

        let scale = 1;

        let resName = BlockParam.getRandomColorRes();
        var bmp:egret.Bitmap = new egret.Bitmap(RES.getRes(resName));
        this.blockW = scale * bmp.width;
        this.blockH = scale * bmp.height;

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
    }

    private createMagicBlock() {
        this.answer = BlockParam.MAGIC_ANSWER;
    }

}