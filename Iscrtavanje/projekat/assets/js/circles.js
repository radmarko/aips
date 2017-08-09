function Circles(radius){	

    var segments = 64;
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff } ),
    geometry = new THREE.CircleGeometry( radius, segments );

	//Remove center vertex
	geometry.vertices.shift();
    var blue  = new THREE.Line( geometry, material );
	blue.position.y += 5;
	blue.position.x += 20;
	scene.add( blue ) ;
	
	var material2 = new THREE.LineBasicMaterial( { color: 0x00ff00 } ),
    geometry2 = new THREE.CircleGeometry( radius, segments );
	geometry2.vertices.shift();
	var green = new THREE.Line( geometry2, material2 );
	green.rotation.y += Math.PI /2;
	green.position.y += 5;
	green.position.x += 20;
	scene.add( green);
	
	var material3 = new THREE.LineBasicMaterial( { color: 0xff0000 } ),
    geometry3 = new THREE.CircleGeometry( radius, segments );
	geometry3.vertices.shift();
	var red = new THREE.Line( geometry3, material3 );
	red.rotation.x += Math.PI /2;
	red.position.y += 5;
	red.position.x += 20;
	scene.add( red);
}