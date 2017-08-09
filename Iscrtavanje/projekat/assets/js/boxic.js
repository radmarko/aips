function Box(sirina, visina, dubina, debljinaDaske, posX, posY, posZ){

	var sirinaPola = sirina/2;
	var visinaPola = visina/2;
	var dubinaPola = dubina/2;
	var debljinaDaskePola = debljinaDaske/2;
	var PiPola = 3.14/2;
	
	var meshes = [];
	
	var cube = new THREE.BoxGeometry(sirina, dubina, debljinaDaske, 1, 1, 1);
	var plane = createMesh(cube, "wood-2.jpg");
	plane.rotation.x += PiPola;
	plane.position.x = posX;
	plane.position.y = posY;	
	plane.position.z = posZ;
	
	meshes.push(plane);

	var cube2 = new THREE.BoxGeometry(visina, dubina, debljinaDaske, 1, 1, 1);
	var plane2 = createMesh(cube2, "wood-2.jpg");
	plane2.rotation.x += PiPola;
	plane2.rotation.y += PiPola;
	plane2.position.x = posX - sirinaPola;
	plane2.position.y = posY + visinaPola - debljinaDaskePola;	
	plane2.position.z = posZ;
	
	meshes.push(plane2);

	
	var cube3 = new THREE.BoxGeometry(visina, dubina, debljinaDaske, 1, 1, 1);
	var plane3 = createMesh(cube3, "wood-2.jpg");
	plane3.rotation.x += PiPola;
	plane3.rotation.y += PiPola;
	plane3.position.x = posX + sirinaPola;
	plane3.position.y = posY + visinaPola - debljinaDaske/2;	
	plane3.position.z = posZ;
	
	meshes.push(plane3);
	
	var cube4 = new THREE.BoxGeometry(sirina, visina, debljinaDaske, 1, 1, 1);
	var plane4 = createMesh(cube4, "wood-2.jpg");
	plane4.position.x = posX;
	plane4.position.y = posY + visinaPola - debljinaDaskePola;	
	plane4.position.z = posZ - dubinaPola + debljinaDaskePola;
	
	meshes.push(plane4);
	
	
	var cube5 = new THREE.BoxGeometry(sirina, dubina, debljinaDaske, 1, 1, 1);
	var plane5 = createMesh(cube5, "wood-2.jpg");
	plane5.rotation.x += PiPola;
	plane5.position.x = posX;
	plane5.position.y = posY + visina - debljinaDaske;	
	plane5.position.z = posZ;
	
	meshes.push(plane5);
	
	var geometry = mergeMeshes(meshes);
	var obj = createMesh(geometry, "wood-2.jpg");
	objects.push(obj);
	scene.add(obj);
		

}