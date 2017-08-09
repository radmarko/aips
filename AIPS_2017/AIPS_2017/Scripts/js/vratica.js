function Vrata(sirina, visina, debljinaDaske, posX, posY, posZ){
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
	
	var radius = debljinaDaske;
	var widthSegments = 10;
	var heightSegments = 10;
	var phiStart = 0;
	var phiLength = Math.PI * 2;
	var thetaStart = 0;
	var thetaLength = Math.PI;
	var sph = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
	var sphere = createMesh( sph, "wood-2.jpg");
	
	sphere.position.x = posX + 2/5*sirina;
	sphere.position.y = posY;	
	sphere.position.z = posZ + debljinaDaske*1.33;
	//scene.add(sphere);
	meshes.push(sphere);
	
	var geometry = mergeMeshes(meshes);
	var obj = createMesh(geometry, "wood-2.jpg");
	objects.push(obj);
	scene.add(obj);

}