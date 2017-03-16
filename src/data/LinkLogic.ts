/**
 * 连线算法
 */
class LinkLogic {
	public static lines:number[][];

	//是否存在连线
	public static isHaveLine():boolean {
		LinkLogic.lines = [];//可消除的元素
		var currentType: string = "";//当前类型
		var typeNum:number = 0;//类型计数器

		//横向检索
		for(var i=0;i<GameData.MaxColumn;i++){
			for(var t=0;t<GameData.MaxRow;t++){
				if(GameData.mapData[i][t] != -1){
					if(currentType != GameData.elements[ GameData.mapData[i][t] ].type){
						if(typeNum>=3){
							var arr:number[] = [];
							for(var q = 0; q<typeNum;q++){
								arr.push(GameData.mapData[i][t-q-1]);
							}
							LinkLogic.lines.push(arr);
						}
						currentType = GameData.elements[ GameData.mapData[i][t] ].type;
						typeNum = 1;
					}else{
						typeNum++;
					}
				}else{
					if(typeNum>=3){
						var arr:number[] = [];
						for(var q = 0; q<typeNum;q++){
							arr.push(GameData.mapData[i][t-q-1]);
						}
						LinkLogic.lines.push(arr);
					}
					currentType = "";
					typeNum = 0;
				}
			}
			if(typeNum>=3){
				var arr:number[] = [];
				for(var q = 0; q<typeNum;q++){
					arr.push(GameData.mapData[i][t-q-1]);
				}
				LinkLogic.lines.push(arr);
			}
			currentType = "";
			typeNum = 0;
		}

		//纵向检索
		for(i=0;i<GameData.MaxRow;i++){
			for(var t=0;t<GameData.MaxColumn;t++){
				if(GameData.mapData[i][t] != -1){
					if(currentType != GameData.elements[ GameData.mapData[i][t] ].type){
						if(typeNum>=3){
							var arr:number[] = [];
							for(var q = 0; q<typeNum;q++){
								arr.push(GameData.mapData[t-q-1][i]);
							}
							LinkLogic.lines.push(arr);
						}
						currentType = GameData.elements[ GameData.mapData[i][t] ].type;
						typeNum = 1;
					}else{
						typeNum++;
					}
				}else{
					if(typeNum>=3){
						var arr:number[] = [];
						for(var q = 0; q<typeNum;q++){
							arr.push(GameData.mapData[t-q-1][i]);
						}
						LinkLogic.lines.push(arr);
					}
					currentType = "";
					typeNum = 0;
				}
			}
			if(typeNum>=3){
				var arr:number[] = [];
				for(var q = 0; q<typeNum;q++){
					arr.push(GameData.mapData[t-q-1][i]);
				}
				LinkLogic.lines.push(arr);
			}
			currentType = "";
			typeNum = 0;
		}
		
		return LinkLogic.lines.length !=0;
	}

