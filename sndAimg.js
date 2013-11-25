//alert("2");
function returnCardImg(card){
	var root = 'image/card/';
	if(card.name == undefined)//���ֱ����������ֱ����
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
	//�˴����Ը�д���� �������ĵ��� �ȵ� ���ڸ�װ����ʾ
	var reCard = card;
	reCard.range = 0;//��������!
	switch(card.name){
		case 'baguazhen':
			return "������";
		break;
		case 'baiyinshizi':
			return "����ʨ��";
		break;
		case 'chitu':
			return "����";
		break;
		case 'cixiongshuanggujian':
			return "����˫�ɽ�";
		break;
		case 'dayuan':
			return "����";
		break;
		case 'dilu':
			return "��¬";
		break;
		case 'fangtianhuaji':
			return "���컭�";
		break;
		case 'guanshifu':
			return "��ʯ��";
		break;
		case 'gudingdao':
			return "�Ŷ���";
		break;
		case 'hanbingjian':
			return "������";
		break;
		case 'hualiu':
			return "����";
		break;
		case 'qilingong':
			return "���빭";
		break;
		case 'qinggangjian':
			return "��ֽ�";
		break;
		case 'qinglongyanyuedao':
			return "�������µ�";
		break;
		case 'renwangdun':
			return "������";
		break;
		case 'yinyueqiang':
			return "����ǹ";
		break;
		case 'tengjia':
			return "�ټ�";
		break;

		case 'zhangbashemao':
			return "�ɰ���ì";
		break;
		case 'zhuahuangfeidian':
			return "צ�Ʒɵ�";
		break;
		case 'zhugeliannu':
			return "�������";
		break;
		case 'zhuqueyushan':
			return "��ȸ����";
		break;
		case 'zixing':
			return "���U";
		break;
	}
}