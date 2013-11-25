//set main namespace
goog.provide('basic');


//get requirements
goog.require('lime.Director');
goog.require('lime.Button');
goog.require('lime.GlossyButton');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.MoveBy');
goog.require('lime.audio.Audio');
goog.require('lime.Sprite');
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.animation.Sequence');

var gameW = 1440;
var gameH = 900;
var cardW = 93;
var cardH = 130;
var centerX = (gameW/2)-200;
var centerY = gameH/2;
// 00 entrypoint
var cardLayer;
var animationLayer;
var equipLayer;
var equipWeapon;
var equipDefense;
var equipAttHorse;
var equipDefHorse;
var playersHolder = new Array();//���ͼ��------���ز�---157X181
var playersPhoto = new Array();//ͷ��----�ײ�
var playersBG = new Array();   //����----�ײ�+1
var playersInfo = new Array();
for(var i=0;i<8;i++)
	 playersInfo[i] = {};
var phbts = new Array();       //������ȡ holders ʵ�ֵ����Ӧ
var eventLayer;//��Ҫ����ȫ�ֵĿ���
var overJStest = "test";

var myPhaseHolder;
//test
var hnames = new Array('��\n��\n��','��\n��','��\n��\n��','��\n��','��\n��\n��');
var pnames = new Array('�մ�Ů��','����²���','��������Ա','��������','���л���');

