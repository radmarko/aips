function Fioka(w, h, d, debljina, x, y, z, n){
	
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
		
		
		var cube6 = new THREE.BoxGeometry(this.sirina * 0.95, this.visina *0.95, this.debljinaDaske, 1, 1, 1);
		var plane6 = createMesh(cube6, "wood-2.jpg");
		plane6.position.x = this.posX;
		plane6.position.y = this.posY;	
		plane6.position.z = this.posZ + dubinaPola - debljinaDaskePola;
		//scene.add(plane6);
		meshes.push(plane6);
		
		var radius = this.debljinaDaske;
		var widthSegments = 10;
		var heightSegments = 10;
		var phiStart = 0;
		var phiLength = Math.PI * 2;
		var thetaStart = 0;
		var thetaLength = Math.PI;
		var sph = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
		var sphere = createMesh( sph, "wood-2.jpg");

		sphere.position.x = this.posX;
		sphere.position.y = this.posY + visinaPola;	
		sphere.position.z = this.posZ + dubinaPola + this.debljinaDaske;
		//scene.add(sphere);
		meshes.push(sphere);
		
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
		
		geometry = mergeMeshes(meshes);
		
		return geometry;
	}
}
