function Daska(sirina, visina, debljinaDaske, posX, posY, posZ){
	//daska 
	var meshes = [];
	
	var PiPola = 3.14/2;
	var cube = new THREE.BoxGeometry(sirina, visina, debljinaDaske, 1, 1, 1);
	var plane = createMesh(cube, "wood-2.jpg");
	plane.position.x = posX;
	plane.position.y = posY;	
	plane.position.z = posZ;
	
	//scene.add(plane);
	meshes.push(plane);
	
	var geometry = mergeMeshes(meshes);
	var obj = createMesh(geometry, "wood-2.jpg");
	objects.push(obj);
	scene.add(obj);

}