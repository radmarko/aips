var scene = new THREE.Scene();
var camera;
var webGLRenderer = new THREE.WebGLRenderer();
var self = this;
var objects = [];

//okretanje
var clock;
var orbitControls;

var objectsOnScene = [];//ovo je niz objekata nasih klasa
var projector = new THREE.Projector();
var tube; //zrak
var controls;
var selectedObject;
var af;
var selected;//selktovani objekat neke od nasih klasa
var host = document.getElementById("WebGL-output");
var btn_upd = document.getElementById("btn_upd");
var btn_del = document.getElementById("context-menu-delete");
//draganddrop
var offset = new THREE.Vector3();
var plane;

var red;
var green;
var blue;
var previousObject;
var meshes = [];

var startX = 0;
var startY = 10;
var startZ = -17;

var updX = startX;
var updY = startY;
var updZ = startZ;

var indexOfSelected = 0;

var inc = 0;

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
	plane.visible = false;
	scene.add(plane);
		
	orbitControls = new THREE.OrbitControls(camera, host);
	clock = new THREE.Clock();
	orbitControls.update();
	
	camera.position.x = -20;
	camera.position.y = 30;
	camera.position.z = 40;
	camera.lookAt(new THREE.Vector3(0, 0, 50));
	
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
	wall2.position.z -= 22.5;
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
	
	/*floor.position.y  -= 20;
	wall2.position.y  -= 20;
	wall3.position.y  -= 20;
	wall4.position.y  -= 20;*/
	scene.add(floor);
	//scene.add(wall);
	scene.add(wall2);
	scene.add(wall3);
	scene.add(wall4);
	
	var helper = new THREE.GridHelper( 500, 10 );
	helper.color1.setHex( 0x444444 );
	helper.color2.setHex( 0x444444 );
	//scene.add( helper );
	
	
	//circles(5);
	
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

/*
var el = document.getElementById("daska");    
el.addEventListener("click", addDaska, false);

function addDaska(){
	//daska 
	var d = new Daska(10, 10, 0.5, 0, 0, 0, "daska");
	d.Draw();
	objectsOnScene.push(d);
}
*/
var kutija = document.getElementById("kutija");    
kutija.addEventListener("click", addKutija, false);

function addKutija(){
	var b = new Box(10, 4, 6,  0.7, startX, startY, startZ, "box" + inc);	
	b.Draw();
	objectsOnScene.push(b);
	inc++;
	kutija.disabled = true;
}

var fioka = document.getElementById("fioka");    
fioka.addEventListener("click", addFioka, false);

function addFioka(){
	/*o = new Fioka(selected.sirina, selected.visina, selected.dubina, selected.debljinaDaske, selected.posX, selected.posY, selected.posZ, "fioka");
	o.Draw();
	objectsOnScene.push(o);*/
	var cont = document.getElementById("FiokeContainer");
	cont.innerHTML = "";
	for(var i = 1; i <= selected.childs.length + 1; i++){
			$("<div><input type='checkbox' name='fioke' value='" + i + "'>" + i + "<br> </div>").appendTo(cont);	
	}
}

var vrata = document.getElementById("vrata");    
vrata.addEventListener("click", addVrata, false);

function addVrata(){
	/*var v = new Vrata(10, 7, 1, 0, 0, 0, "vrata");
	v.Draw();
	objectsOnScene.push(v);*/
	var cont = document.getElementById("VrataContainer");
	cont.innerHTML = "";
	for(var i = 1; i <= selected.childs.length + 1; i++){
			$("<div><input type='checkbox' name='vrata' value='" + i + "'>" + i + "<br> </div>").appendTo(cont);	
	}
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
		
		for(var i = 0; i < objectsOnScene.length; i++)
		{
			if(objectsOnScene[i].name == name){
				selected = objectsOnScene[i];
				indexOfSelected = i;
				break;
			}
		}
		
		document.getElementById("item-width").value = selected.sirina; 
		document.getElementById("item-depth").value = selected.dubina;
		document.getElementById("item-height").value = selected.visina;
		document.getElementById("item-debljina").value = selected.debljinaDaske;
		document.getElementById("context-menu-name").text = selected.name;  		
		document.getElementById("item-posX").value = selected.posX;
		document.getElementById("item-posY").value = selected.posY;
		document.getElementById("item-posZ").value = selected.posZ;		
		//$("#myModal").modal();
		
	}
	/*else{
		var intersects = raycaster.intersectObjects([red]);
		if(intersects.length > 0){
				previousObject.rotation.z += 3.14/2;
		}
		
		var intersects = raycaster.intersectObjects([green]);
		if(intersects.length > 0){
				previousObject.rotation.x += 3.14/2;
		}
		
		var intersects = raycaster.intersectObjects([blue]);
		if(intersects.length > 0){
				previousObject.rotation.y += 3.14/2;
		}
	}*/
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
			
		}
		*/
		
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
                //plane.lookAt(camera.position);
            }
       }
		
	event.preventDefault();
	
}


