function takeTarget(layer,sprite,index){
	if(Myself.targetStates[index] != 'targeted' && Myself.maxTarget > Myself.targets.length){
		sprite.setStroke(5,255,255,255);
		Myself.targetStates[index] = 'targeted';
	}else if(Myself.maxTarget == Myself.targets.length){
		for(s in Myself.targetStates)
	}
}