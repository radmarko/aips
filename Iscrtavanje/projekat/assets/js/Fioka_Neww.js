function Fioka(w, h, d, debljina, x, y, z, n){
	
	this.sirina = w;
	this.visina = h;
	this.dubina = d;
	this.name = n;
	this.debljinaDaske = debljina;
	this.posX = x;
	this.posY = y;
	this.posZ = z;
	this.texture = "wood-2.jpg";
	this.geometry;
	
	this.Draw = function(){
		var meshes = [];
	
		var sirinaPola = this.sirina/2;
		var visinaPola = this.visina/2;
		var dubinaPola = this.dubina/2;
		var debljinaDaskePola = this.debljinaDaske/2;
		var PiPola = 3.14/2;
		var cube = new THREE.BoxGeometry(this.sirina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane = createMesh(cube, this.texture);
		plane.rotation.x += PiPola;
		plane.position.x = this.posX;
		plane.position.y = this.posY - (visinaPola - debljinaDaskePola);	
		plane.position.z = this.posZ;

		//scene.add(plane);
		meshes.push(plane);

		var cube2 = new THREE.BoxGeometry(this.visina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane2 = createMesh(cube2, this.texture);
		plane2.rotation.x += PiPola;
		plane2.rotation.y += PiPola;
		plane2.position.x = this.posX - sirinaPola;
		plane2.position.y = this.posY;	
		plane2.position.z = this.posZ;

		//scene.add(plane2);
		meshes.push(plane2);

		var cube3 = new THREE.BoxGeometry(this.visina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane3 = createMesh(cube3, this.texture);
		plane3.rotation.x += PiPola;
		plane3.rotation.y += PiPola;
		plane3.position.x = this.posX + sirinaPola;
		plane3.position.y = this.posY;	
		plane3.position.z = this.posZ;

		//scene.add(plane3);
		meshes.push(plane3);

		var cube4 = new THREE.BoxGeometry(this.sirina, this.visina, this.debljinaDaske, 1, 1, 1);
		var plane4 = createMesh(cube4, this.texture);
		plane4.position.x = this.posX;
		plane4.position.y = this.posY;	
		plane4.position.z = this.posZ - dubinaPola + debljinaDaskePola;

		//scene.add(plane4);
		meshes.push(plane4);

		var cube6 = new THREE.BoxGeometry(this.sirina * 1.05, this.visina *1.05, this.debljinaDaske, 1, 1, 1);
		var plane6 = createMesh(cube6, this.texture);
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
		var sphere = createMesh( sph, this.texture);

		sphere.position.x = this.posX;
		sphere.position.y = this.posY;	
		sphere.position.z = this.posZ + dubinaPola + this.debljinaDaske;
		//scene.add(sphere);
		meshes.push(sphere);

		var geometry = mergeMeshes(meshes);
		var obj = createMesh(geometry, this.texture);
		obj.name = name;
		obj.id = "fioka12";
		//obj.position.y -= visinaPola - debljinaDaskePola;
		objects.push(obj);
		scene.add(obj);

	}
	
	this.CreateGeometry = function(){
		var meshes = [];
	
		var sirinaPola = this.sirina/2;
		var visinaPola = this.visina/2;
		var dubinaPola = this.dubina/2;
		var debljinaDaskePola = this.debljinaDaske/2;
		var PiPola = 3.14/2;
		var cube = new THREE.BoxGeometry(this.sirina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane = createMesh(cube, this.texture);
		plane.rotation.x += PiPola;
		plane.position.x = this.posX;
		plane.position.y = this.posY - (visinaPola - debljinaDaskePola);	
		plane.position.z = this.posZ;

		//scene.add(plane);
		meshes.push(plane);

		var cube2 = new THREE.BoxGeometry(this.visina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane2 = createMesh(cube2, this.texture);
		plane2.rotation.x += PiPola;
		plane2.rotation.y += PiPola;
		plane2.position.x = this.posX - sirinaPola;
		plane2.position.y = this.posY;	
		plane2.position.z = this.posZ;

		//scene.add(plane2);
		meshes.push(plane2);

		var cube3 = new THREE.BoxGeometry(this.visina, this.dubina, this.debljinaDaske, 1, 1, 1);
		var plane3 = createMesh(cube3, this.texture);
		plane3.rotation.x += PiPola;
		plane3.rotation.y += PiPola;
		plane3.position.x = this.posX + sirinaPola;
		plane3.position.y = this.posY;	
		plane3.position.z = this.posZ;

		//scene.add(plane3);
		meshes.push(plane3);

		var cube4 = new THREE.BoxGeometry(this.sirina, this.visina, this.debljinaDaske, 1, 1, 1);
		var plane4 = createMesh(cube4, this.texture);
		plane4.position.x = this.posX;
		plane4.position.y = this.posY;	
		plane4.position.z = this.posZ - dubinaPola + debljinaDaskePola;

		//scene.add(plane4);
		meshes.push(plane4);

		var cube6 = new THREE.BoxGeometry(this.sirina * 1.05, this.visina *1.05, this.debljinaDaske, 1, 1, 1);
		var plane6 = createMesh(cube6, this.texture);
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
		var sphere = createMesh( sph, this.texture);

		sphere.position.x = this.posX;
		sphere.position.y = this.posY;	
		sphere.position.z = this.posZ + dubinaPola + this.debljinaDaske;
		//scene.add(sphere);
		meshes.push(sphere);

		var geometry = mergeMeshes(meshes);
		var obj = createMesh(geometry, this.texture);
		obj.name = name;
		obj.id = "fioka12";
		//obj.position.y -= visinaPola - debljinaDaskePola;
		//objects.push(obj);
		//scene.add(obj);
		return obj;
	}
	
}