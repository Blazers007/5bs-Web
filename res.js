function animaInit(){  // JS 文件读取的问题 不像C++　貌似函数的顺序很关键！
	var pngs = new Array("0.png","1.png","2.png","3.png","4.png","5.png",
		"6.png","7.png","8.png","9.png","10.png","11.png","12.png",
		"13.png","14.png","15.png","16.png","17.png","18.png","19.png",
		"20.png","21.png","22.png","23.png","24.png","25.png");
	//0-25.PNG
	//进行初始化
	animaList[0].ListNum = 17; //00 酒的动画
	for(var i=0;i<17;i++){
		animaList[0].frameList[i] = "image/system/emotion/analeptic/"+pngs[i];
	}
	animaList[1].ListNum = 24; //01  八卦
	for(var i=0;i<24;i++){
		animaList[1].frameList[i] = "image/system/emotion/armor/eight_diagram/"+pngs[i];
	}
	animaList[2].ListNum = 24; //02 仁王盾
	for(var i=0;i<24;i++){
		animaList[2].frameList[i] = "image/system/emotion/armor/renwang_shield/"+pngs[i];
	}
	animaList[3].ListNum = 24; //03 白银狮子
	for(var i=0;i<24;i++){
		animaList[3].frameList[i] = "image/system/emotion/armor/silver_lion/"+pngs[i];
	}
	animaList[4].ListNum = 24; //04 藤甲防御
	for(var i=0;i<24;i++){
		animaList[4].frameList[i] = "image/system/emotion/armor/vine/"+pngs[i];
	}
	animaList[5].ListNum = 24; //05 藤甲火杀
	for(var i=0;i<24;i++){
		animaList[5].frameList[i] = "image/system/emotion/armor/vineburn/"+pngs[i];
	}
	animaList[6].ListNum = 11; //06  铁索连环
	for(var i=0;i<11;i++){
		animaList[6].frameList[i] = "image/system/emotion/chain/"+pngs[i];
	}
	animaList[7].ListNum = 5; //07  受到伤害
	for(var i=0;i<5;i++){
		animaList[7].frameList[i] = "image/system/emotion/damage/"+pngs[i];
	}
	animaList[8].ListNum = 26; //08  决斗
	for(var i=0;i<26;i++){
		animaList[8].frameList[i] = "image/system/emotion/duel/"+pngs[i];
	}
	animaList[9].ListNum = 12; //09  框架动画
	for(var i=0;i<12;i++){
		animaList[9].frameList[i] = "image/system/emotion/equipborder/"+pngs[i];
	}
	animaList[10].ListNum = 24; //10  火杀
	for(var i=0;i<24;i++){
		animaList[10].frameList[i] = "image/system/emotion/fire_slash/"+pngs[i];
	}
	animaList[11].ListNum = 23; //11  闪
	for(var i=0;i<23;i++){
		animaList[11].frameList[i] = "image/system/emotion/jink/"+pngs[i];
	}
	animaList[12].ListNum = 19; //12  判定失败
	for(var i=0;i<19;i++){
		animaList[12].frameList[i] = "image/system/emotion/judgebad/"+pngs[i];
	}
	animaList[13].ListNum = 17; //13  判定成功
	for(var i=0;i<17;i++){
		animaList[13].frameList[i] = "image/system/emotion/judgegood/"+pngs[i];
	}
	animaList[14].ListNum = 14; //14  杀手
	for(var i=0;i<14;i++){
		animaList[14].frameList[i] = "image/system/emotion/killer/"+pngs[i];
	}
	animaList[15].ListNum = 19; //15  判定失败
	for(var i=0;i<19;i++){
		animaList[15].frameList[i] = "image/system/emotion/no-success/"+pngs[i];
	}
	animaList[16].ListNum = 19; //16  判定成功
	for(var i=0;i<19;i++){
		animaList[16].frameList[i] = "image/system/emotion/success/"+pngs[i];
	}
	animaList[17].ListNum = 17 //17  桃
	for(var i=0;i<17;i++){
		animaList[17].frameList[i] = "image/system/emotion/peach/"+pngs[i];
	}
	animaList[18].ListNum = 19; //18  判定成功
	for(var i=0;i<19;i++){
		animaList[18].frameList[i] = "image/system/emotion/success/"+pngs[i];
	}
	animaList[19].ListNum = 18; //19  黑杀
	for(var i=0;i<18;i++){
		animaList[19].frameList[i] = "image/system/emotion/slash_black/"+pngs[i];
	}
	animaList[20].ListNum = 24; //20  红杀
	for(var i=0;i<24;i++){
		animaList[20].frameList[i] = "image/system/emotion/slash_red/"+pngs[i];
	}
	animaList[21].ListNum = 24; //21  雷杀
	for(var i=0;i<24;i++){
		animaList[21].frameList[i] = "image/system/emotion/thunder_slash/"+pngs[i];
	}
	//武器动画暂不添加
}
animaInit();
function SetCardValue(card,point,suit,type,position,name){
	card.point = point;
	card.suit = suit;
	card.type = type;
	card.position = position;
	card.name = name;
}
function cardsInit(){
	SetCardValue(Cards[0],1,"fangpian","zhuangbei","wuqi","yinyueqiang");
    SetCardValue(Cards[1],7,"heitao","jiben","jingong","sha"); 
    SetCardValue(Cards[2],8,"heitao","jiben","jingong","sha");
    SetCardValue(Cards[3],8,"heitao","jiben","jingong","sha");
    SetCardValue(Cards[4],9,"heitao","jiben","jingong","sha");
    SetCardValue(Cards[5],9,"heitao","jiben","jingong","sha");
    SetCardValue(Cards[6],10,"heitao","jiben","jingong","sha");
    SetCardValue(Cards[7],10,"heitao","jiben","jingong","sha");
    SetCardValue(Cards[8],2,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[9],3,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[10],4,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[11],5,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[12],6,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[13],7,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[14],8,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[15],8,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[16],9,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[17],9,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[18],10,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[19],10,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[20],11,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[21],11,"meihua","jiben","jingong","sha");
    SetCardValue(Cards[22],10,"hongtao","jiben","jingong","sha");
    SetCardValue(Cards[23],10,"hongtao","jiben","jingong","sha");
    SetCardValue(Cards[24],11,"hongtao","jiben","jingong","sha");
    SetCardValue(Cards[25],6,"fangpian","jiben","jingong","sha");
    SetCardValue(Cards[26],7,"fangpian","jiben","jingong","sha");
    SetCardValue(Cards[27],8,"fangpian","jiben","jingong","sha");
    SetCardValue(Cards[28],9,"fangpian","jiben","jingong","sha");
    SetCardValue(Cards[29],10,"fangpian","jiben","jingong","sha");
    SetCardValue(Cards[30],13,"fangpian","jiben","jingong","sha");
    SetCardValue(Cards[31],2,"hongtao","jiben","fangyu","shan");
    SetCardValue(Cards[32],2,"hongtao","jiben","fangyu","shan");
    SetCardValue(Cards[33],13,"hongtao","jiben","fangyu","shan");
    SetCardValue(Cards[34],2,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[35],2,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[36],3,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[37],4,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[38],5,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[39],6,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[40],7,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[41],8,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[42],9,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[43],10,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[44],11,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[45],11,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[46],3,"hongtao","jiben","huifu","tao");
    SetCardValue(Cards[47],4,"hongtao","jiben","huifu","tao");
    SetCardValue(Cards[48],6,"hongtao","jiben","huifu","tao");
    SetCardValue(Cards[49],7,"hongtao","jiben","huifu","tao");
    SetCardValue(Cards[50],8,"hongtao","jiben","huifu","tao");
    SetCardValue(Cards[51],9,"hongtao","jiben","huifu","tao");
    SetCardValue(Cards[52],12,"hongtao","jiben","huifu","tao");
    SetCardValue(Cards[53],12,"fangpian","jiben","huifu","tao");
    SetCardValue(Cards[54],1,"meihua","zhuangbei","wuqi","zhugeliannu");
    SetCardValue(Cards[55],1,"fangpian","zhuangbei","wuqi","zhugeliannu");
    SetCardValue(Cards[56],2,"heitao","zhuangbei","wuqi","cixiongshuanggujian");
    SetCardValue(Cards[57],6,"heitao","zhuangbei","wuqi","qinggangjian");
    SetCardValue(Cards[58],5,"heitao","zhuangbei","wuqi","qinglongyanyuedao");
    SetCardValue(Cards[59],12,"heitao","zhuangbei","wuqi","zhangbashemao");
    SetCardValue(Cards[60],5,"fangpian","zhuangbei","wuqi","guanshifu");
    SetCardValue(Cards[61],12,"fangpian","zhuangbei","wuqi","fangtianhuaji");
    SetCardValue(Cards[62],5,"hongtao","zhuangbei","wuqi","qilingong");
    SetCardValue(Cards[63],2,"heitao","zhuangbei","fangju","baguazhen");
    SetCardValue(Cards[64],2,"meihua","zhuangbei","fangju","baguazhen");
    SetCardValue(Cards[65],5,"heitao","zhuangbei","fangyuma","jueying");
    SetCardValue(Cards[66],5,"meihua","zhuangbei","fangyuma","dilu");
    SetCardValue(Cards[67],13,"hongtao","zhuangbei","fangyuma","zhuahuangfeidian");
    SetCardValue(Cards[68],5,"hongtao","zhuangbei","jingongma","chitu");
    SetCardValue(Cards[69],13,"heitao","zhuangbei","jingongma","dayuan");
    SetCardValue(Cards[70],13,"fangpian","zhuangbei","jingongma","zixing");
    SetCardValue(Cards[71],3,"hongtao","jinnang","quanjuxiaoguo","wugufengdeng");
    SetCardValue(Cards[72],4,"hongtao","jinnang","quanjuxiaoguo","wugufengdeng");
    SetCardValue(Cards[73],1,"hongtao","jinnang","quanjuxiaoguo","taoyuanjieyi");
    SetCardValue(Cards[74],7,"heitao","jinnang","fanweixiaoguo","nanmanruqin");
    SetCardValue(Cards[75],13,"heitao","jinnang","fanweixiaoguo","nanmanruqin");
    SetCardValue(Cards[76],7,"meihua","jinnang","fanweixiaoguo","nanmanruqin");
    SetCardValue(Cards[77],1,"hongtao","jinnang","fanweixiaoguo","wanjianqifa");
    SetCardValue(Cards[78],1,"heitao","jinnang","dantijinnang","juedou");
    SetCardValue(Cards[79],1,"meihua","jinnang","dantixiaoguo","juedou");
    SetCardValue(Cards[80],1,"fangpian","jinnang","dantixiaoguo","juedou");
    SetCardValue(Cards[81],7,"hongtao","jinnang","dantijinnang","wuzhongshengyou");
    SetCardValue(Cards[82],8,"hongtao","jinnang","dantijinnang","wuzhongshengyou");
    SetCardValue(Cards[83],9,"hongtao","jinnang","dantijinnang","wuzhongshengyou");
    SetCardValue(Cards[84],11,"hongtao","jinnang","dantijinnang","wuzhongshengyou");
    SetCardValue(Cards[85],3,"heitao","jinnang","dantijinnang","shunshouqianyang");
    SetCardValue(Cards[86],4,"heitao","jinnang","dantijinnang","shunshouqianyang");
    SetCardValue(Cards[87],11,"heitao","jinnang","dantijinnang","shunshouqianyang");
    SetCardValue(Cards[88],3,"fangpian","jinnang","dantijinnang","shunshouqianyang");
    SetCardValue(Cards[89],4,"fangpian","jinnang","dantijinnang","shunshouqianyang");
    SetCardValue(Cards[90],3,"heitao","jinnang","dantijinnang","guohechaiqiao");
    SetCardValue(Cards[91],4,"heitao","jinnang","dantijinnang","guohechaiqiao");
    SetCardValue(Cards[92],12,"heitao","jinnang","dantijinnang","guohechaiqiao");
    SetCardValue(Cards[93],3,"meihua","jinnang","dantijinnang","guohechaiqiao");
    SetCardValue(Cards[94],4,"meihua","jinnang","dantijinnang","guohechaiqiao");
    SetCardValue(Cards[95],12,"hongtao","jinnang","dantijinnang","guohechaiqiao");
    SetCardValue(Cards[96],12,"meihua","jinnang","dantijinnang","jiedaosharen");
    SetCardValue(Cards[97],13,"meihua","jinnang","dantijinnang","jiedaosharen");
    SetCardValue(Cards[98],11,"heitao","jinnang","dantijinnang","wuxiekeji");
    SetCardValue(Cards[99],12,"meihua","jinnang","dantijinnang","wuxiekeji");
    SetCardValue(Cards[100],13,"meihua","jinnang","dantijinnang","wuxiekeji");
    SetCardValue(Cards[101],6,"heitao","jinnang","yanshijinnang","lebusishu");
    SetCardValue(Cards[102],6,"meihua","jinnang","yanshijinnang","lebusishu");
    SetCardValue(Cards[103],6,"hongtao","jinnang","yanshijinnang","lebusishu");
    SetCardValue(Cards[104],1,"heitao","jinnang","yanshijinnang","shandian");
    SetCardValue(Cards[105],2,"heitao","zhuangbei","wuqi","hanbingjian");
    SetCardValue(Cards[106],2,"meihua","zhuangbei","fangju","renwangdun");
    SetCardValue(Cards[107],12,"hongtao","jinnang","yanshijinnang","shandian");
    SetCardValue(Cards[108],12,"fangpian","jinnang","dantijinnang","wuxiekeji");//EX
    SetCardValue(Cards[109],1,"heitao","zhuangbei","wuqi","gudingdao");
    SetCardValue(Cards[110],2,"heitao","zhaungbei","fangju","tengjia");
    SetCardValue(Cards[111],3,"heitao","jiben","fuzhushanghai","jiu");
    SetCardValue(Cards[112],4,"heitao","jiben","jingong","leisha");
    SetCardValue(Cards[113],5,"heitao","jiben","jingong","leisha");
    SetCardValue(Cards[114],6,"heitao","jiben","jingong","leisha");
    SetCardValue(Cards[115],7,"heitao","jiben","jingong","leisha");
    SetCardValue(Cards[116],8,"heitao","jiben","jingong","leisha");
    SetCardValue(Cards[117],9,"heitao","jiben","fuzhushanghai","jiu");
    SetCardValue(Cards[118],10,"heitao","jinnang","yanshijinnang","bingliangcunduan");
    SetCardValue(Cards[119],11,"heitao","jinnang","shanghaichuandao","tiesuolianhuan");
    SetCardValue(Cards[120],12,"heitao","jinnang","shanghaichuandao","tiesuolianhuan");
    SetCardValue(Cards[121],13,"heitao","jinnang","dantijinnang","wuxiekeji");
    SetCardValue(Cards[122],1,"meihua","zhuangbei","fangju","baiyinshizi");
    SetCardValue(Cards[123],2,"meihua","zhuangbei","fangju","tengjia");
    SetCardValue(Cards[124],3,"meihua","jiben","fuzhushanghai","jiu");
    SetCardValue(Cards[125],4,"meihua","jinnang","yanshijinnang","bingliangcunduan");
    SetCardValue(Cards[126],5,"meihua","jiben","jingong","leisha");
    SetCardValue(Cards[127],6,"meihua","jiben","jingong","leisha");
    SetCardValue(Cards[128],7,"meihua","jiben","jingong","leisha");
    SetCardValue(Cards[129],8,"meihua","jiben","jingong","leisha");
    SetCardValue(Cards[130],9,"meihua","jiben","fuzhushanghai","jiu");
    SetCardValue(Cards[131],10,"meihua","jinnang","shanghaichuandao","tiesuolianhuan");
    SetCardValue(Cards[132],11,"meihua","jinnang","shanghaichuandao","tiesuolianhuan");
    SetCardValue(Cards[133],12,"meihua","jinnang","shanghaichuandao","tiesuolianhuan");
    SetCardValue(Cards[134],13,"meihua","jinnang","shanghaichuandao","tiesuolianhuan");
    SetCardValue(Cards[135],1,"hongtao","jinnang","dantijinnang","wuxiekeji");
    SetCardValue(Cards[136],2,"hongtao","jinnang","dantijinnang","huogong");
    SetCardValue(Cards[137],3,"hongtao","jinnang","dantijinnang","huogong");
    SetCardValue(Cards[138],4,"hongtao","jiben","jingong","huosha");
    SetCardValue(Cards[139],5,"hongtao","jiben","huifu","tao");
    SetCardValue(Cards[140],6,"hongtao","jiben","huifu","tao");
    SetCardValue(Cards[141],7,"hongtao","jiben","jingong","huosha");
    SetCardValue(Cards[142],8,"hongtao","jiben","fangyu","shan");
    SetCardValue(Cards[143],9,"hongtao","jiben","fangyu","shan");
    SetCardValue(Cards[144],10,"hongtao","jiben","jingong","huosha");
    SetCardValue(Cards[145],11,"hongtao","jiben","fangyu","shan");
    SetCardValue(Cards[146],12,"hongtao","jiben","fangyu","shan");
    SetCardValue(Cards[147],13,"hongtao","jinnang","dantijinnang","wuxiekeji");
    SetCardValue(Cards[148],1,"fangpian","zhuangbei","wuqi","zhuqueyushan");
    SetCardValue(Cards[149],2,"fangpian","jiben","huifu","tao");
    SetCardValue(Cards[150],3,"fangpian","jiben","huifu","tao");
    SetCardValue(Cards[151],4,"fangpian","jiben","jingong","huosha");
    SetCardValue(Cards[152],5,"fangpian","jiben","jingong","huosha");
    SetCardValue(Cards[153],6,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[154],7,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[155],8,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[156],9,"fangpian","jiben","fuzhushanghai","jiu");
    SetCardValue(Cards[157],10,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[158],11,"fangpian","jiben","fangyu","shan");
    SetCardValue(Cards[159],12,"fangpian","jinnang","dantijinnang","huogong");
    SetCardValue(Cards[160],13,"fangpian","zhuangbei","fangyuma","hualiu");
}
cardsInit();

function initPlayer(){//测试用 以后换位置
	playerList[0].posX = 88;//最大的 0是右手边第一个人就是自己   在自己眼中自己就是开始
	playerList[0].posY = 300;
	playerList[1].posX = 338;
	playerList[1].posY = 100;
	playerList[2].posX = 588;
	playerList[2].posY = 100;
	playerList[3].posX = 838;
	playerList[3].posY = 100;
	playerList[4].posX = 1088;
	playerList[4].posY = 300;
	playerList[5].posX = 0;
	playerList[5].posY = 0;
}
initPlayer();

function initPlayerList(i,data){
	playerList[i].id = data.id;
	playerList[i].posX = data.posX;
	playerList[i].posY = data.posY;
	playerList[i].hero = data.hero;
	playerList[i].hpMax = data.hpMax;
	playerList[i].hpNow = data.hpNow;
	playerList[i].country = data.country;
	playerList[i].gender = data.gender;
}