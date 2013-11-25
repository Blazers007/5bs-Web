function formCardLayer(card){
	var layer = {};
	layer.cardImg = new lime.Sprite().setFill(returnCardImg(card));
	layer.suitImg = new lime.Sprite().setFill(returnCardSuit(card)).setPosition(-35,-38);
	layer.pointImg = new lime.Sprite().setFill(returnCardPoint(card)).setPosition(-35,-50);
	return layer;
}
function getCard(card){//����һ��Cards�����еĵ�������
	//1��ȡ����
	var top = HandCards.sum;
	HandCards.sum = HandCards.sum + 1;
	var newCard = new lime.Layer().setPosition(164+top*cardW+(cardW/2)+top*HandCards.span,gameH-(cardH/2));
	var pos = newCard.getPosition();
	//2�洢
	HandCards.holders[top] = newCard;//��ͼ�ڲ���Ϊ�����е�ָ��� ����Ϊ����Ķ������Ӧ
	HandCards.cards[top] = card;
	HandCards.posX[top] = pos.x;
	HandCards.posY[top] = pos.y;
	HandCards.states[top] = "unclick";
	HandCards.snds[top] = (returnCardMusic('male',card) == 'no-music')?new lime.audio.Audio('audio/system/button-down.ogg'):new lime.audio.Audio(returnCardMusic('female',card));
	//3���ƶ���
	//var cardImg = new lime.Sprite().setFill(returnCardImg(card));
	//var suitImg = new lime.Sprite().setFill(returnCardSuit(card)).setPosition(-35,-38);
	//var pointImg = new lime.Sprite().setFill(returnCardPoint(card)).setPosition(-35,-50);
	var fc = formCardLayer(card);
	HandCards.holders[top].appendChild(fc.cardImg);
	HandCards.holders[top].appendChild(fc.pointImg);
	HandCards.holders[top].appendChild(fc.suitImg);
	cardLayer.appendChild(HandCards.holders[top]);
	//4�ж��Ƿ�ѹ��
	if(HandCards.sum>10){
		var span = -((HandCards.sum-10)*cardW)/(HandCards.sum-1);
		changeSpan(span);
	}else{
		changeSpan(0);
	}
	//----------------------���ƶ���
	var to = {};
		var from = {};
		to.x = 98;
		to.y = 300;
		from.x = centerX;
		from.y = centerY;
		card.back = "true";
	pushMessage("moveCard",to,from,card);
	//--------------------------------
	//5���ü���
	var ncd = $(newCard.getDeepestDomElement());
	ncd.click(function(){
		var index = HandCards.holders.indexOf(newCard);
		HandCards.states[index] = "click";
		HandCards.snds[index].play();
		newCard.runAction(
			new lime.animation.Spawn(
				new lime.animation.MoveTo(centerX,centerY).setDuration(1),
				new lime.animation.ScaleTo(1).setDuration(.05)
			));
		Console.log("hit card: "+index);
		hitCard(newCard,index);
		setTimeout(function(){//��������Ķ���Ч��
			if(HandCards.sum>10){
				var sspan = -((HandCards.sum-10)*cardW)/(HandCards.sum-1);
				changeSpan(sspan);
			}else{
				changeSpan(0);
			}
		},600);
		ncd.unbind();//����¼���Ӧ
		//Ȼ���ڽ�β��  ɾ��layer
	});
	ncd.mouseenter(function(){
		var index = HandCards.holders.indexOf(newCard);
		var x = HandCards.posX[index];
		var y = HandCards.posY[index];
		if(HandCards.states[index] == "unclick"){
			Console.log("up: "+index);
			newCard.runAction(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(x,y-30).setDuration(.3),
					new lime.animation.ScaleTo(1.6).setDuration(.2)
				));
		}
	});
	ncd.mouseleave(function(){
		var index = HandCards.holders.indexOf(newCard);
		var x = HandCards.posX[index];
		var y = HandCards.posY[index];
		if(HandCards.states[index] == "unclick"){
			Console.log("down: "+index);
			newCard.runAction(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(x,y).setDuration(.3),
					new lime.animation.ScaleTo(1).setDuration(.1)
				));
		}
	});
}

