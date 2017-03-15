/**
 * 关卡数据解析
 */
class LevelGameDataParse {
	//关卡数据使用json配置
	public static parseLevelGameData(val:any){
		GameData.stepNum = val.step;
		GameData.levelStepNum = val.step;
		GameData.elementTypes = val.element;
		GameData.levelBackgroundImageName = val.levelbgimg;

		LevelGameDataParse.parseLevelReq(val.levelreq);
	}

	//过关条件
	private static parseLevelReq(val:any){
		GameData.levelreq.openChange();
		var len:number = val.length;
		for(var i=0;i<len;i++){
			GameData.levelreq.addElement(val[i].type,val[i].num);
		}
	}
}