function Box(w, h, d, debljina, x, y, z, n){
	
	this.sirina = w;
	this.visina = h;
	this.dubina = d;
	this.name = n;
	this.debljinaDaske = debljina;
	this.posX = x;
	this.posY = y;
	this.posZ = z;
	this.texture;
	
	this.Draw = function()
	{
		var sirinaPola = this.sirina/2;
		var visinaPola = this.visina/2;
		var dubinaPola = this.dubina/2;
		var debljinaDaskePola = this.debljinaDaske/2;
		var PiPola = 3.14/2;
		
		var meshes = [];
		
		var cube = new THREE.BoxGeometry(this.sirina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane = createMesh(cube, "wood-2.jpg");
		plane.rotation.x += PiPola;
		plane.position.x = this.posX;
		plane.position.y = this.posY;	
		plane.position.z = this.posZ;
		
		meshes.push(plane);

		var cube2 = new THREE.BoxGeometry(this.visina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane2 = createMesh(cube2, "wood-2.jpg");
		plane2.rotation.x += PiPola;
		plane2.rotation.y += PiPola;
		plane2.position.x = this.posX - sirinaPola;
		plane2.position.y = this.posY + visinaPola - debljinaDaskePola;	
		plane2.position.z = this.posZ;
		
		meshes.push(plane2);

		
		var cube3 = new THREE.BoxGeometry(this.visina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane3 = createMesh(cube3, "wood-2.jpg");
		plane3.rotation.x += PiPola;
		plane3.rotation.y += PiPola;
		plane3.position.x = this.posX + sirinaPola;
		plane3.position.y = this.posY + visinaPola - this.debljinaDaske/2;	
		plane3.position.z = this.posZ;
		
		meshes.push(plane3);
		
		var cube4 = new THREE.BoxGeometry(this.sirina, this.visina, this.debljinaDaske, 1, 1, 1);
		var plane4 = createMesh(cube4, "wood-2.jpg");
		plane4.position.x = this.posX;
		plane4.position.y = this.posY + visinaPola - debljinaDaskePola;	
		plane4.position.z = this.posZ - dubinaPola + debljinaDaskePola;
		
		meshes.push(plane4);
		
		
		var cube5 = new THREE.BoxGeometry(this.sirina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane5 = createMesh(cube5, "wood-2.jpg");
		plane5.rotation.x += PiPola;
		plane5.position.x = this.posX;
		plane5.position.y = this.posY + this.visina - this.debljinaDaske;	
		plane5.position.z = this.posZ;
		
		meshes.push(plane5);
		
		var geometry = mergeMeshes(meshes);
		var obj = createMesh(geometry, "wood-2.jpg");
		obj.position.y -= visinaPola;
		obj.name = this.name;
		objects.push(obj);
		scene.add(obj);
		
	}
}