function onmouseup (event) {
		
		if(selectedObject != null){
		document.getElementById("item-posX").value = selectedObject.position.x;
		document.getElementById("item-posY").value = selectedObject.position.y;
		document.getElementById("item-posZ").value = selectedObject.position.z;	
		
		selected.posX = selectedObject.position.x;
		selected.posY = selectedObject.position.y;
		selected.posZ = selectedObject.position.z;
		
		var name = selected.name;
		
		//brise iz niza na sceni zbog promenjene pozicije
		var o;
		for(var i = 0; i < objectsOnScene.length; i++)
		{
			if(objectsOnScene[i].name == name){
				o = objectsOnScene[i];
				objectsOnScene.splice(i, 1);
				break;
			}
		}
		
		//dodaje azurirani
		objectsOnScene.push(selected);
	
		//var rad = radius(selected.sirina/2, selected.visina/2, selected.dubina/2);
		
		/*scene.remove(red);
		scene.remove(green);
		scene.remove(blue);
		circles(rad, selected.posX, selected.posY, selected.posZ);
		*/
        orbitControls.enabled = true; //orbitControls su za rotiranje
		previousObject = selectedObject;
        selectedObject = null;
    }
}

init();
animate();


btn_upd.onclick = function(){
	
	var o;
	for(var i = 0; i < objectsOnScene.length; i++)
	{
		if(objectsOnScene[i].name == previousObject.name){
			o = objectsOnScene[i];
			objectsOnScene.splice(i, 1);
			break;
		}
	}
	scene.remove(previousObject);
	
	selected.sirina = parseFloat(document.getElementById("item-width").value);
	selected.visina = parseFloat(document.getElementById("item-height").value);
	selected.dubina = parseFloat(document.getElementById("item-depth").value);
	selected.debljinaDaske = parseFloat(document.getElementById("item-debljina").value);
	
	var pomerajX = selected.posX;
	var pomerajY = selected.posY;
	var pomerajZ = selected.posZ;
	
	selected.posX += selected.globalX;
	selected.posY += selected.globalY;
	selected.posZ += selected.globalZ;
	
	selected.globalX += pomerajX;
	selected.globalY += pomerajY;
	selected.globalZ+= pomerajZ;
	
	var obj = selected.CreateGeometry();
	
	scene.add(obj);
	objects.push(obj);
	
	objectsOnScene.push(selected);
}

btn_del.onclick = function(){
	
	var name = previousObject.name;
	
	var o;
	for(var i = 0; i < objectsOnScene.length; i++)
	{
		if(objectsOnScene[i].name == name){
			o = objectsOnScene[i];
			objectsOnScene.splice(i, 1);
			break;
		}
	}
	
	/*scene.remove(red);
	scene.remove(green);
	scene.remove(blue);*/
	scene.remove(previousObject);
}

window.addEventListener('resize', onResize, false);

function onResize() {
	camera.aspect = host.offsetWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	webGLRenderer.setSize(host.offsetWidth, window.innerHeight);
}

function radius(x, y , z){
	return Math.sqrt(x*x + y*y + z*z);
}


function circles(radius, posX, posY, posZ){	

	radius *= 1.1;
    var segments = 64;
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff } ),
    geometry = new THREE.CircleGeometry( radius, segments );

	//Remove center vertex
	geometry.vertices.shift();
    blue  = new THREE.Line( geometry, material );
	blue.position.y = posY;
	blue.position.x = posX;
	blue.position.z = posZ;
	scene.add( blue ) ;
	
	var material2 = new THREE.LineBasicMaterial( { color: 0x00ff00 } ),
    geometry2 = new THREE.CircleGeometry( radius, segments );
	geometry2.vertices.shift();
	green = new THREE.Line( geometry2, material2 );
	green.rotation.y += Math.PI /2;
	green.position.y = posY;
	green.position.x = posX;
	green.position.z = posZ;
	scene.add( green);
	
	var material3 = new THREE.LineBasicMaterial( { color: 0xff0000 } ),
    geometry3 = new THREE.CircleGeometry( radius, segments );
	geometry3.vertices.shift();
	red = new THREE.Line( geometry3, material3 );
	red.rotation.x += Math.PI /2;
	red.position.y = posY;
	red.position.x = posX;
	red.position.z = posZ;
	scene.add( red);
}

