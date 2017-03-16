/**
 * 道具逻辑
 */
class PropLogic {
	
	//使用道具（道具编号，元素位置）
	public static useProp(proptype:number,elLocation:number){
		switch(proptype){
			case 0:
				PropLogic.tongse(elLocation);
				break;
			case 1:
				PropLogic.zhadan(elLocation);
				break;
			case 2:
				PropLogic.zhenghang(elLocation);
				break;
			case 3:
				PropLogic.zhenglie(elLocation);
				break;
			case 4:
				PropLogic.chanzi(elLocation);
				break;
		}
	}

	//同色
	private static tongse(loc:number){
		LinkLogic.lines = [];
		var arr:number[] = [];
		var type:string = GameData.elements[GameData.mapData[Math.floor(loc/8)][loc%8]].type;
		for(var i=0;i<GameData.MaxRow;i++){
			for(var t=0;t<GameData.MaxColumn;t++){
				if(GameData.mapData[i][t] != -1 &&
					GameData.elements[GameData.mapData[i][t]].type == type){
					arr.push(GameData.mapData[i][t]);
				}
			}
		}
		LinkLogic.lines.push(arr);
	}
	//炸弹
	private static zhadan(loc:number){
		LinkLogic.lines = [];
		var i:number = Math.floor(loc/8);
		var t:number = loc%8;
		var arr:number[] = [];
		arr.push(GameData.elements[GameData.mapData[i][t]].id);
		if(i>0 && GameData.mapData[i-1][t]!=-1){//上
			arr.push(GameData.elements[GameData.mapData[i-1][t]].id);
		}
		if(i<(GameData.MaxRow - 1) && GameData.mapData[i+1][t]!=-1){//下
			arr.push(GameData.elements[GameData.mapData[i+1][t]].id);
		}
		if(t>0 && GameData.mapData[i][t-1]!=-1){//左
			arr.push(GameData.elements[GameData.mapData[i][t-1]].id);
		}
		if(t<(GameData.MaxColumn - 1) && GameData.mapData[i][t+1]!=-1){//右
			arr.push(GameData.elements[GameData.mapData[i][t+1]].id);
		}
		LinkLogic.lines.push(arr);
	}
	//整行
	private static zhenghang(loc:number){
		LinkLogic.lines = [];
		var arr:number[] = [];
		var i:number = Math.floor(loc/8);
		for(var t:number = 0; t<GameData.MaxColumn;t++){
			if(GameData.mapData[i][t] != -1){
				arr.push(GameData.elements[GameData.mapData[i][t]].id);
			}
		}
		LinkLogic.lines.push(arr);
	}
	//整列
	private static zhenglie(loc:number){
		LinkLogic.lines = [];
		var arr:number[] = [];
		var t:number = loc%8;
		for(var i:number = 0; i<GameData.MaxRow;i++){
			if(GameData.mapData[i][t] != -1){
				arr.push(GameData.elements[GameData.mapData[i][t]].id);
			}
		}
		LinkLogic.lines.push(arr);
	}
	//铲子
	private static chanzi(loc:number){
		LinkLogic.lines = [];
		LinkLogic.lines.push([GameData.elements[GameData.mapData[Math.floor(loc/8)][loc%8]].id])
	}

}