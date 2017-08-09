var scene = new THREE.Scene();
var camera;
var webGLRenderer = new THREE.WebGLRenderer();
var self = this;
var objects = [];
var clock;
var orbitControls;
var objectsOnScene = [];//ovo je niz objekata nasih klasa
var projector = new THREE.Projector();
var tube; //zrak
var controls;
var selectedObject;
var af;
var o;
var host = document.getElementById("WebGL-output");
var btn_upd = document.getElementById("btn_upd");

//draganddrop
var offset = new THREE.Vector3();
var plane;
function init(){
			
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
	//webGLRenderer.setSize(host.offsetWidth, window.innerHeight - 15);
	webGLRenderer.setSize(window.innerWidth, window.innerHeight  - 15);
	webGLRenderer.shadowMapEnabled = true;
	
	
	plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000, 18, 18), new THREE.MeshBasicMaterial({
		color: 0x00ff00,
		opacity: 0.25,
		transparent: true
	}));
	plane.visible = true;
	scene.add(plane);
		
	orbitControls = new THREE.OrbitControls(camera, host);
	clock = new THREE.Clock();
	orbitControls.update();
	
	camera.position.x = -20;
	camera.position.y = 30;
	camera.position.z = 40;
	camera.lookAt(new THREE.Vector3(10, 0, 0));
	
	addSpotLights();
	
	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mouseup', onmouseup, false);	
	
	
	document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);
		
	controls = new function () {
            this.showRay = true;
        };
		
		var gui = new dat.GUI();
        gui.add(controls, 'showRay').onChange(function (e) {
            if (tube) scene.remove(tube)
        });
	
	var floorTex = THREE.ImageUtils.loadTexture("../assets/textures/general/hardwood.png");
	var floor = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 0.1, 300), new THREE.MeshPhongMaterial({
		map: floorTex
	}));
	floor.rotation.x += 3.14/2;
	
	//zid1
	var wallTex = THREE.ImageUtils.loadTexture("../assets/textures/general/wallmap_yellow.png");
	var wall = new THREE.Mesh(new THREE.BoxGeometry(100, 5, 20, 300), new THREE.MeshPhongMaterial({
		map: wallTex
	}));
	
	wall.rotation.x += 3.14/2;
	wall.position.z += 50;
	wall.position.y += 10;
	
	//zid2
	var wall2 = new THREE.Mesh(new THREE.BoxGeometry(100, 5, 20, 300), new THREE.MeshPhongMaterial({
		map: wallTex
	}));
	
	wall2.rotation.x -= 3.14/2;
	wall2.position.z -= 50;
	wall2.position.y += 10;
	
	//zid3
	var wall3 = new THREE.Mesh(new THREE.BoxGeometry(100, 5, 20, 300), new THREE.MeshPhongMaterial({
		map: wallTex
	}));
	
	wall3.rotation.x -= 3.14/2;
	wall3.rotation.z += 3.14/2;
	wall3.position.x -= 50;
	wall3.position.y += 10;
	
	//zid4
	var wall4 = new THREE.Mesh(new THREE.BoxGeometry(100, 5, 20, 300), new THREE.MeshPhongMaterial({
		map: wallTex
	}));
	
	wall4.rotation.x -= 3.14/2;
	wall4.rotation.z += 3.14/2;
	wall4.position.x += 50;
	wall4.position.y += 10;
	
	scene.add(floor);
	//scene.add(wall);
	scene.add(wall2);
	scene.add(wall3);
	scene.add(wall4);
	
	var helper = new THREE.GridHelper( 500, 10 );
	helper.color1.setHex( 0x444444 );
	helper.color2.setHex( 0x444444 );
	scene.add( helper );
	
}	

function animate(){
	af = requestAnimationFrame(animate);
	
	webGLRenderer.render(scene, camera);
	var delta = clock.getDelta();
	orbitControls.update(delta);
}
	

function createMesh(geom, imageFile) {
		var texture = THREE.ImageUtils.loadTexture("../assets/textures/general/" + imageFile);
		var mat = new THREE.MeshPhongMaterial();
		mat.map = texture;

		var mesh = new THREE.Mesh(geom, mat);
		return mesh;
}