function dodajPregrade(){
	var brojPregrada = document.getElementById("brojPregrada").value;
	var pregradeVertikalno = document.getElementById("pregradeVertikalno").checked;

	var o;
	for(var i = 0; i < objectsOnScene.length; i++)
	{
		if(objectsOnScene[i].name == name){
			o = objectsOnScene[i];
			objectsOnScene.splice(i, 1);
			break;
		}
	}
	
	if(pregradeVertikalno == true){
		var i  = selected.sirina / brojPregrada;
		for(var k = 0; k < brojPregrada - 1; k++){
			//var d = new Daska(selected.debljinaDaske, selected.visina, selected.dubina, - selected.sirina / 2 + (k + 1) * i + startX, startY, startZ, "daska" + k);
			var d = new Daska(selected.debljinaDaske, selected.visina, selected.dubina, - selected.sirina / 2 + (k + 1) * i + selected.globalX, selected.globalY, selected.globalZ, "daska" + k);
			var mesh  = d.CreateGeometry();
			//objectsOnScene.push(d);
			//var ob = scene.getObjectByName("daska" + k);
			//meshes.push(mesh);
			previousObject.add(mesh);
			selected.childs.push(d);
		}
		selected.vertikalno = true;
	}
	else{
		var i  = selected.visina / brojPregrada;
		for(var k = 0; k < brojPregrada - 1; k++){
			//var d = new Daska(selected.sirina, selected.debljinaDaske, selected.dubina, startX, - selected.visina / 2 + (k + 1) * i + startY, startZ, "daska" + k);
			var d = new Daska(selected.sirina, selected.debljinaDaske, selected.dubina, selected.globalX, - selected.visina / 2 + (k + 1) * i + selected.globalY, selected.globalZ, "daska" + k);
			var mesh  = d.CreateGeometry();
			//objectsOnScene.push(d);
			//var ob = scene.getObjectByName("daska" + k);
			//	meshes.push(mesh);
			previousObject.add(mesh);
			selected.childs.push(d);
		}
		selected.vertikalno = false;
	}
	
	objectsOnScene.push(selected);
	
}

$(document).on("click", "#dodajPregrade", function(event){
        dodajPregrade(); 
}); 


function dodajFioke(){

	var o;
	for(var i = 0; i < objectsOnScene.length; i++)
	{
		if(objectsOnScene[i].name == name){
			o = objectsOnScene[i];
			objectsOnScene.splice(i, 1);
			break;
		}
	}

	var tmp = [];
	
	
	if(selected.vertikalno){
		var duz = selected.sirina / (selected.childs.length + 1);
		var cont = document.getElementById("FiokeContainer");
		var checks =  cont.childNodes;
		
		var start = - selected.sirina / 2 + duz / 2;
		//var start = previousObject.position.x - selected.sirina / 2 + duz / 2
		for(var i = 0; i < selected.childs.length + 1; i++){
			if(checks[i].firstChild.checked == true){
				//var f = new Fioka(duz, selected.visina, selected.dubina, selected.debljinaDaske, start + (i * duz) + startX, startY, startZ, "Fioka" + i);
				var f = new Fioka(duz, selected.visina, selected.dubina, selected.debljinaDaske, start + (i * duz) + selected.globalX, selected.globalY, selected.globalZ, "Fioka" + i);
				var mesh = f.CreateGeometry();
				//var obj = createMesh(mesh, "wood-2.jpg");
				previousObject.add(mesh);
				//meshes.push(mesh);
				tmp[i] = checks[i].firstChild.checked;
				selected.fioke.push(f);
			}
		}
	}
	else{
		var duz = selected.visina / (selected.childs.length + 1);
		var cont = document.getElementById("FiokeContainer");
		var checks =  cont.childNodes;
		
		var start = selected.visina / 2 - duz / 2;
		//var start = previousObject.position.x - selected.sirina / 2 + duz / 2
		for(var i = 0; i < selected.childs.length + 1; i++){
			if(checks[i].firstChild.checked == true){
				//var f = new Fioka(duz, selected.visina, selected.dubina, selected.debljinaDaske, start + (i * duz) + startX, startY, startZ, "Fioka" + i);
				var f = new Fioka(selected.sirina, duz, selected.dubina, selected.debljinaDaske, selected.globalX, start - (i * duz) +  selected.globalY, selected.globalZ, "Fioka" + i);
				var mesh = f.CreateGeometry();
				//var obj = createMesh(mesh, "wood-2.jpg");
				previousObject.add(mesh);
				//meshes.push(mesh);
				tmp[i] = checks[i].firstChild.checked;
				selected.fioke.push(f);
			}
		}
		
	}
	selected.pozicije_fioka = tmp;
	
	objectsOnScene.push(selected);
} 

