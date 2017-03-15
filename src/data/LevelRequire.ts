/**
 * 过关条件
 */
class LevelRequire {

	
	public reqElements: LevelRequireElement[];

	public constructor() {
		this.reqElements = [];
	}

	/**
	 * 获得关卡总数
	 */
	public getLevelReqNum(): number {
		return this.reqElements.length;
	}

	/**
	 * 添加元素
	 */
	public addElement(type: string, num: number){
		var ele: LevelRequireElement = new LevelRequireElement();
		ele.num = num;
		ele.type = type;
		this.reqElements.push(ele);
	}

	/**
	 * 启动关卡修改，每次开启游戏就清空元素
	 */
	public openChange(){
		this.reqElements = [];
	}

	/**
	 * 减少过关条件数据
	 */
	public changeReqNum(type:string, num:number){
		var l:number = this.getLevelReqNum();
		for(var i=0; i<l; i++){
			if(this.reqElements[i].type = type){
				this.reqElements[i].num -= num;
				return ;
			}
		}
	}

	/**
	 * 元素是否已被清空
	 */
	public isClear():boolean {
		var l:number = this.getLevelReqNum();
		for(var i=0; i<l; i++){
			if(this.reqElements[i].num>0){
				return false;
			}
		}
		return true;
	}
}