var el = document.getElementById("daska");    
el.addEventListener("click", addDaska, false);

function addDaska(){
	//daska 
	var d = new Daska(10, 10, 0.5, 0, 10, 30, "daska");
	d.Draw();
	objectsOnScene.push(d);
}

var kutija = document.getElementById("kutija");    
kutija.addEventListener("click", addKutija, false);

function addKutija(){
	var b = new Box(10, 4, 6,  0.7, 10, 10, 20, "box");	
	b.Draw();
	objectsOnScene.push(b);
}

var fioka = document.getElementById("fioka");    
fioka.addEventListener("click", addFioka, false);

function addFioka(){
	o = new Fioka(10, 3, 8,  1, 10, 10, 5, "fioka");
	o.Draw();
	objectsOnScene.push(o);
}

var vrata = document.getElementById("vrata");    
vrata.addEventListener("click", addVrata, false);

function addVrata(){
	var v = new Vrata(10, 7, 1, 0, 10, 7, "vrata");
	v.Draw();
	objectsOnScene.push(v);
}

function mergeMeshes (meshes) {
  var combined = new THREE.Geometry();

  for (var i = 0; i < meshes.length; i++) {
    meshes[i].updateMatrix();
    combined.merge(meshes[i].geometry, meshes[i].matrix);
  }

  return combined;
}



function addSpotLights(){
	var spotLight = new THREE.SpotLight(0xffffff);
	//spotLight.position.set(-10, 100, -20);
	spotLight.position.set(0, 100, 100);
	scene.add(spotLight);
	
	var spotLight1 = new THREE.SpotLight(0xffffff);
	//spotLight1.position.set(-10, 100, -20);
	spotLight1.position.set(0, 100, -100);
	//scene.add(spotLight1);
	
	var spotLight2 = new THREE.SpotLight(0xffffff);
	//spotLight2.position.set(-10, 100, -20);
	spotLight2.position.set(-100, 100, 0);
	scene.add(spotLight2);
	
	var spotLight3 = new THREE.SpotLight(0xffffff);
	//spotLight3.position.set(-10, 100, -20);
	spotLight3.position.set(100, 100, 0);
	//scene.add(spotLight3);
}

function onDocumentMouseDown(event) {
	var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1,0.5);
	//var vector = new THREE.Vector3((event.clientX / host.outerWidth) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1,0.5);
	
	vector = vector.unproject(camera);
	var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
	//var intersects = raycaster.intersectObjects([plane1, plane2, plane3, plane4, plane5]);
	var intersects = raycaster.intersectObjects(objects);
	if (intersects.length > 0) {
		/*
		intersects[ 0 ].object.material.transparent = true;
		intersects[ 0 ].object.material.opacity = 0.1;
		var name  = intersects[ 0 ].object.name;
		var o;
		for(var i = 0; i < objectsOnScene.length; i++)
		{
			if(objectsOnScene[i].name == name){
				o = objectsOnScene[i];
				break;
			}
		}
		*/
		orbitControls.enabled = false;
            // the first one is the object we'll be moving around
		selectedObject = intersects[0].object;
		// and calculate the offset
		var intersects = raycaster.intersectObject(plane);
		offset.copy(intersects[0].point).sub(plane.position);
		
		var name  = selectedObject.name;
		var o;
		for(var i = 0; i < objectsOnScene.length; i++)
		{
			if(objectsOnScene[i].name == name){
				o = objectsOnScene[i];
				break;
			}
		}
		
		document.getElementById("item-width").value = o.sirina; 
		document.getElementById("item-depth").value = o.dubina;
		document.getElementById("item-height").value = o.visina;
		document.getElementById("item-debljina").value = o.debljinaDaske;
		document.getElementById("context-menu-name").text = o.name;  		
		document.getElementById("item-posX").value = o.posX;
		document.getElementById("item-posY").value = o.posY;
		document.getElementById("item-posZ").value = o.posZ;		
		//$("#myModal").modal();
		
	}
}

