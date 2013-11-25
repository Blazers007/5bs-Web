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
var eventLayer;//需要进行全局的控制
var overJStest = "test";


basic.start = function(){
	//alert("basic");
	//01 define what are going to load 
	var director = new lime.Director(document.getElementById("gameroom"),gameW,gameH),//应该是总导演？
	    scene = new lime.Scene();//创建一个场景
	//A table region 
	var tableLayer = new lime.Layer().setPosition(gameW/2,gameH/2);
	var tableBG = new lime.Sprite().setFill('image/system/myback.jpg');
	tableLayer.appendChild(tableBG);
	//B equip region
	var equipLayer = new lime.Layer().setPosition(82,gameH-85);
	var equipBG = new lime.Sprite().setFill('image/system/dashboard-equip.png');
	equipLayer.appendChild(equipBG);
	//C card region
	cardLayer = new lime.Layer();//还要嵌套的就不需要坐标了??
	var cardBG = new lime.Sprite().setFill('image/system/dashboard-hand.png').setPosition(164+373,gameH-85);
	cardLayer.appendChild(cardBG);
	//Is the below load image already??  get card parameter
	var cardSample = new lime.Sprite().setFill('image/card/sha.jpg');
	var cardSize = cardSample.getSize();
	cardW = cardSize.width;
	cardH = cardSize.height;
	//
	var cdhs = new Array();
	var cds = new Array();
	cdhs[0] = new lime.Layer().setPosition(164+0*cardW+(cardW/2),gameH-(cardH/2));
	cdhs[1] = new lime.Layer().setPosition(164+1*cardW+(cardW/2),gameH-(cardH/2)),
	cdhs[2] = new lime.Layer().setPosition(164+2*cardW+(cardW/2),gameH-(cardH/2)),
	cdhs[3] = new lime.Layer().setPosition(164+3*cardW+(cardW/2),gameH-(cardH/2)),
	cdhs[4] = new lime.Layer().setPosition(164+4*cardW+(cardW/2),gameH-(cardH/2));
	//alert(returnCardImg('12312'));
	cds[0] = new lime.Sprite().setFill(returnCardImg(Cards[125]));
	cds[1] = new lime.Sprite().setFill(returnCardImg("tiesuolianhuan"));
	cds[2] = new lime.Sprite().setFill(returnCardImg("tao"));
	cds[3] = new lime.Sprite().setFill(returnCardImg("wuxiekeji"));
	cds[4] = new lime.Sprite().setFill(returnCardImg("nanmanruqin"));
	//alert("image defined");
	//02 load music
	var cardSounds = new Array();
	//alert(returnCardMusic('sha','sha'));
	cardSounds[0] = new lime.audio.Audio(returnCardMusic('female',Cards[125]));
	cardSounds[1] = new lime.audio.Audio(returnCardMusic('sha','wuxiekeji'));
	cardSounds[2] = new lime.audio.Audio(returnCardMusic('female','taoyuanjieyi'));
	cardSounds[3] = new lime.audio.Audio(returnCardMusic('sha','wuzhongshengyou'));
	cardSounds[4] = new lime.audio.Audio(returnCardMusic('female','nanmanruqin'));
	//other players
	//alert("music defined");
	var playersLayer = new lime.Layer();//-------------------------------------玩家界面图层
	var playersPhoto = new Array();//玩家头像存数路径数组
	var pRoot = "image/generals/avatar/";
	var playersPhotoList = new Array(pRoot+'bgm_diaochan.png',pRoot+'caozhi.png',
		pRoot+'shenzhaoyun.png',pRoot+'sp_caiwenji.png',pRoot+'wangyi.png');
	var playersBG = new Array();//每个玩家的框体
	var playersHolder = new Array();//--------------------用来承载每个玩家的小图层   157X181
	var mask = new lime.Sprite().setSize(157,181);//用来规定头像的大小
	for(var i=0;i<5;i++){
		//playersPhotoList[i] = pRoot+playersPhoto[player[i].heroNumber]];//用列表中存储的武将编号直接赋值
		playersPhoto[i] = new lime.Sprite().setFill(playersPhotoList[i]);
		playersBG[i] = new lime.Sprite().setFill('image/system/photo-back.png');
		playersHolder[i] = new lime.Layer().setPosition(playerList[i].posX,playerList[i].posY).setSize(157,181);
		playersHolder[i].appendChild(playersPhoto[i]);//------------yaru touxiang
		playersHolder[i].appendChild(playersBG[i]);// --------------gaishangkuang
		playersPhoto[i].setMask(mask);
		//装备 血量 国家 等等
		playersLayer.appendChild(playersHolder[i]);//将小层压入玩家层
	}        // ------------------------ 压入每个的背景图
	scene.appendChild(tableLayer);  //------------------------------- 压入桌面层
	scene.appendChild(equipLayer);  //------------------------------- 压入装备层
	scene.appendChild(playersLayer);//------------------------------- 压入玩家层
	for(var i=0;i<5;i++){			//
		cdhs[i].appendChild(cds[i]);//
		cardLayer.appendChild(cdhs[i]);
	}
	scene.appendChild(cardLayer); //--------------------------------- 压入手牌层
	//------------------------------------------------------------场面动画层  应该是全局变量 便于访问！！
	animationLayer = new lime.Layer();
	scene.appendChild(animationLayer);
	//---------------------------------------------------------------询问事件层
	eventLayer = new lime.Layer().setPosition(centerX,centerY);//----------------------------层  下面有各种子层 是否的 提示的
	var eventImg = new lime.Sprite().setFill('image/system/tip.png').setSize(360,180);
	var yesButton = new lime.GlossyButton('Yes').setSize(60, 25).setRenderer(lime.Renderer.CANVAS).setPosition(-100,50);
	var noButton = new lime.GlossyButton('No').setSize(60, 25).setRenderer(lime.Renderer.CANVAS).setPosition(100,50);
	var textLable = new lime.Label().setText('请求你出一张').setFontSize(20).setFontColor('#00').setPosition(0,-40).setFontFamily('微软雅黑');
	eventLayer.appendChild(eventImg);
	eventLayer.appendChild(textLable);
	eventLayer.appendChild(yesButton);
	eventLayer.appendChild(noButton);
	scene.appendChild(eventLayer);
	// 用jQuery进行绑定
	var ybt = $(yesButton.getDeepestDomElement());
	ybt.click(function(){
		var snd = new lime.audio.Audio('audio/system/button-hover.ogg');
		snd.play();
		Console.log('发动');
	});
	var nbt = $(noButton.getDeepestDomElement());
	nbt.click(function(){
		var snd = new lime.audio.Audio('audio/system/button-hover.ogg');
		snd.play();
		Console.log('不发动');
	});
	/////////////////////
	director.makeMobileWebAppCapable();
	//////////////////////////////////
	//04 set listen
	goog.events.listen(cdhs[0],['click'],function(e){//点击应该吧图层移到最上部
        //animate
		var size = cardLayer.getNumberOfChildren();// 获取同级别子对象数量
		cardLayer.setChildIndex(cdhs[0],size); //将自己的位置移到最高 以便覆盖
        cdhs[0].runAction(new lime.animation.MoveTo(centerX,centerY));
		cardSounds[0].play();
		//$.change("20101517121");//通过其动态改变！
		var to = {};
		var from = {};
		var card = {};
		to.x = 98;
		to.y = 300;
		from.x = centerX;
		from.y = centerY;
		card.back = "true";
		//alert("begin");
		moveCard(to,from,card,animationLayer,5);
		//alert("over");
    });
	goog.events.listen(cdhs[1],['click'],function(e){//点击应该吧图层移到最上部
        //animate
		var size = cardLayer.getNumberOfChildren();
		cardLayer.setChildIndex(cdhs[1],size);
        cdhs[1].runAction(new lime.animation.MoveTo(centerX,centerY));
		cardSounds[1].play();
		//$.change("20101517101");//通过其动态改变！！

		var to = {};
		var from = {};
		var card = {};
		to.x = 848;
		to.y = 300;
		from.x = centerX;
		from.y = centerY;
		card.back = "true";
		//alert("begin");
		moveCard(to,from,card,animationLayer,5);
		//alert("over");
    });
	goog.events.listen(cdhs[2],['click'],function(e){//点击应该吧图层移到最上部
        //animate
		var size = cardLayer.getNumberOfChildren();
		cardLayer.setChildIndex(cdhs[2],size);
        cdhs[2].runAction(new lime.animation.MoveTo(centerX,centerY));
		cardSounds[2].play();
		//$.change("20101517102");//通过其动态改变！！

		///test hit card
		var to = {};
		var from = {};
		var card = {};
		to.x = centerX;// 此处的to 应该是指向性动画的目标  现在指定的值其实没有意义
		to.y = centerY;
		from.x = 598;
		from.y = 100;
		card.name = "无中生有";
		card.img = "image/card/ex_nihilo.jpg"; //可以设几个全局变量来进行 路径的存储
		card.snd = "audio/card/female/ex_nihilo.ogg";
		hitCard(to,from,card,animationLayer,1);
    });
	goog.events.listen(cdhs[3],['click'],function(e){//点击应该吧图层移到最上部
        //animate
		var size = cardLayer.getNumberOfChildren();
		cardLayer.setChildIndex(cdhs[3],size);
        cdhs[3].runAction(new lime.animation.MoveTo(centerX,centerY));
		cardSounds[3].play();
		//清除动画层测试用
		animationLayer.removeAllChildren();
    });
	goog.events.listen(cdhs[4],['click'],function(e){//点击应该吧图层移到最上部
        //animate
		var size = cardLayer.getNumberOfChildren();
		cardLayer.setChildIndex(cdhs[4],size);
        cdhs[4].runAction(new lime.animation.MoveTo(centerX,centerY));
		cardSounds[4].play();

		var where = {};
		where.x = 598;
		where.y = 100;
		playAnima(animationLayer,where,21);
    });
	///////////////////////////////
	// set current scene active
	director.replaceScene(scene);
}
//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('basic.start', hellohorld.start);
