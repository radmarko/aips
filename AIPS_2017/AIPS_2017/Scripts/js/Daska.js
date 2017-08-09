function Daska(w, h, d, x, y, z, n){
	
	this.sirina = w;
	this.visina = h;
	this.dubina = d;
	this.name = n;
	this.posX = x;
	this.posY = y;
	this.posZ = z;
    this.texture;
    this.geometry;
	
	this.Draw = function(){
		var meshes = [];
	
		var PiPola = 3.14/2;
		var cube = new THREE.BoxGeometry(this.sirina, this.visina, this.dubina, 1, 1, 1);
		var plane = createMesh(cube, "wood-2.jpg");
		plane.position.x = this.posX;
		plane.position.y = this.posY;	
		plane.position.z = this.posZ;
		
		//scene.add(plane);
		meshes.push(plane);
		
		geometry = mergeMeshes(meshes);
		var obj = createMesh(geometry, "wood-2.jpg");
		obj.name = this.name;
		objects.push(obj);
		scene.add(obj);
    }

    this.CreateGeometry = function () {
        var meshes = [];

        var PiPola = 3.14 / 2;
        var cube = new THREE.BoxGeometry(this.sirina, this.visina, this.dubina, 1, 1, 1);
        var plane = createMesh(cube, "wood-2.jpg");
        plane.position.x = this.posX;
        plane.position.y = this.posY;
        plane.position.z = this.posZ;

        //scene.add(plane);
        meshes.push(plane);

        geometry = mergeMeshes(meshes);
        var obj = createMesh(geometry, "wood-2.jpg");
        return obj;
    }
	
}