$(document).on("click", "#dodajFioke", function(event){
        dodajFioke(); 
}); 

function dodajVrata(){
	
	var o;
	for(var i = 0; i < objectsOnScene.length; i++)
	{
		if(objectsOnScene[i].name == name){
			o = objectsOnScene[i];
			objectsOnScene.splice(i, 1);
			break;
		}
	}
	
	var tmp = [];
	if(selected.vertikalno){
		var duz = selected.sirina / (selected.childs.length + 1);
		var cont = document.getElementById("VrataContainer");
		var checks =  cont.childNodes;

		var start = - selected.sirina / 2 + duz / 2;
		for(var i = 0; i < selected.childs.length + 1; i++){
			if(checks[i].firstChild.checked == true){
				//var v = new Vrata(duz, selected.visina, selected.debljinaDaske, start + (i * duz) + startX, startY,  startZ + selected.dubina / 2 - selected.debljinaDaske / 2, "Vrata" + i);
				var v = new Vrata(duz, selected.visina, selected.debljinaDaske, start + (i * duz) + selected.globalX, selected.globalY,  selected.globalZ + selected.dubina / 2 - selected.debljinaDaske / 2, "Vrata" + i);
				var mesh = v.CreateGeometry();
				//meshes.push(mesh);
				previousObject.add(mesh);
				tmp[i] = checks[i].firstChild.checked;
				selected.vrata.push(v);
			}
		}
	
	}
	else{
		var duz = selected.visina / (selected.childs.length + 1);
		var cont = document.getElementById("VrataContainer");
		var checks =  cont.childNodes;

		var start = selected.visina / 2 - duz / 2;
		for(var i = 0; i < selected.childs.length + 1; i++){
			if(checks[i].firstChild.checked == true){
				//var v = new Vrata(duz, selected.visina, selected.debljinaDaske, start + (i * duz) + startX, startY,  startZ + selected.dubina / 2 - selected.debljinaDaske / 2, "Vrata" + i);
				var v = new Vrata(selected.sirina, duz, selected.debljinaDaske, selected.globalX, start - (i * duz) + selected.globalY,  selected.globalZ + selected.dubina / 2 - selected.debljinaDaske / 2, "Vrata" + i);
				var mesh = v.CreateGeometry();
				//meshes.push(mesh);
				previousObject.add(mesh);
				tmp[i] = checks[i].firstChild.checked;
				selected.vrata.push(v);
			}
		}
	}
	selected.pozicije_vrata = tmp;
	
	objectsOnScene.push(selected);
} 

$(document).on("click", "#dodajVrata", function(event){
        dodajVrata(); 
});

function createScene(){
	for(var i = 0; i < objectsOnScene.length; i++){
		var obj = objectsOnScene[i].CreateGeometry();
		obj.position.x += objectsOnScene[i].globalX;
		obj.position.y += objectsOnScene[i].globalY;
		obj.position.z += objectsOnScene[i].globalZ;
		objects.push(obj);
		scene.add(obj);
	}
} 

$(document).on("click", "#kreiraj", function(event){
        createScene();
});

/*
var event = $(document).click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
});

// disable right click
$(document).bind('contextmenu', function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
});
*/

$(document).on("click", "#new_texture", function(event){
	
		var o;
		for(var i = 0; i < objectsOnScene.length; i++)
		{
			if(objectsOnScene[i].name == previousObject.name){
				o = objectsOnScene[i];
				objectsOnScene.splice(i, 1);
				break;
			}
		}
		scene.remove(previousObject);
		
		var img_src = document.getElementById("new_texture").src;
		var niz = img_src.split("/");
		var tex = niz[niz.length - 1];
        selected.texture = tex;
		
		var pomerajX = selected.posX;
		var pomerajY = selected.posY;
		var pomerajZ = selected.posZ;
		
		selected.posX += selected.globalX;
		selected.posY += selected.globalY;
		selected.posZ += selected.globalZ;
		
		selected.globalX += pomerajX;
		selected.globalY += pomerajY;
		selected.globalZ+= pomerajZ;
		
		var obj = selected.CreateGeometry();
		scene.add(obj);
		objects.push(obj);
		
		objectsOnScene.push(selected);
});
