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
	this.geometry;
	this.childs = [];
	this.fioke = [];
	this.vrata = [];
	
	this.Draw = function()
	{
		var sirinaPola = this.sirina/2;
		var visinaPola = this.visina/2;
		var dubinaPola = this.dubina/2;
		var debljinaDaskePola = this.debljinaDaske/2;
		var PiPola = 3.14/2;
		
		var meshes = [];
		
		//donja
		var cube = new THREE.BoxGeometry(this.sirina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane = createMesh(cube, "wood-2.jpg");
		plane.rotation.x += PiPola;
		plane.position.x = this.posX;
		plane.position.y = this.posY - visinaPola + debljinaDaskePola;	
		plane.position.z = this.posZ;
		
		meshes.push(plane);
		
		//leva
		var cube2 = new THREE.BoxGeometry(this.visina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane2 = createMesh(cube2, "wood-2.jpg");
		plane2.rotation.x += PiPola;
		plane2.rotation.y += PiPola;
		plane2.position.x = this.posX - sirinaPola;
		plane2.position.y = this.posY;	
		plane2.position.z = this.posZ;
		
		meshes.push(plane2);

		//desna
		var cube3 = new THREE.BoxGeometry(this.visina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane3 = createMesh(cube3, "wood-2.jpg");
		plane3.rotation.x += PiPola;
		plane3.rotation.y += PiPola;
		plane3.position.x = this.posX + sirinaPola;
		plane3.position.y = this.posY;	
		plane3.position.z = this.posZ;
		
		meshes.push(plane3);
		
		//zadnja
		var cube4 = new THREE.BoxGeometry(this.sirina, this.visina, this.debljinaDaske, 1, 1, 1);
		var plane4 = createMesh(cube4, "wood-2.jpg");
		plane4.position.x = this.posX;
		plane4.position.y = this.posY;	
		plane4.position.z = this.posZ - dubinaPola + debljinaDaskePola;
		
		meshes.push(plane4);
		
		//gornja
		var cube5 = new THREE.BoxGeometry(this.sirina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane5 = createMesh(cube5, "wood-2.jpg");
		plane5.rotation.x += PiPola;
		plane5.position.x = this.posX;
		plane5.position.y = this.posY + visinaPola - debljinaDaskePola;	
		plane5.position.z = this.posZ;
		
		meshes.push(plane5);
		
		var geometry = mergeMeshes(meshes);
		var obj = createMesh(geometry, "wood-2.jpg");
		//obj.position.y -= visinaPola;
		obj.name = this.name;
		objects.push(obj);
		scene.add(obj);
		
	}
	
	this.CreateGeometry = function(){
		var sirinaPola = this.sirina/2;
		var visinaPola = this.visina/2;
		var dubinaPola = this.dubina/2;
		var debljinaDaskePola = this.debljinaDaske/2;
		var PiPola = 3.14/2;
		
		var meshes = [];
		
		//donja
		var cube = new THREE.BoxGeometry(this.sirina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane = createMesh(cube, "wood-2.jpg");
		plane.rotation.x += PiPola;
		plane.position.x = this.posX;
		plane.position.y = this.posY - visinaPola + debljinaDaskePola;	
		plane.position.z = this.posZ;
		
		meshes.push(plane);
		
		//leva
		var cube2 = new THREE.BoxGeometry(this.visina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane2 = createMesh(cube2, "wood-2.jpg");
		plane2.rotation.x += PiPola;
		plane2.rotation.y += PiPola;
		plane2.position.x = this.posX - sirinaPola;
		plane2.position.y = this.posY;	
		plane2.position.z = this.posZ;
		
		meshes.push(plane2);

		//desna
		var cube3 = new THREE.BoxGeometry(this.visina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane3 = createMesh(cube3, "wood-2.jpg");
		plane3.rotation.x += PiPola;
		plane3.rotation.y += PiPola;
		plane3.position.x = this.posX + sirinaPola;
		plane3.position.y = this.posY;	
		plane3.position.z = this.posZ;
		
		meshes.push(plane3);
		
		//zadnja
		var cube4 = new THREE.BoxGeometry(this.sirina, this.visina, this.debljinaDaske, 1, 1, 1);
		var plane4 = createMesh(cube4, "wood-2.jpg");
		plane4.position.x = this.posX;
		plane4.position.y = this.posY;	
		plane4.position.z = this.posZ - dubinaPola + debljinaDaskePola;
		
		meshes.push(plane4);
		
		//gornja
		var cube5 = new THREE.BoxGeometry(this.sirina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane5 = createMesh(cube5, "wood-2.jpg");
		plane5.rotation.x += PiPola;
		plane5.position.x = this.posX;
		plane5.position.y = this.posY + visinaPola - debljinaDaskePola;	
		plane5.position.z = this.posZ;
		
		meshes.push(plane5);
		
		if(this.childs != null){
			for(var i = 0; i < this.childs.length; i++)
			{
				var geo = this.childs[i].CreateGeometry();
				meshes.push(geo);
			}
		}
		
		if(this.fioke != null){
			for(var i = 0; i < this.fioke.length; i++)
			{
				var geo = this.fioke[i].CreateGeometry();
				meshes.push(geo);
			}
		}
		
		if(this.vrata != null){
			for(var i = 0; i < this.vrata.length; i++)
			{
				var geo = this.vrata[i].CreateGeometry();
				meshes.push(geo);
			}
		}
		
		geometry = mergeMeshes(meshes);
		
		return geometry;
	}
}