basic.start = function(){
	//alert("basic");
	//01 define what are going to load 
	var director = new lime.Director(document.getElementById("gameroom"),gameW,gameH),//Ӧ�����ܵ��ݣ�
	    scene = new lime.Scene();//����һ������
	//A �ײ��������� 
	//scene.setScale(1.1);
	//��ȡͼƬ
	startPhaseImg = new lime.Sprite().setFill('image/system/phase/start.png').setScale(.6);
	roundStartPhaseImg = new lime.Sprite().setFill('image/system/phase/round_start.png').setScale(.6);
	judgePhaseImg = new lime.Sprite().setFill('image/system/phase/judge.png').setScale(.6);
	drawPhaseImg = new lime.Sprite().setFill('image/system/phase/draw.png').setScale(.6);
	playPhaseImg = new lime.Sprite().setFill('image/system/phase/play.png').setScale(.6);
	discardPhaseImg = new lime.Sprite().setFill('image/system/phase/discard.png').setScale(.6);
	finishPhaseImg = new lime.Sprite().setFill('image/system/phase/finish.png').setScale(.6);
	//
	var tableLayer = new lime.Layer().setPosition(gameW/2,gameH/2);
	var tableBG = new lime.Sprite().setFill('image/system/myback.jpg');
	tableLayer.appendChild(tableBG);
	//B �Լ���װ������
	equipLayer = new lime.Layer().setPosition(82,gameH-85);
	var equipBG = new lime.Sprite().setFill('image/system/dashboard-equip.png');
	equipWeapon = new lime.Layer().setPosition(-3,-27);
	equipDefense = new lime.Layer().setPosition(-3,3);
	equipAttHorse = new lime.Layer().setPosition(-3,33);
	equipDefHorse = new lime.Layer().setPosition(-3,63);
	equipLayer.appendChild(equipBG);
	equipLayer.appendChild(equipWeapon);
	equipLayer.appendChild(equipDefense);
	equipLayer.appendChild(equipAttHorse);
	equipLayer.appendChild(equipDefHorse);
	//C ��������
	cardLayer = new lime.Layer();//��ҪǶ�׵ľͲ���Ҫ������??
	var cardBG = new lime.Sprite().setFill('image/system/dashboard-hand.png').setPosition(164+512,gameH-85);
	cardLayer.appendChild(cardBG);
	//C1 ---------------------------------------��������
	var controlLayer = new lime.Layer().setPosition(1150,gameH-86);
	var controlBG = new lime.Sprite().setFill('image/system/button/platter/bg.png');
	var controlConfirm = new lime.Sprite().setFill('image/system/button/platter/confirm/normal.png').setPosition(-18,-42);
	var controlCancel = new lime.Sprite().setFill('image/system/button/platter/cancel/normal.png').setPosition(-18,42);
	var controlDiscard = new lime.Sprite().setFill('image/system/button/platter/discard/normal.png').setPosition(33,0);
	var controlRole = new lime.Sprite().setFill('image/system/roles/lord-1.png').setPosition(33,-67);
	myPhaseHolder = new lime.Layer().setPosition(-120,-95);
	controlLayer.appendChild(controlBG);
	controlLayer.appendChild(controlConfirm);
	controlLayer.appendChild(controlCancel);
	controlLayer.appendChild(controlDiscard);
	controlLayer.appendChild(controlRole);
	controlLayer.appendChild(myPhaseHolder);
	//----
	var confirmBtn = $(controlConfirm.getDeepestDomElement());
	confirmBtn.mouseenter(function(){
		controlConfirm.setFill('image/system/button/platter/confirm/hover.png');
	});
	confirmBtn.mouseleave(function(){
		controlConfirm.setFill('image/system/button/platter/confirm/normal.png');
	});
	confirmBtn.click(function(){
		controlConfirm.setFill('image/system/button/platter/confirm/down.png');
		setTimeout(function(){
			controlConfirm.setFill('image/system/button/platter/confirm/hover.png');
		},100);
		Console.log('confirm----clicked');//�˴�����������ڵ����� mouseleave
	});
	var cancelBtn = $(controlCancel.getDeepestDomElement());
	cancelBtn.mouseenter(function(){
		controlCancel.setFill('image/system/button/platter/cancel/hover.png');//��Щ��Ҫֱ�Ӷ����ڴ� �ڳ�ʼ���׶Σ���
	});
	cancelBtn.mouseleave(function(){
		controlCancel.setFill('image/system/button/platter/cancel/normal.png');
	});
	cancelBtn.click(function(){
		controlCancel.setFill('image/system/button/platter/cancel/down.png');
		setTimeout(function(){
			controlCancel.setFill('image/system/button/platter/cancel/hover.png');
		},100);
		Console.log('cancel----clicked');
	});
	var discardBtn = $(controlDiscard.getDeepestDomElement());
	discardBtn.mouseenter(function(){
		controlDiscard.setFill('image/system/button/platter/discard/hover.png');
	});
	discardBtn.mouseleave(function(){
		controlDiscard.setFill('image/system/button/platter/discard/normal.png');
	});
	discardBtn.click(function(){
		controlDiscard.setFill('image/system/button/platter/discard/down.png');
		setTimeout(function(){
			controlDiscard.setFill('image/system/button/platter/discard/hover.png');
		},100);
		Console.log('discard----clicked');
	});
	//------------------����
	//C2 --------------------------------------�Լ���ɫ����
	var avatarLayer = new lime.Layer().setPosition(1288,gameH-85);
	var avatarHead = new lime.Sprite().setFill('image/test00.jpg').setScale(.5);
	var avatarBG = new lime.Sprite().setFill('image/system/dashboard-avatar.png');
	var avatarName = new lime.Label().setText('0/10/0����').setFontSize(18).setFontColor('#FFFFFF').setFontFamily('����').setPosition(0,-65).setShadow('#000',2,1,1);
	var avatarSkills = new lime.Layer().setPosition(0,72);
	var s1 = new lime.Layer().setPosition(-40,0);
	var s1BG = new lime.Sprite().setFill('image/system/button/skill/awaken/2-normal.png');
	var s1LB = new lime.Label().setText('�մ�').setFontSize(16).setFontColor('#FFFFFF').setFontFamily('����').setPosition(5,0).setShadow('#000',2,1,1);
	s1.appendChild(s1BG);
	s1.appendChild(s1LB);
	avatarSkills.appendChild(s1);
	var s2 = new lime.Layer().setPosition(22,0);
	var s2BG = new lime.Sprite().setFill('image/system/button/skill/frequent/2-normal.png');
	var s2LB = new lime.Label().setText('Q��').setFontSize(16).setFontColor('#FFFFFF').setFontFamily('����').setPosition(5,0).setShadow('#000',2,1,1);
	s2.appendChild(s2BG);
	s2.appendChild(s2LB);
	avatarSkills.appendChild(s2);
	avatarLayer.appendChild(avatarHead);
	avatarLayer.appendChild(avatarBG);
	avatarLayer.appendChild(avatarName);
	avatarLayer.appendChild(avatarSkills);
	//D ---------------------------------------�������  �Լ����������Ϣչʾ����
	//��ȡ���
	var playersLayer = new lime.Layer();//-------------------------------------��ҽ���ͼ��
	playersHolder = new Array();//���ͼ��------���ز�---157X181
	playersPhoto = new Array();//ͷ��----�ײ�
	playersBG = new Array();   //����----�ײ�+1
	for(var i=0;i<5;i++){
		playersInfo[i].weapon = new lime.Layer().setPosition(0,38);
		playersInfo[i].defense = new lime.Layer().setPosition(0,52);
		playersInfo[i].attHorse = new lime.Layer().setPosition(0,67);
		playersInfo[i].defHorse = new lime.Layer().setPosition(0,81);
		playersInfo[i].hp = new lime.Layer().setPosition(42,16);
		playersInfo[i].name = new lime.Layer().setPosition(0,-80);
		playersInfo[i].hero = new lime.Layer().setPosition(-60,-20);
		playersInfo[i].country = new lime.Layer().setPosition(-66,-75);
		playersInfo[i].role = new lime.Layer().setPosition(60,-75);
		playersInfo[i].border = new lime.Layer();
		playersInfo[i].phase = new lime.Layer().setPosition(15,95);
		var t1 = new lime.Label().setText('����').setFontSize(18).setFontColor('#00').setFontFamily('����');
		var t2 = new lime.Label().setText('����').setFontSize(18).setFontColor('#00').setFontFamily('����');
		var t3 = new lime.Label().setText('������').setFontSize(18).setFontColor('#00').setFontFamily('����');
		var t4 = new lime.Label().setText('������').setFontSize(18).setFontColor('#00').setFontFamily('����');
		var t5 = new lime.Sprite().setFill('image/system/magatamas/5.png');
		var t6 = new lime.Label().setText(pnames[i]).setFontSize(18).setFontColor('#FFFFFF').setFontFamily('����').setShadow('#000',2,1,1);
		var t7 = new lime.Sprite().setFill('image/kingdom/frame/wei.png');
		var t7name = new lime.Label().setText(hnames[i]).setFontSize(20).setFontColor('#FFFFFF').setFontFamily('����').setMultiline(true).setPosition(-5,-10).setShadow('#000',2,1,1);
		var t8 = new lime.Sprite().setFill('image/kingdom/icon/wei.png');
		var t9 = new lime.Sprite().setFill('image/system/roles/lord-1.png');
		//var t11 = discardPhaseImg;
		playersInfo[i].weapon.appendChild(t1);
		playersInfo[i].defense.appendChild(t2);
		playersInfo[i].attHorse.appendChild(t3);
		playersInfo[i].defHorse.appendChild(t4);
		playersInfo[i].hp.appendChild(t5);
		playersInfo[i].name.appendChild(t6);
		playersInfo[i].hero.appendChild(t7);
		playersInfo[i].hero.appendChild(t7name);
		playersInfo[i].country.appendChild(t8);
		playersInfo[i].role.appendChild(t9);
		playersInfo[i].phase.appendChild(roundStartPhaseImg);
	}
	phbts = new Array();       //������ȡ holders ʵ�ֵ����Ӧ
	//ͷ��
	//var pRoot = "image/generals/avatar/";
	//var playersPhotoList = new Array(pRoot+'bgm_diaochan.png',pRoot+'caozhi.png',
	//	pRoot+'shenzhaoyun.png',pRoot+'sp_caiwenji.png',pRoot+'wangyi.png');
	var pRoot = "image/";
	var playersPhotoList = new Array(pRoot+'test0.jpg',pRoot+'test1.jpg',
		pRoot+'test2.jpg',pRoot+'test3.jpg',pRoot+'test4.jpg');
	var mask = new lime.Sprite().setSize(157,181);//�����涨ͷ��Ĵ�С
	for(var i=0;i<5;i++){
		//playersPhotoList[i] = pRoot+playersPhoto[player[i].heroNumber]];//���б��д洢���佫���ֱ�Ӹ�ֵ
		playersPhoto[i] = new lime.Sprite().setFill(playersPhotoList[i]).setScale(.7);
		playersPhoto[i].setMask(mask);
		playersBG[i] = new lime.Sprite().setFill('image/system/photo-back.png');
		playersHolder[i] = new lime.Layer().setPosition(playerList[i].posX,playerList[i].posY).setSize(157,181);
		playersHolder[i].appendChild(playersPhoto[i]);//------------yaru touxiang
		playersHolder[i].appendChild(playersBG[i]);// --------------gaishangkuang
		//װ�� Ѫ�� ���� �ȵ�
		playersHolder[i].appendChild(playersInfo[i].weapon);
		playersHolder[i].appendChild(playersInfo[i].defense);
		playersHolder[i].appendChild(playersInfo[i].defHorse);
		playersHolder[i].appendChild(playersInfo[i].attHorse);
		playersHolder[i].appendChild(playersInfo[i].hp);
		playersHolder[i].appendChild(playersInfo[i].name);
		playersHolder[i].appendChild(playersInfo[i].hero);
		playersHolder[i].appendChild(playersInfo[i].country);
		playersHolder[i].appendChild(playersInfo[i].role);
		playersHolder[i].appendChild(playersInfo[i].border);
		playersHolder[i].appendChild(playersInfo[i].phase);
		//
		playersHolder[i].setScale(1.1);
		playersLayer.appendChild(playersHolder[i]);//��С��ѹ����Ҳ�
		phbts[i] = $(playersHolder[i].getDeepestDomElement());
	}        // ------------------------ ѹ��ÿ���ı���ͼ
	//test jianting
	//----------------------------------���ñ߿�
	selectedBorder = new lime.Sprite().setFill("image/system/frame/photoSelected.png");
	playingBorder = new lime.Sprite().setFill("image/system/frame/playing.png");
	responsingBorder = new lime.Sprite().setFill("image/system/frame/responsing.png");
	sosBorder = new lime.Sprite().setFill("image/system/frame/sos.png");
		phbts[0].click(function(){
			if(playersBG[0].getStroke()){
				Console.log("ȡ��ѡ��:  0");
				playersBG[0].setStroke(null);
				playersInfo[0].border.removeAllChildren();
			}else{
				playersBG[0].setStroke(0.5,255,255,255);
				playersInfo[0].border.appendChild(selectedBorder);//������������new ����һ���µ� ��Ȼֻ��ѡ��һ��������
				Console.log("ѡ��:  0");
			}
		});
		phbts[1].click(function(){
			if(playersBG[1].getStroke()){
				Console.log("ȡ��ѡ��:  1");
				playersBG[1].setStroke(null);
				playersInfo[1].border.removeAllChildren();
			}else{
				playersBG[1].setStroke(0.5,255,48,48);
				playersInfo[1].border.appendChild(selectedBorder);
				Console.log("ѡ��:  1");
			}
		});
		phbts[2].click(function(){
			if(playersBG[2].getStroke()){
				Console.log("ȡ��ѡ��:  2");
				playersBG[2].setStroke(null);
				playersInfo[2].border.removeAllChildren();
			}else{
				playersBG[2].setStroke(0.5,255,48,48);
				playersInfo[2].border.appendChild(selectedBorder);
				Console.log("ѡ��:  2");
			}
		});
		phbts[3].click(function(){
			if(playersBG[3].getStroke()){
				Console.log("ȡ��ѡ��:  3");
				playersBG[3].setStroke(null);
				playersInfo[3].border.removeAllChildren();
			}else{
				playersBG[3].setStroke(0.5,255,48,48);
				playersInfo[3].border.appendChild(selectedBorder);
				Console.log("ѡ��:  3");
			}
		});
		phbts[4].click(function(){
			if(playersBG[4].getStroke()){
				Console.log("ȡ��ѡ��:  4");
				playersBG[4].setStroke(null);
				playersInfo[4].border.removeAllChildren();
			}else{
				playersBG[4].setStroke(0.5,255,48,48);
				playersInfo[4].border.appendChild(selectedBorder);
				Console.log("ѡ��:  4");
			}
		});
	scene.appendChild(tableLayer);  //------------------------------- ѹ�������
	scene.appendChild(equipLayer);  //------------------------------- ѹ��װ����
	scene.appendChild(playersLayer);//------------------------------- ѹ����Ҳ�
	scene.appendChild(cardLayer); //--------------------------------- ѹ�����Ʋ�
	scene.appendChild(controlLayer);//------------------------------- ѹ����Ʋ�
	scene.appendChild(avatarLayer);//-------------------------------- ѹ�������Ϣ��
	//------------------------------------------------------------���涯����  Ӧ����ȫ�ֱ��� ���ڷ��ʣ���
	animationLayer = new lime.Layer();
	scene.appendChild(animationLayer);
	//---------------------------------------------------------------ѯ���¼���
	eventLayer = new lime.Layer().setPosition(centerX,centerY);//----------------------------��  �����и����Ӳ� �Ƿ�� ��ʾ��
	var eventImg = new lime.Sprite().setFill('image/system/tip.png').setSize(360,180);
	var yesButton = new lime.GlossyButton('Yes').setSize(60, 25).setRenderer(lime.Renderer.CANVAS).setPosition(-100,50);
	var noButton = new lime.GlossyButton('No').setSize(60, 25).setRenderer(lime.Renderer.CANVAS).setPosition(100,50);
	var textLable = new lime.Label().setText('�������һ��').setFontSize(24).setFontColor('#FFFFFF').setPosition(0,-40).setFontFamily('����');
	eventLayer.appendChild(eventImg);
	eventLayer.appendChild(textLable);
	eventLayer.appendChild(yesButton);
	eventLayer.appendChild(noButton);
	scene.appendChild(eventLayer);
	// ��jQuery���а�
	var ybt = $(yesButton.getDeepestDomElement());
	ybt.click(function(){
		//Ӧ����ǰ��ȡ��� �������BUG����
		var snd = new lime.audio.Audio('audio/system/button-down.ogg');
		snd.play();
		Console.log('����');
	});
	var nbt = $(noButton.getDeepestDomElement());
	nbt.click(function(){
		var snd = new lime.audio.Audio('audio/system/button-hover.ogg');
		snd.play();
		Console.log('������');
	});
	eventLayer.setHidden(true);//��������
	/////////////////////
	director.makeMobileWebAppCapable();
	//////////////////////////////////
	//04 set listen
	///////////////////////////////
	// set current scene active
	director.replaceScene(scene);
}
//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('basic.start', hellohorld.start);