	//是否存在下一次的连线
	public static isNextHaveLine():boolean{
		for(var i=0;i<GameData.MaxRow;i++){//行
			for(var t=0;i<GameData.MaxColumn;t++){//列
				//当前元素有意义
				if(GameData.mapData[i][t]!=-1){

					//连续方块的判断
					//横向
					if(t<(GameData.MaxColumn-1) && //元素不是最右边
						GameData.mapData[i][t+1]!=-1 && //右一个元素有意义
						GameData.elements[GameData[i][t]].type==GameData.elements[GameData[i][t+1]].type){//与当前元素相同
			
						if(t>0&&GameData.mapData[i][t-1]!=-1){//不靠左侧，且左第一个元素有意义
							if(i>0&&t>0&&//当前元素不在顶部，不在左侧
							GameData.mapData[i-1][t-1]&&//左上角的元素不为空
							GameData.mapData[i-1][t-1]!=-1&&//有意义
							GameData.elements[GameData.mapData[i-1][t-1]].type == GameData.elements[GameData.mapData[i][t]].type){//与当前元素相同
								return true;
							}

							if(i<(GameData.MaxRow-1)&&t>0&&//当前元素不在底部，不在左侧
							GameData.mapData[i+1][t-1]&&//左下角的元素不为空
							GameData.mapData[i+1][t-1]!=-1&&//有意义
							GameData.elements[GameData.mapData[i+1][t-1]].type == GameData.elements[GameData.mapData[i][t]].type){//与当前元素相同
								return true;
							}

							if(t>1&&//当前元素不在第1、2列
							GameData.mapData[i][t-2]&&//左侧隔一格的元素不为空
							GameData.mapData[i][t-2]!=-1&&//有意义
							GameData.elements[GameData.mapData[i][t-2]].type == GameData.elements[GameData.mapData[i][t]].type){//与当前元素相同
								return true;
							}
						}
						
						if(t<(GameData.MaxColumn -2 )&&GameData.mapData[i][t+2]!=-1){//不靠最右侧，且右第二个元素有意义（因为当前的元素是横向连续2个的左边那个）
							if(i>0&&//当前元素不在顶部
							GameData.mapData[i-1][t+2]&&//隔一格的元素右上角的元素不为空
							GameData.mapData[i-1][t+2]!=-1&&//有意义
							GameData.elements[GameData.mapData[i-1][t+2]].type == GameData.elements[GameData.mapData[i][t]].type){//与当前元素相同
								return true;
							}

							if(i<(GameData.MaxRow-2)&&//当前元素不在底部
							GameData.mapData[i+1][t+2]&&//隔一格的元素右下角的元素不为空
							GameData.mapData[i+1][t+2]!=-1&&//有意义
							GameData.elements[GameData.mapData[i+1][t+2]].type == GameData.elements[GameData.mapData[i][t]].type){//与当前元素相同
								return true;
							}

							if(t<(GameData.MaxColumn-3)&&//当前元素不在倒数第1、2、3列
							GameData.mapData[i][t+3]&&//右侧隔一格的元素不为空
							GameData.mapData[i][t+3]!=-1&&//有意义
							GameData.elements[GameData.mapData[i][t+3]].type == GameData.elements[GameData.mapData[i][t]].type){//与当前元素相同
								return true;
							}
						}
					}

					//纵向
					if(i<(GameData.MaxRow-1) && //当前元素不是最底部
						GameData.mapData[i+1][t]!=-1 && //下侧一个元素有意义
						GameData.elements[GameData[i][t]].type==GameData.elements[GameData[i+1][t]].type){//与当前元素相同
						
						if(i>0&&GameData.mapData[i-1][t]!=-1){//不靠顶部，且上侧一个元素有意义
							if(t>0&&i>0&&//当前元素不在左侧，不在顶部
							GameData.mapData[i-1][t-1]&&//左上角的元素不为空
							GameData.mapData[i-1][t-1]!=-1&&//有意义
							GameData.elements[GameData.mapData[i-1][t-1]].type == GameData.elements[GameData.mapData[i][t]].type){//与当前元素相同
								return true;
							}

							if(t<(GameData.MaxColumn-1)&&i>0&&//当前元素不在右侧，不在顶部
							GameData.mapData[i-1][t+1]&&//右上角的元素不为空
							GameData.mapData[i-1][t+1]!=-1&&//有意义
							GameData.elements[GameData.mapData[i-1][t+1]].type == GameData.elements[GameData.mapData[i][t]].type){//与当前元素相同
								return true;
							}

							if(i>1&&//当前元素不在第1、2行
							GameData.mapData[i-2][t]&&//上侧隔一格的元素不为空
							GameData.mapData[i-2][t]!=-1&&//有意义
							GameData.elements[GameData.mapData[i][t-2]].type == GameData.elements[GameData.mapData[i][t]].type){//与当前元素相同
								return true;
							}
						}
						
						if(i<(GameData.MaxRow - 2 )&&GameData.mapData[i + 2][t]!=-1){//不靠底部，且下侧第二个元素有意义（因为当前的元素是纵向连续2个的上侧那个）
							if(t>0&&//当前元素不在顶部
							GameData.mapData[i+2][t-1]&&//隔一格的元素左下角的元素不为空
							GameData.mapData[i+2][t-1]!=-1&&//有意义
							GameData.elements[GameData.mapData[i+2][t-1]].type == GameData.elements[GameData.mapData[i][t]].type){//与当前元素相同
								return true;
							}

							if(t<(GameData.MaxColumn-2)&&//当前元素不在底部
							GameData.mapData[i+2][t+1]&&//隔一格的元素右下角的元素不为空
							GameData.mapData[i+2][t+1]!=-1&&//有意义
							GameData.elements[GameData.mapData[i+2][t+1]].type == GameData.elements[GameData.mapData[i][t]].type){//与当前元素相同
								return true;
							}

							if(i<(GameData.MaxRow-3)&&//当前元素不在倒数第1、2行
							GameData.mapData[i+3][t]&&//下侧隔一格的元素不为空
							GameData.mapData[i+3][t]!=-1&&//有意义
							GameData.elements[GameData.mapData[i+3][t]].type == GameData.elements[GameData.mapData[i][t]].type){//与当前元素相同
								return true;
							}
						}
					}
				}

				//隔开的方块判断
				//横向
				if(t<(GameData.MaxColumn - 2)&&//当前元素不在倒数第1、2列
				GameData.mapData[i][t+2]!=-1&&//右侧第二个元素有效
				GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i][t+2]].type){//与当前元素相同
					if(GameData.mapData[i][t+1]!=-1){//右侧第一个元素有效
						if(i>0&&//当前元素不在顶部
							GameData.mapData[i-1][t+1]&&//右上角元素不为空
							GameData.mapData[i-1][t+1]!=-1&&//有效
							GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i-1][t+1]].type){//与当前元素相同
								return true;
						}
						if(i<(GameData.MaxRow-1)&&//不在最底部
							GameData.mapData[i+1][t+1]&&//左下角元素不为空
							GameData.mapData[i+1][t+1]!=-1&&//有效
							GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i+1][t+1]].type){//与当前元素相同
								return true;
						}
					}
				}

				//纵向
				if(i<(GameData.MaxRow - 2)&&//当前元素不在倒数第1、2行
				GameData.mapData[i+2][t]!=-1&&//下侧第二个元素有效
				GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i+2][t]].type){//与当前元素相同
					if(GameData.mapData[i+1][t]!=-1){//下侧第一个元素有效
						if(t>0&&//当前元素不在左侧
							GameData.mapData[i+1][t-1]&&//左下角元素不为空
							GameData.mapData[i+1][t-1]!=-1&&//有效
							GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i+1][t-1]].type){//与当前元素相同
								return true;
						}
						if(t<(GameData.MaxColumn-1)&&//不在最右侧
							GameData.mapData[i+1][t+1]&&//左下角元素不为空
							GameData.mapData[i+1][t+1]!=-1&&//有效
							GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i+1][t+1]].type){//与当前元素相同
								return true;
						}
					}
				}
			}
		}
		return false;
	}
	
	//交换元素算法
	public static isHaveLineByIndex(p1:number,p2:number):boolean{
		
		var p1n:number = p1;
		var p2n:number = p2;

		var p1id:number = GameData.mapData[Math.floor(p1/GameData.MaxColumn)][p1%GameData.MaxRow];
		var p2id:number = GameData.mapData[Math.floor(p2/GameData.MaxColumn)][p2%GameData.MaxRow];

		GameData.mapData[Math.floor(p1/GameData.MaxColumn)][p1%GameData.MaxRow] = p2id;
		GameData.mapData[Math.floor(p2/GameData.MaxColumn)][p2%GameData.MaxRow] = p1id;

		//判断是否正常连线
		var rel:boolean = LinkLogic.isHaveLine();
		if(rel){
			//交换元素
			GameData.elements[p1id].location = p2;
			GameData.elements[p2id].location = p1;
			return true;
		}else{
			//还原元素
			GameData.mapData[Math.floor(p1/GameData.MaxColumn)][p1%GameData.MaxRow] = p1id;
			GameData.mapData[Math.floor(p2/GameData.MaxColumn)][p2%GameData.MaxRow] = p2id;
		}
		return false;
	}
}