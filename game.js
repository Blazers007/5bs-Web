function roundStartPhase(player){
	var i = player;
	Console.log("round start");
	if(i != myPlayerNumber){
		roundStartPhaseImg.setScale(.6);
		playersInfo[i].phase.removeAllChildren();
		playersInfo[i].phase.appendChild(roundStartPhaseImg);
	}else{
		roundStartPhaseImg.setScale(1);
		myPhaseHolder.removeAllChildren();
		myPhaseHolder.appendChild(roundStartPhaseImg);
	}
}
function judgePhase(player){
	var i = player;
	//if player == self 1 draw phase! 先写到一块去

	//if player has judege card   OR   event 
	//else
	// return
	//1 改变阶段的图片
	if(i != myPlayerNumber){
		judgePhaseImg.setScale(.6);
		playersInfo[i].phase.removeAllChildren();
		playersInfo[i].phase.appendChild(judgePhaseImg);
	}else{
		judgePhaseImg.setScale(1);
		myPhaseHolder.removeAllChildren();
		myPhaseHolder.appendChild(judgePhaseImg);
	} //这个是同一时间只有一个 所以可以
	//judge event 
}
function drawPhase(player){
	var i = player;
	//if == self
	//self append drawCardPhase;
	//getCardFunction()//getCard form Stack
	//else
	if(i != myPlayerNumber){
		drawPhaseImg.setScale(.6);
		playersInfo[i].phase.removeAllChildren();
		playersInfo[i].phase.appendChild(drawPhaseImg);
	}else{
		cardMoveAnimation(toMyPos,fromCardPos,Cards[70]);
		setTimeout(function(){
			cardMoveAnimation(toMyPos,fromCardPos,Cards[99]);
			getCard(Cards[70]);
		},600);
		setTimeout(function(){
			getCard(Cards[99]);
		},1200);//封装成一个函数！！！
		drawPhaseImg.setScale(1);
		myPhaseHolder.removeAllChildren();
		myPhaseHolder.appendChild(drawPhaseImg);
	}
}
function playPhase(player){
	var i = player;
	if(i != myPlayerNumber){
		playPhaseImg.setScale(.6);
		playersInfo[i].phase.removeAllChildren();
		playersInfo[i].phase.appendChild(playPhaseImg);
	}else{
		playPhaseImg.setScale(1);
		myPhaseHolder.removeAllChildren();
		myPhaseHolder.appendChild(playPhaseImg);
	}
}
function discardPhase(player){
	var i = player;
	if(i != myPlayerNumber){
		discardPhaseImg.setScale(.6);
		playersInfo[i].phase.removeAllChildren();
		playersInfo[i].phase.appendChild(discardPhaseImg);
	}else{
		discardPhaseImg.setScale(1);
		myPhaseHolder.removeAllChildren();
		myPhaseHolder.appendChild(discardPhaseImg);
	}
}
function finishPhase(player){
	var i = player;
	if(i != myPlayerNumber){
		finishPhaseImg.setScale(.6);
		playersInfo[i].phase.removeAllChildren();
		playersInfo[i].phase.appendChild(finishPhaseImg);
	}else{
		finishPhaseImg.setScale(1);
		myPhaseHolder.removeAllChildren();
		myPhaseHolder.appendChild(finishPhaseImg);
	}
}
/////////////////////////////functions
//function getCardFunction(){//自己调用
//	for(var i=0;i<self.card+self.fix;i++){
//		getCard(fromStack);
//	}
//}

function parsePhase(data){ //接收到来选择调用哪个函数
	Console.log("parsing phase:" + data.phase);
	myPlayerPhase = data.phase;
	nowPlayerNumber = data.player;
	switch(data.phase){
		case 0:
			roundStartPhase(data.player);
			break;
		case 1:
			judgePhase(data.player);
			break;
		case 2:
			drawPhase(data.player);
			break;
		case 3:
			playPhase(data.player);
			break;
		case 4:
			discardPhase(data.player);
			break;
		case 5:
			finishPhase(data.player);
			break;
	}
}

function changePhase(){
	Console.log('send now phase' + myPlayerPhase);
	var data = {};
	data.player = nowPlayerNumber;
	data.phase = myPlayerPhase;
	if(myPlayerPhase == 5){//说明要结束 那么此时的用户就要删除掉
		if(nowPlayerNumber != myPlayerNumber)
			playersInfo[nowPlayerNumber].phase.removeAllChildren();
		else
			myPhaseHolder.removeAllChildren();
	}
	socketio.emit('endPhase',data);
}