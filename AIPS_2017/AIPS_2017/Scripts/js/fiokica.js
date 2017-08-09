function fiokica(sirina, visina, dubina, debljinaDaske, posX, posY, posZ, name){
	//daska 
	var meshes = [];
	
	var sirinaPola = sirina/2;
	var visinaPola = visina/2;
	var dubinaPola = dubina/2;
	var debljinaDaskePola = debljinaDaske/2;
	var PiPola = 3.14/2;
	var cube = new THREE.BoxGeometry(sirina, dubina, debljinaDaske, 1, 1, 1);
	var plane = createMesh(cube, "wood-2.jpg");
	plane.rotation.x += PiPola;
	plane.position.x = posX;
	plane.position.y = posY;	
	plane.position.z = posZ;
	
	//scene.add(plane);
	meshes.push(plane);

	var cube2 = new THREE.BoxGeometry(visina, dubina, debljinaDaske, 1, 1, 1);
	var plane2 = createMesh(cube2, "wood-2.jpg");
	plane2.rotation.x += PiPola;
	plane2.rotation.y += PiPola;
	plane2.position.x = posX - sirinaPola;
	plane2.position.y = posY + visinaPola - debljinaDaskePola;	
	plane2.position.z = posZ;
	
	//scene.add(plane2);
	meshes.push(plane2);
	
	var cube3 = new THREE.BoxGeometry(visina, dubina, debljinaDaske, 1, 1, 1);
	var plane3 = createMesh(cube3, "wood-2.jpg");
	plane3.rotation.x += PiPola;
	plane3.rotation.y += PiPola;
	plane3.position.x = posX + sirinaPola;
	plane3.position.y = posY + visinaPola - debljinaDaske/2;	
	plane3.position.z = posZ;
	
	//scene.add(plane3);
	meshes.push(plane3);
	
	var cube4 = new THREE.BoxGeometry(sirina, visina, debljinaDaske, 1, 1, 1);
	var plane4 = createMesh(cube4, "wood-2.jpg");
	plane4.position.x = posX;
	plane4.position.y = posY + visinaPola - debljinaDaskePola;	
	plane4.position.z = posZ - dubinaPola + debljinaDaskePola;
	
	//scene.add(plane4);
	meshes.push(plane4);
	
	/*gornja
	var cube5 = new THREE.BoxGeometry(10, 7, 0.3, 1, 1, 1);
	var plane5 = createMesh(cube5, "wood-2.jpg");
	plane5.rotation.x += 3.14/2;
	plane5.position.x = 0.0;
	plane5.position.y = 10 + 3 - 0.3;	
	plane5.position.z = 15;
	
	scene.add(plane5);
	
*/

	var cube6 = new THREE.BoxGeometry(sirina * 1.05, visina *1.05, debljinaDaske, 1, 1, 1);
	var plane6 = createMesh(cube6, "wood-2.jpg");
	plane6.position.x = posX;
	plane6.position.y = posY + visinaPola - debljinaDaskePola;	
	plane6.position.z = posZ + dubinaPola - debljinaDaskePola;
	//scene.add(plane6);
	meshes.push(plane6);
	
	var radius = debljinaDaske;
	var widthSegments = 10;
	var heightSegments = 10;
	var phiStart = 0;
	var phiLength = Math.PI * 2;
	var thetaStart = 0;
	var thetaLength = Math.PI;
	var sph = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
	var sphere = createMesh( sph, "wood-2.jpg");
	
	sphere.position.x = posX;
	sphere.position.y = posY + visinaPola;	
	sphere.position.z = posZ + dubinaPola + debljinaDaske*1.33;
	//scene.add(sphere);
	meshes.push(sphere);
	
	var geometry = mergeMeshes(meshes);
	var obj = createMesh(geometry, "wood-2.jpg");
	obj.name = name;
	obj.id = "fioka12"
	objects.push(obj);
	scene.add(obj);

}