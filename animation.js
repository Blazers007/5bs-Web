///////////part 1
function moveCardMsg(to,from,card,layer,num){
	cardMoveAnimation(to,from,card,layer);
	Console.log("摸牌:  "+to.x+"  "+to.y);
	pushMessage("moveCard",to,from,card);
}
function cardMoveAnimation(to,from,card){//移动卡牌的方法  从哪里来 到哪里去
	// 如果有动画正在播放则暂不删除 直到某一次调用时 没有动画播放 就删除
	var layer = new lime.Layer().setPosition(from.x,from.y);
	var snd = new lime.audio.Audio('audio/system/button-hover.ogg');// fangzaiquanju?
	if (card.back == "true"){//他人摸牌显示背面
		var img = new lime.Sprite().setFill('image/system/card-back.png');
		layer.appendChild(img)
	}else{//自己摸牌直接显示
		var fc = formCardLayer(card);
		layer.appendChild(fc.cardImg);
		layer.appendChild(fc.pointImg);
		layer.appendChild(fc.suitImg);
	}
	animationLayer.appendChild(layer);
	layer.runAction(new lime.animation.Spawn( // 同时发生
						new lime.animation.MoveTo(to.x,to.y),
						new lime.animation.FadeTo(.0).setDuration(2)
						)
				);
	snd.play();
}
/////////////////////////////////part2
function hitCardMsg(to,from,card){// 主要是出牌 以及会播放牌的声音 to 一般情况下是中场
	Console.log("出牌:  "+card.name);
	//hitCardAnimation(to,from,card);
	pushMessage("hitCard",to,from,card);
}

function hitCardAnimation(to,from,card){
	var layer = new lime.Layer().setPosition(from.x,from.y);
	var fc = formCardLayer(card);
	layer.appendChild(fc.cardImg);
	layer.appendChild(fc.pointImg);
	layer.appendChild(fc.suitImg);
	var snd = (returnCardMusic('male',card) == 'no-music')?new lime.audio.Audio('audio/system/button-down.ogg'):new lime.audio.Audio(returnCardMusic('female',card));
	animationLayer.appendChild(layer);
	layer.runAction(new lime.animation.MoveTo(to.x,to.y));
	snd.play();
}
////////////////////part 3
function playAnima(layer,where,No){ //第一个是自己触发 顺带广播
	//layer.removeAllChildren();//test
	var overImg = "image/system/emotion/over.png";
	var sprite = new lime.Sprite().setSize(200,200).setPosition(where.x,where.y);
	var anima = new lime.animation.KeyframeAnimation().setDelay(1/20);//需要按需求读取吗?
	for(var i=0;i<animaList[No].ListNum;i++){
		anima.addFrame(new lime.fill.Image(animaList[No].frameList[i]));
	}
	anima.addFrame(new lime.fill.Image(overImg));
	anima.looping = false;
	layer.appendChild(sprite);
	sprite.runAction(anima);
}
function playAnimaTest(No){ //第一个是自己触发 顺带广播
	var overImg = "image/system/emotion/over.png";
	var sprite = new lime.Sprite().setSize(200,200).setPosition(598,100);
	var anima = new lime.animation.KeyframeAnimation().setDelay(1/20);//需要按需求读取吗?
	for(var i=0;i<animaList[No].ListNum;i++){
		anima.addFrame(new lime.fill.Image(animaList[No].frameList[i]));
	}
	anima.addFrame(new lime.fill.Image(overImg));
	anima.looping = false;
	animationLayer.appendChild(sprite);
	sprite.runAction(anima);
}

function playAnimation(){ //第二个是接到别人的提示进行响应？
}

function otherEquipAnimation(playerNum,card){
	var i = playerNum;
	var lable = new lime.Label().setText(returnCardChName(card)).setFontSize(18).setFontColor('#00').setFontFamily('隶书');
	switch(card.position){
		case "wuqi":
			playersInfo[i].weapon.removeAllChildren();//移除先
			playersInfo[i].weapon.appendChild(lable);
			break;
		case "fangju":
			playersInfo[i].defense.removeAllChildren();//移除先
			playersInfo[i].defense.appendChild(lable);
			break;
		case "jingongma":
			playersInfo[i].attHorse.removeAllChildren();//移除先
			playersInfo[i].attHorse.appendChild(lable);
			break;
		case "fangyuma":
			playersInfo[i].defHorse.removeAllChildren();//移除先
			playersInfo[i].defHorse.appendChild(lable);
			break;
	}
}