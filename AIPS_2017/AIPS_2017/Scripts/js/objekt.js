function objekat(w, h, d, n){
	
	this.width = w;
	this.height = h;
	this.depth = d;
	this.name = n;
	
	this.getWidth = function(){
		return this.width;
	}
	
	this.getName = function(){
		return this.name;
	}
	
}