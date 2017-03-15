/**
 * 数据解析工具类
 */
class MapDataParse {
	public static createMapData(val:number[]):void{
		var len: number = val.length;
		GameData.unmapnum = len;
		var index:number = 0;
		for(var i = 0; i< len; i++){
			index = val[i];
			var row: number = Math.floor(index/GameData.MaxColumn);//行位置
			var col: number = index%GameData.MaxRow;//列位置
			GameData.mapData[row][col] = -1;
		}
		GameData.currentElementNum = GameData.MaxRow * GameData.MaxColumn - len;
	}
}