function onDocumentMouseMove(event) {

		var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);

		vector = vector.unproject(camera);

		var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
		
		/*
		var intersects = raycaster.intersectObjects(objects);

		if (intersects.length > 0) {

			var points = [];
			points.push(new THREE.Vector3(-20, 30, 40));
			points.push(intersects[0].point);

			var mat = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 0.6});
			var tubeGeometry = new THREE.TubeGeometry(new THREE.SplineCurve3(points), 60, 0.1);

			if (tube) scene.remove(tube);
			
			if (controls.showRay)
			{
				tube = new THREE.Mesh(tubeGeometry, mat);
				scene.add(tube);
			}
			
		}*/
		
		
		 if (selectedObject) {
            // check the position where the plane is intersected
            var intersects = raycaster.intersectObject(plane);
            // reposition the selectedobject based on the intersection with the plane
            selectedObject.position.copy(intersects[0].point.sub(offset));
        } else {
            // if we haven't selected an object, we check if we might need
            // to reposition our plane. We need to do this here, since
            // we need to have this position before the onmousedown
            // to calculate the offset.
            var intersects = raycaster.intersectObjects(objects);
            if (intersects.length > 0) {
                // now reposition the plane to the selected objects position
                plane.position.copy(intersects[0].object.position);
                // and align with the camera.
                plane.lookAt(camera.position);
            }
       }
		
	event.preventDefault();
	
}


function onmouseup (event) {
        orbitControls.enabled = true; //orbitControls su za rotiranje
        selectedObject = null;
    }


init();
animate();


btn_upd.onclick = function(){
	
	var name = document.getElementById("context-menu-name").text;
	
	var o;
	for(var i = 0; i < objectsOnScene.length; i++)
	{
		if(objectsOnScene[i].name == name){
			o = objectsOnScene[i];
			objectsOnScene.splice(i, 1);
			break;
		}
	}
	
	var o2;
	if(name  == "fioka")
	{
		o2 = new Fioka();
		o2.sirina = parseFloat(document.getElementById("item-width").value);
		o2.dubina = parseFloat(document.getElementById("item-depth").value);
		o2.visina = parseFloat(document.getElementById("item-height").value);
		o2.debljinaDaske = parseFloat(document.getElementById("item-debljina").value);	
		o2.posX = parseFloat(document.getElementById("item-posX").value);
		o2.posY = parseFloat(document.getElementById("item-posY").value);
		o2.posZ = parseFloat(document.getElementById("item-posZ").value) ;		
		o2.name = name;  	
	}
	else if(name == "vrata"){
		o2 = new Vrata();
		o2.sirina = parseFloat(document.getElementById("item-width").value);
		o2.dubina = parseFloat(document.getElementById("item-depth").value);
		o2.visina = parseFloat(document.getElementById("item-height").value);
		o2.posX = parseFloat(document.getElementById("item-posX").value);
		o2.posY = parseFloat(document.getElementById("item-posY").value);
		o2.posZ = parseFloat(document.getElementById("item-posZ").value) ;		
		o2.name = name;  	
	}
	else if(name == "daska"){
		o2 = new Daska();
		o2.sirina = parseFloat(document.getElementById("item-width").value);
		o2.dubina = parseFloat(document.getElementById("item-depth").value);
		o2.visina = parseFloat(document.getElementById("item-height").value);
		o2.posX = parseFloat(document.getElementById("item-posX").value);
		o2.posY = parseFloat(document.getElementById("item-posY").value);
		o2.posZ = parseFloat(document.getElementById("item-posZ").value) ;		
		o2.name = name;  	
	}
	else {
		o2 = new Box();
		o2.sirina = parseFloat(document.getElementById("item-width").value);
		o2.dubina = parseFloat(document.getElementById("item-depth").value);
		o2.visina = parseFloat(document.getElementById("item-height").value);
		o2.debljinaDaske = parseFloat(document.getElementById("item-debljina").value);	
		o2.posX = parseFloat(document.getElementById("item-posX").value);
		o2.posY = parseFloat(document.getElementById("item-posY").value);
		o2.posZ = parseFloat(document.getElementById("item-posZ").value) ;		
		o2.name = name;  	
	}
		
	objectsOnScene.push(o2);
	
	var object = scene.getObjectByName(name);
	scene.remove(object);	
	o2.Draw();
}


window.addEventListener('resize', onResize, false);

function onResize() {
	camera.aspect = host.offsetWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	webGLRenderer.setSize(host.offsetWidth, window.innerHeight);
}