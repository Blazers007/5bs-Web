//alert("2");
function returnCardImg(card){
	var root = 'image/card/';
	if(card.name == undefined)//如果直接是名字则直接用
		return root+card+'.jpg';
	else
		return root+card.name+'.jpg';
}

function returnCardSuit(card){
	switch(card.suit){
		case 'heitao':
			return 'image/system/cardsuit/spade.png';
		break;
		case 'hongtao':
			return 'image/system/cardsuit/heart.png';
		break;
		case 'meihua':
			return 'image/system/cardsuit/club.png';
		break;
		case 'fangpian':
			return 'image/system/cardsuit/diamond.png';
		break;
	}
}

function returnCardPoint(card){
	if(card.suit == 'heitao' || card.suit == 'meihua'){
		return 'image/system/black/'+card.point+'.png';
	}
	else if(card.suit == 'hongtao' || card.suit == 'fangpian'){
		return 'image/system/red/'+card.point+'.png';
	}
	else
		return 'no-color';
}

function returnCardMusic(gender,card){
	var root ='audio/card/';
	if(card.type == 'jiben' || card.type == 'jinnang'){
		if(gender != 'male' && gender != 'female')
			return root+'male'+'/'+card.name+'.ogg';
		else
			return root+gender+'/'+card.name+'.ogg';
	}else
		return 'no-music';
}

function returnEquip(card){
	var root = 'image/equips/';
	var re = {};
	re.src = root+card.name+'.png';
	switch(card.position){
		case 'wuqi':
			re.layer = equipWeapon;
			return re;
			break;
		case 'fangju':
			re.layer = equipDefense;
			return re;
			break;
		case 'jingongma':
			re.layer = equipAttHorse;
			return re;
			break;
		case 'fangyuma':
			re.layer = equipDefHorse;
			return re;
			break;
	}
}

function returnCardChName(card){
	//此处可以改写函数 返回他的点数 等等 便于给装备显示
	var reCard = card;
	reCard.range = 0;//攻击距离!
	switch(card.name){
		case 'baguazhen':
			return "八卦阵";
		break;
		case 'baiyinshizi':
			return "白银狮子";
		break;
		case 'chitu':
			return "赤兔";
		break;
		case 'cixiongshuanggujian':
			return "雌雄双股剑";
		break;
		case 'dayuan':
			return "大宛";
		break;
		case 'dilu':
			return "的卢";
		break;
		case 'fangtianhuaji':
			return "方天画戟";
		break;
		case 'guanshifu':
			return "贯石斧";
		break;
		case 'gudingdao':
			return "古锭刀";
		break;
		case 'hanbingjian':
			return "寒冰剑";
		break;
		case 'hualiu':
			return "骅骝";
		break;
		case 'qilingong':
			return "麒麟弓";
		break;
		case 'qinggangjian':
			return "青钢剑";
		break;
		case 'qinglongyanyuedao':
			return "青龙偃月刀";
		break;
		case 'renwangdun':
			return "仁王盾";
		break;
		case 'yinyueqiang':
			return "银月枪";
		break;
		case 'tengjia':
			return "藤甲";
		break;

		case 'zhangbashemao':
			return "丈八蛇矛";
		break;
		case 'zhuahuangfeidian':
			return "爪黄飞电";
		break;
		case 'zhugeliannu':
			return "诸葛连弩";
		break;
		case 'zhuqueyushan':
			return "朱雀羽扇";
		break;
		case 'zixing':
			return "紫骍";
		break;
	}
}