function changeSpan(span){
	var top = HandCards.sum;
	var mspan = span - HandCards.span;//��Ҫ�仯��ֵ
	HandCards.span = span;
	for(var i=1;i<top;i++){
		//Console.log("span: "+i);
		HandCards.holders[i].runAction(new lime.animation.MoveBy(i*mspan,0).setDuration(.3));
		HandCards.posX[i] = HandCards.posX[i] + (i*mspan);
	}
}

function hitCard(cardH,index){
	var sum = HandCards.sum;
	var span = HandCards.span;
	var card = HandCards.cards[index];
	HandCards.sum = HandCards.sum - 1;
	for(var i=index+1;i<sum;i++){
		//Console.log("move: "+i);
		HandCards.holders[i].runAction(new lime.animation.MoveBy(0-cardW-span,0).setDuration(.1));
		HandCards.posX[i] = HandCards.posX[i] + (0-cardW-span);
	}
	if(card.type == 'zhuangbei'){
		getEquip(card);
	}
	///////////////////
	var to = {};
	var from = {};
	to.x = centerX;// �˴���to Ӧ����ָ���Զ�����Ŀ��  ����ָ����ֵ��ʵû������
	to.y = centerY;
	from.x = 598;
	from.y = 100;
	pushMessage("hitCard",to,from,card);
	/////////////////////
	HandCards.snds.splice(index,1);
	HandCards.holders.splice(index,1);
	HandCards.states.splice(index,1);
	HandCards.posX.splice(index,1);
	HandCards.posY.splice(index,1);
	HandCards.cards.splice(index,1);
	//�����ٴ˴�ɾ�� ��Ϊ��Ҫ���ػص��������м�������
}

function getEquip(card){
	var src = returnEquip(card).src;
	var layer = returnEquip(card).layer;
	var newEquip = new lime.Sprite().setFill(src);
	//
	var to ={};
	var from ={};
	pushMessage('equiped',to,from,card);
	layer.appendChild(newEquip);
}
/*
	�ĵ�:����� var pos = obj.getPosition() ��������ô������Ļ�õ� pos ��ֵ ���ı����λ��
	�������ͨ�������ı��� ��������Ϊ���˶���߳�ȥִ�ж��� ���ڽ���ʱ�����˫�����ĵ�Ч��
	Ȼ�����ֻ���� ����ȥ����pos ֵ �� posֵ�ֲ������Ŷ����ı��λ�ö��ı�...Ī�����....
*/

/*function setListen(cardH,index){
	var cdh = $(cardH.getDeepestDomElement());
	HandCards.states[index] = "start";
	cdh.click(function(){//�кܶ�����
		//1 ����� ���ٴ��� enter  leave ��Ӧ
		//2 ��ֹ�������Ӧ�¼�
		//3 ��������Ƶ��ƶ�����
		//4 ɾ��HandCards  sum-- �ȵ�
		if(HandCards.states[index] == "up"){
			var snd = new lime.audio.Audio('audio/system/button-hover.ogg');
			snd.play();
			cardH.runAction(new lime.animation.MoveTo(centerX,centerY));
			hitCard(cardH,index);
			Console.log(index+':hit card');
			//HandCards.states[index] = "over";
		}
	});
	ncd.mouseenter(function(){
		if(HandCards.states[top] == "start"){
			HandCards.states[top] = "moving";
			HandCards.holders[top].runAction(new lime.animation.MoveBy(0,-30).setDuration(.3));
			setTimeout(function(){
				HandCards.states[top] = "up";
			}, 300);
			Console.log(top+':up');
		}
	});
	ncd.mouseleave(function(){
		if(HandCards.states[top] == "up"){
			HandCards.states[top] = "moving";
			HandCards.holders[top].runAction(new lime.animation.MoveBy(0,30).setDuration(.3));
			setTimeout(function(){
				HandCards.states[top] = "start";
			},300);
			Console.log(top+':down');
		}
	});
}
*/