function button(posx,posy,sizex,sizey,code){
    this.posx = posx;
    this.posy = posy;
    this.hovered = false;
    this.show = function(){
        rect(posx,posy,sizex,sizey);
        if(mouseX>this.posx&&mouseX<this.posx+sizex&&mouseY>this.posy&&mouseY<this.posy+sizey)
            hovered = true;
        else
            hovered = false;
    }
    this.hover = function(){
		return this.hovered;
	}
}