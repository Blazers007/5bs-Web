//---------------------------��ʼ������-------------------
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
//-----------------------------------------------------������ֲ���
var playerNumber = 6;//ȫ��������
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
//----------------------------------------------��ʼ���洢����
var animaList = new Array();//���������洢��ͬ�Ķ���Ч��  �������𷵻ض�����·�� ͼƬ����
for(var i=0;i<22;i++){//��ʼ��22������ ���������ݲ����
	animaList[i] = {};//��ʼ��'�ṹ��'
	animaList[i].frameList = new Array();//��ʼ����洢����
	animaList[i].ListNum = 0;//frame����
	animaList[i].sizeX = 0;//��СX
	animaList[i].sizeY = 0;//��СY
	animaList[i].delay = 0;//ÿ��֡��
}

var musicList = new Array();//��ʼ����Ч ���� ���ܣ���Ȼ���Ը���  ���� �ֿ������ڹ���
for(var i=0;i<22;i++){
	musicList[i] = {};
	musicList[i].src = "";
}
//-------------------��ʼ�����ܲ���
var Skills = new Array();
for(var i=0;i<10;i++){
	Skills[i] = {};
	Skills[i].animaNo = 0;
	Skills[i].sndSrc = "";
	Skills[i].type = "";
	//!!!!!!!!!!!!!!!
	Skills[i].active = {};//��������
	Skills[i].effect = {};//����Ч��
}
//-------------------��ʼ��ȫ���佫����
var Heros = new Array();
for(var i=0;i<10;i++){
	Heros[i] = {};
	Heros[i].imgSrc = "";
	Heros[i].name = "";
	Heros[i].country = "";
	Heros[i].gender = "";
	Heros[i].maxHP = "";
	Heros[i].skills = new Array();//������� ÿ����������˵��
}
//-------------------��ʼ��161���Ʋ���
var Cards = new Array();//������ ��Ϊֻ�ô洢����
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
//-------------��ʼ�����Ʋ���
var HandCards = {};
HandCards.sum = 0;//ȫ���Ĺ����ص�
HandCards.span = 0;
HandCards.sizeX = 93;
HandCards.sizeY = 130;
HandCards.holders = new Array();//ÿһ���Ķ����ص� Ӧ��д��һ���� ��һ�����в��� �����Ͳ������������� ��ɽṹ��
HandCards.states = new Array();
HandCards.posX = new Array();
HandCards.posY = new Array();
HandCards.snds = new Array();
HandCards.cards = new Array();
//--------------------------------------------ϵͳͼƬ
var selectedBorder;  //�߿�
var playingBorder;
var responsingBorder;
var sosBorder;

var startPhaseImg; //�׶�ͼƬ  �����ʼ�׶δ�ҽ���һ��
var roundStartPhaseImg;
var judgePhaseImg;
var drawPhaseImg;
var playPhaseImg;
var discardPhaseImg;
var finishPhaseImg;

//--------------------------------------------���Ҳ�����Ϣ��
var Myself = {};
Myself.maxTarget = 1;//ѡȡĿ�������
Myself.targets = new Array();//ѡȡ��Ŀ��
Myself.targetStates = new Array(playerNumber);
//-------------------------------------------
var userTable = new Array();//�û��б� Ӧ��������ʼ��
//---------------------------------------SOCKET IO-------------------------------
var socketio = io.connect("ws://127.0.0.1:9999");
//�������͵���Ӧ����
var my_ID;//�洢�ҵ��˺�
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
//������Ϣ����
function sendIO(type,data){
	socketio.emit(type,data);
}
//log ��¼����
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
//Ϊ�������¼�
$(document).ready(function(){//Start-----------------��ȫ����ȡ���ٿ�ʼ�ڲ��ĺ�����
	$("#sendBox").keypress(function(e){
		if(e.keyCode == 13){
		e.preventDefault();
		Console.log("��:"+$('#sendBox').val());
		socketio.emit('chat',$('#sendBox').val());
		$('#sendBox').val('');
	}
	});
});//End-----------------------