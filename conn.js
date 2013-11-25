//alert("3");
function pushMessage(type,to,from,card){  //encode string to json
	var msg = {
		msgType:type,
		toX:to.x,
		toY:to.y,
		fromX:from.x,
		fromY:from.y,
		cardName:card.name,
		cardType:card.type,
		cardSuit:card.suit,
		cardPosition:card.position,
		cardPoint:card.point,
		cardBack:card.back};
	var jsonMSG = $.toJSON(msg);
	//ws.send(jsonMSG);
	sendIO('system',jsonMSG);
}

function handleMessage(msg){//eval json to string
	var type = $.evalJSON(msg).msgType;
	var to = {};//其实这里只用传一个id 然后根据信息表来访问信息
	var from = {};
	var card = {};
	to.x = $.evalJSON(msg).toX;
	to.y = $.evalJSON(msg).toY;
	from.x = $.evalJSON(msg).fromX;
	from.y = $.evalJSON(msg).fromY;
	card.name = $.evalJSON(msg).cardName;
	card.type = $.evalJSON(msg).cardType;
	card.suit = $.evalJSON(msg).cardSuit;
	card.position = $.evalJSON(msg).cardPosition;
	card.point = $.evalJSON(msg).cardPoint;
	card.back = $.evalJSON(msg).cardBack;
	switch(type){
		case "hitCard":
			hitCardAnimation(to,from,card);
			break;
		case "moveCard":
			cardMoveAnimation(to,from,card);
			break;
		case "equiped":
			otherEquipAnimation(0,card);
			break;
	}
}

function initplayerList(msg){

}