//---------------------------初始化部分-------------------
//
var nowPlayerNumber = 4;
var myPlayerNumber = 5;//0~5
var myPlayerPhase = -1;
//pos
var fromCardPos = {};
var toMyPos = {};
fromCardPos.x = 620;
fromCardPos.y = 450;
toMyPos.x = 620;
toMyPos.y = 850;
//-----------------------------------------------------场面呈现部分
var playerNumber = 6;//全局人数！
var playerList = new Array();
for(var i=0;i<playerNumber;i++){
	playerList[i] = {};
	playerList[i].id = "";
	playerList[i].posX = 0;
	playerList[i].posY = 0;
	playerList[i].hero = 0;
	playerList[i].hpMax = 0;
	playerList[i].hpNow = 0;
	playerList[i].equip = {};
	playerList[i].equip.weapon = -1;
	playerList[i].equip.defence = -1;
	playerList[i].equip.attHorse = -1;
	playerList[i].equip.defHorse = -1;
	playerList[i].cardSum = 0;//
	playerList[i].country = "shu"
	playerList[i].gender = "male";
	playerList[i].isFront = true;//
	playerList[i].isLive = true;//
}
//----------------------------------------------初始化存储数组
var animaList = new Array();//数组用来存储不同的动画效果  仅仅负责返回动画的路径 图片张数
for(var i=0;i<22;i++){//初始化22个动画 武器动画暂不添加
	animaList[i] = {};//初始化'结构体'
	animaList[i].frameList = new Array();//初始化针存储数组
	animaList[i].ListNum = 0;//frame数量
	animaList[i].sizeX = 0;//大小X
	animaList[i].sizeY = 0;//大小Y
	animaList[i].delay = 0;//每秒帧数
}

var musicList = new Array();//初始化音效 或者 技能！虽然可以复合  但是 分开更便于管理
for(var i=0;i<22;i++){
	musicList[i] = {};
	musicList[i].src = "";
}
//-------------------初始化技能部分
var Skills = new Array();
for(var i=0;i<10;i++){
	Skills[i] = {};
	Skills[i].animaNo = 0;
	Skills[i].sndSrc = "";
	Skills[i].type = "";
	//!!!!!!!!!!!!!!!
	Skills[i].active = {};//触发条件
	Skills[i].effect = {};//作用效果
}
//-------------------初始化全部武将部分
var Heros = new Array();
for(var i=0;i<10;i++){
	Heros[i] = {};
	Heros[i].imgSrc = "";
	Heros[i].name = "";
	Heros[i].country = "";
	Heros[i].gender = "";
	Heros[i].maxHP = "";
	Heros[i].skills = new Array();//多个技能 每个技能又有说明
}
//-------------------初始化161张牌部分
var Cards = new Array();//无需别的 因为只用存储参数
for(var i=0;i<161;i++){
	Cards[i] = {};
	Cards[i].name = "";
	Cards[i].type = "";
	Cards[i].suit = "";
	Cards[i].position = "";
	Cards[i].point = 0;
}
//cardsInit();
//alert("3");
//-------------初始化手牌部分
var HandCards = {};
HandCards.sum = 0;//全部的共有特点
HandCards.span = 0;
HandCards.sizeX = 93;
HandCards.sizeY = 130;
HandCards.holders = new Array();//每一个的独有特点 应该写成一个类 有一个独有参数 这样就不用在申请数组 变成结构体
HandCards.states = new Array();
HandCards.posX = new Array();
HandCards.posY = new Array();
HandCards.snds = new Array();
HandCards.cards = new Array();
//--------------------------------------------系统图片
var selectedBorder;  //边框！
var playingBorder;
var responsingBorder;
var sosBorder;

var startPhaseImg; //阶段图片  这个开始阶段大家仅有一次
var roundStartPhaseImg;
var judgePhaseImg;
var drawPhaseImg;
var playPhaseImg;
var discardPhaseImg;
var finishPhaseImg;

//--------------------------------------------自我操作信息表
var Myself = {};
Myself.maxTarget = 1;//选取目标的上线
Myself.targets = new Array();//选取的目标
Myself.targetStates = new Array(playerNumber);
//-------------------------------------------
var userTable = new Array();//用户列表 应该是最后初始化
//---------------------------------------SOCKET IO-------------------------------
var socketio = io.connect("ws://127.0.0.1:9999");
//两种类型的响应函数
var my_ID;//存储我的账号
socketio.on('conn-in',function(data){
	Console.log(data.welcome+" "+data.ID);
	my_ID = data.ID;
});
socketio.on('system',function(data){
	Console.log(data);
	handleMessage(data);
});
socketio.on('chat',function(data){
	Console.log(data);
});
socketio.on('changePhase',function(data){
	parsePhase(data);
	Console.log(data.player+"   "+data.phase);
});
//发送消息函数
function sendIO(type,data){
	socketio.emit(type,data);
}
//log 记录函数
var Console = {};
Console.log = (function(message) {
	var console = document.getElementById('chatroom');
	var p = document.createElement('p');
	p.style.wordWrap = 'break-word';
	p.innerHTML = message;
	console.appendChild(p);
	while (console.childNodes.length > 25) {
		console.removeChild(console.firstChild);
	}
	console.scrollTop = console.scrollHeight;
});
//为输入框绑定事件
$(document).ready(function(){//Start-----------------是全部读取完再开始内部的函数？
	$("#sendBox").keypress(function(e){
		if(e.keyCode == 13){
		e.preventDefault();
		Console.log("你:"+$('#sendBox').val());
		socketio.emit('chat',$('#sendBox').val());
		$('#sendBox').val('');
	}
	});
});//End-----------------------