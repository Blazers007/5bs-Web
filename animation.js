///////////part 1
function moveCardMsg(to,from,card,layer,num){
	cardMoveAnimation(to,from,card,layer);
	Console.log("����:  "+to.x+"  "+to.y);
	pushMessage("moveCard",to,from,card);
}
function cardMoveAnimation(to,from,card){//�ƶ����Ƶķ���  �������� ������ȥ
	// ����ж������ڲ������ݲ�ɾ�� ֱ��ĳһ�ε���ʱ û�ж������� ��ɾ��
	var layer = new lime.Layer().setPosition(from.x,from.y);
	var snd = new lime.audio.Audio('audio/system/button-hover.ogg');// fangzaiquanju?
	if (card.back == "true"){//����������ʾ����
		var img = new lime.Sprite().setFill('image/system/card-back.png');
		layer.appendChild(img)
	}else{//�Լ�����ֱ����ʾ
		var fc = formCardLayer(card);
		layer.appendChild(fc.cardImg);
		layer.appendChild(fc.pointImg);
		layer.appendChild(fc.suitImg);
	}
	animationLayer.appendChild(layer);
	layer.runAction(new lime.animation.Spawn( // ͬʱ����
						new lime.animation.MoveTo(to.x,to.y),
						new lime.animation.FadeTo(.0).setDuration(2)
						)
				);
	snd.play();
}
/////////////////////////////////part2
function hitCardMsg(to,from,card){// ��Ҫ�ǳ��� �Լ��Ქ���Ƶ����� to һ����������г�
	Console.log("����:  "+card.name);
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
function playAnima(layer,where,No){ //��һ�����Լ����� ˳���㲥
	//layer.removeAllChildren();//test
	var overImg = "image/system/emotion/over.png";
	var sprite = new lime.Sprite().setSize(200,200).setPosition(where.x,where.y);
	var anima = new lime.animation.KeyframeAnimation().setDelay(1/20);//��Ҫ�������ȡ��?
	for(var i=0;i<animaList[No].ListNum;i++){
		anima.addFrame(new lime.fill.Image(animaList[No].frameList[i]));
	}
	anima.addFrame(new lime.fill.Image(overImg));
	anima.looping = false;
	layer.appendChild(sprite);
	sprite.runAction(anima);
}
function playAnimaTest(No){ //��һ�����Լ����� ˳���㲥
	var overImg = "image/system/emotion/over.png";
	var sprite = new lime.Sprite().setSize(200,200).setPosition(598,100);
	var anima = new lime.animation.KeyframeAnimation().setDelay(1/20);//��Ҫ�������ȡ��?
	for(var i=0;i<animaList[No].ListNum;i++){
		anima.addFrame(new lime.fill.Image(animaList[No].frameList[i]));
	}
	anima.addFrame(new lime.fill.Image(overImg));
	anima.looping = false;
	animationLayer.appendChild(sprite);
	sprite.runAction(anima);
}

function playAnimation(){ //�ڶ����ǽӵ����˵���ʾ������Ӧ��
}

function otherEquipAnimation(playerNum,card){
	var i = playerNum;
	var lable = new lime.Label().setText(returnCardChName(card)).setFontSize(18).setFontColor('#00').setFontFamily('����');
	switch(card.position){
		case "wuqi":
			playersInfo[i].weapon.removeAllChildren();//�Ƴ���
			playersInfo[i].weapon.appendChild(lable);
			break;
		case "fangju":
			playersInfo[i].defense.removeAllChildren();//�Ƴ���
			playersInfo[i].defense.appendChild(lable);
			break;
		case "jingongma":
			playersInfo[i].attHorse.removeAllChildren();//�Ƴ���
			playersInfo[i].attHorse.appendChild(lable);
			break;
		case "fangyuma":
			playersInfo[i].defHorse.removeAllChildren();//�Ƴ���
			playersInfo[i].defHorse.appendChild(lable);
			break;
	}
}