function ufo(){
	this.rocks = [];
	this.state = dead;
	this.pos = createVector(width/2,height/2);
	this.vel = createVector(random(0,5),random(0,5));
	this.last_bullet = 0;
	
	this.show = function(){
		if(this.state){
			this.pos.set((width+this.pos.x+this.vel.x)%width,(height+this.pos.y+this.vel.y)%height);
			if (frameCount - this.last_bullet>20){
					bullets.push(new bullet(this.vel.copy(),this.pos.copy(),random(0,2*PI),ship_bul));
					this.last_bullet = frameCount;
			}
			push();
				translate(this.pos.x,this.pos.y);
				line(-4,-10,4,-10);
				line(5,-10,7,-5);
				line(7,-5,15,0);
				line(15,0,8,5);
				line(8,5,-8,5);
				line(-8,5,-15,0);
				line(-15,0,-7,-5);
				line(-7,-5,-5,-10);
				line(-7,-5,7,-5);
				line(15,0,-15,0);
			pop();
		}
		else{
			for (index = 0; index < this.rocks.length; index++){
					var a = index*PI/3;
					point(this.rocks[index] * cos(a)*this.death_time,this.rocks[index] * sin(a)*this.death_time);
			}
			if (this.death_time++>100){
				//KILL MEEEEEEEEE
			}
		}
	}
	this.getPos = function(){
		return this.pos;
	}
	this.kill = function(){
		if (this.state){

			this.state = dead;
			this.death_time = 0;
			
		}
	}
}