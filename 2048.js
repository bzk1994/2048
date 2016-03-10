//游戏状态
//游戏进行中
const PLAYING = 0;
//方块正在移动中，期间不能响应键盘事件
const CELL_MOVING = 1;
//游戏结束状态，不能响应键盘事件
const GAME_OVER = 2;

//分数
var score = 0;

//当前游戏状态
var state = PLAYING;

//游戏初始化
document.body.onload = function(){
	//给开始按钮添加点击事件处理
	$('newGame').onclick = init;
	//执行初始化函数
	init();

}
//创建工厂函数获取指定id的dom元素
function $(id){
	return document.getElementById(id);
}

//声明一个二维数组，表示每个单元格的数值
var cells;


//声明初始化函数
function init(){
	$('gameOver').style.display = 'none';
	//初始化二维数组
	cells = [[],[],[],[]];
	for(var i=0;i<4;i++){
		for (var j=0;j<4 ;j++ )
		{
			cells[i][j]=0;
		}
	}

	//初始化积分

	score = 0;

	//生成两个随机数
	randomNumber();
	randomNumber();

	//根据最新状态更新视图
	updateView();

	state = PLAYING;
}
//full函数检测是否满了:返回true表示满了，返回false表示还有空位
function full(){
	for(var i=0;i<4;i++){
		for (var j=0;j<4 ;j++ )
		{
			if(cells[i][j]==0){
				return false;
			}
		}
	}
	return true;
}

 //产生随机数
function randomNumber(){
	if(full()){
			//full函数检测是否满了
			return;
		}
	while (true)
	{	
		
		var row = Math.floor(Math.random()*4);
		var col = Math.floor(Math.random()*4);
		if(cells[row][col]==0){
			if(Math.random()<0.5){
				cells[row][col] = 2;
				break;
			}
			else{
				cells[row][col] = 4;
				break;
			}
		}
	}
}

function updateView(){

	//清除当前样式和数值
	for(var row=0;row<4;row++){
		for (var col=0;col<4 ;col++ )
		{	
			console.log($('cell'+row+col));
			console.log(cells);
			$('cell'+row+col).innerHTML = '';
			$('cell'+row+col).className='cell';
			var num = cells[row][col];
			if (num !=0)
			{
				$('cell'+row+col).className='cell num'+num;
				$('cell'+row+col).innerHTML = num;
			}
		}
	}
	//更新记录
	$('score').innerHTML = score;
	$('finalScore').innerHTML = score;
}

