function formCardLayer(card){
	var layer = {};
	layer.cardImg = new lime.Sprite().setFill(returnCardImg(card));
	layer.suitImg = new lime.Sprite().setFill(returnCardSuit(card)).setPosition(-35,-38);
	layer.pointImg = new lime.Sprite().setFill(returnCardPoint(card)).setPosition(-35,-50);
	return layer;
}
function getCard(card){//接受一个Cards数组中的单独对象
	//1获取参数
	var top = HandCards.sum;
	HandCards.sum = HandCards.sum + 1;
	var newCard = new lime.Layer().setPosition(164+top*cardW+(cardW/2)+top*HandCards.span,gameH-(cardH/2));
	var pos = newCard.getPosition();
	//2存储
	HandCards.holders[top] = newCard;//意图在不是为数组中的指针绑定 而是为具体的对象绑定响应
	HandCards.cards[top] = card;
	HandCards.posX[top] = pos.x;
	HandCards.posY[top] = pos.y;
	HandCards.states[top] = "unclick";
	HandCards.snds[top] = (returnCardMusic('male',card) == 'no-music')?new lime.audio.Audio('audio/system/button-down.ogg'):new lime.audio.Audio(returnCardMusic('female',card));
	//3绘制动画
	//var cardImg = new lime.Sprite().setFill(returnCardImg(card));
	//var suitImg = new lime.Sprite().setFill(returnCardSuit(card)).setPosition(-35,-38);
	//var pointImg = new lime.Sprite().setFill(returnCardPoint(card)).setPosition(-35,-50);
	var fc = formCardLayer(card);
	HandCards.holders[top].appendChild(fc.cardImg);
	HandCards.holders[top].appendChild(fc.pointImg);
	HandCards.holders[top].appendChild(fc.suitImg);
	cardLayer.appendChild(HandCards.holders[top]);
	//4判断是否压缩
	if(HandCards.sum>10){
		var span = -((HandCards.sum-10)*cardW)/(HandCards.sum-1);
		changeSpan(span);
	}else{
		changeSpan(0);
	}
	//----------------------摸牌动画
	var to = {};
		var from = {};
		to.x = 98;
		to.y = 300;
		from.x = centerX;
		from.y = centerY;
		card.back = "true";
	pushMessage("moveCard",to,from,card);
	//--------------------------------
	//5设置监听
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
		setTimeout(function(){//处理打出后的动画效果
			if(HandCards.sum>10){
				var sspan = -((HandCards.sum-10)*cardW)/(HandCards.sum-1);
				changeSpan(sspan);
			}else{
				changeSpan(0);
			}
		},600);
		ncd.unbind();//解除事件响应
		//然后在结尾处  删除layer
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
	var mspan = span - HandCards.span;//需要变化的值
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
	to.x = centerX;// 此处的to 应该是指向性动画的目标  现在指定的值其实没有意义
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
	//不能再此处删除 因为还要返回回调函数进行继续处理
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
	心得:如果用 var pos = obj.getPosition() 方法，那么如果更改获得的 pos 的值 则会改变其的位置
	但是如果通过动画改变则 可能是因为开了多个线程去执行动画 故在结束时会造成双倍更改的效果
	然是如果只动画 而不去更改pos 值 则 pos值又不会随着动画改变的位置而改变...莫名其妙啊....
*/

/*function setListen(cardH,index){
	var cdh = $(cardH.getDeepestDomElement());
	HandCards.states[index] = "start";
	cdh.click(function(){//有很多问题
		//1 点击后 不再触发 enter  leave 响应
		//2 防止多次误响应事件
		//3 打出后手牌的移动动画
		//4 删除HandCards  sum-- 等等
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