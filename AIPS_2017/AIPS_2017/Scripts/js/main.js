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
var startY = 0;
var startZ = 0;

var updX = startX;
var updY = startY;
var updZ = startZ;

var indexOfSelected = 0;

var inc = 0;

var mousedownEvent;
var mouseupEvent;
var mousemoveEvent;

var blockedClicks = false;

var aspect = host.offsetWidth / window.innerHeight;

var prevPosX = 0;
var prevPosY = 0;
var prevPosZ = 0;


function init() {

    //stopClicks();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    //webGLRenderer.setSize(host.offsetWidth, window.innerHeight - 15);
    webGLRenderer.setSize(window.innerWidth, window.innerHeight - 15);
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

    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 100;
    camera.lookAt(new THREE.Vector3(0, 10, 0));

    addSpotLights();

    //document.addEventListener('mousedown', onDocumentMouseDown, false);
    //document.addEventListener('mousemove', onDocumentMouseMove, false);
    //document.addEventListener('mouseup', onmouseup, false);


    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    controls = new function () {
        this.showRay = true;
    };

    var gui = new dat.GUI();
    gui.add(controls, 'showRay').onChange(function (e) {
        if (tube) scene.remove(tube)
    });

    var floorTex = THREE.ImageUtils.loadTexture("/Content/textures/general/hardwood.png");
    var floor = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 0.1, 300), new THREE.MeshPhongMaterial({
        map: floorTex
    }));
    floor.rotation.x += 3.14 / 2;
    floor.position.z += 25;
    //zid1
    var wallTex = THREE.ImageUtils.loadTexture("/Content/textures/general/wallmap_yellow.png");
    var wall = new THREE.Mesh(new THREE.BoxGeometry(100, 5, 30, 300), new THREE.MeshPhongMaterial({
        map: wallTex
    }));

    wall.rotation.x += 3.14 / 2;
    wall.position.z += 50;
    wall.position.y += 15;

    //zid2
    var wall2 = new THREE.Mesh(new THREE.BoxGeometry(100, 5, 30, 300), new THREE.MeshPhongMaterial({
        map: wallTex
    }));

    wall2.rotation.x -= 3.14 / 2;
    wall2.position.z -= 23.5;
    wall2.position.y += 15;

    //zid3
    var wall3 = new THREE.Mesh(new THREE.BoxGeometry(100, 5, 30, 300), new THREE.MeshPhongMaterial({
        map: wallTex
    }));

    wall3.rotation.x -= 3.14 / 2;
    wall3.rotation.z += 3.14 / 2;
    wall3.position.x -= 50;
    wall3.position.y += 15;
    wall3.position.z += 25;

    //zid4
    var wall4 = new THREE.Mesh(new THREE.BoxGeometry(100, 5, 30, 300), new THREE.MeshPhongMaterial({
        map: wallTex
    }));

    wall4.rotation.x -= 3.14 / 2;
    wall4.rotation.z += 3.14 / 2;
    wall4.position.x += 50;
    wall4.position.y += 15;
    wall4.position.z += 25;

	/*floor.position.y  -= 20;
	wall2.position.y  -= 20;
	wall3.position.y  -= 20;
	wall4.position.y  -= 20;*/
    floor.position.y -= 10;
    floor.position.z += 17;

    wall2.position.y -= 10;
    wall2.position.z += 17;

    wall3.position.y -= 10;
    wall3.position.z += 17;

    wall4.position.y -= 10;
    wall4.position.z += 17;

    camera.position.y -= 10;
    camera.position.z += 17;
    scene.add(floor);
    //scene.add(wall);
    scene.add(wall2);
    scene.add(wall3);
    scene.add(wall4);

    var helper = new THREE.GridHelper(500, 10);
    helper.color1.setHex(0x444444);
    helper.color2.setHex(0x444444);
    //scene.add( helper );


    //circles(5);

}

function animate() {
    af = requestAnimationFrame(animate);

    webGLRenderer.render(scene, camera);
    var delta = clock.getDelta();
    //orbitControls.update(delta);
}



function createMesh(geom, imageFile) {
    var Texture = THREE.ImageUtils.loadTexture("/Content/textures/general/" + imageFile);
    var mat = new THREE.MeshPhongMaterial();
    mat.map = Texture;

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
//var kutija = document.getElementById("kutija");
//kutija.addEventListener("click", addKutija, false);

function Moze(b) {
    var moze = true;

    for (var i = 0; i < objectsOnScene.length; i++) {
        if (sekuSe(b, objectsOnScene[i]))
            moze = false;
    }

    return moze;
}

function addKutija() {
    var b = new Box(10, 4, 6, 0.7, startX, startY, startZ, "box" + inc);
    

    while (!Moze(b)) {
        b.PositionX += 10;
    }
 

    b.Draw();
    objectsOnScene.push(b);
    inc++;
    kutija.disabled = true;
}

//var fioka = document.getElementById("fioka");
//fioka.addEventListener("click", addFioka, false);

function addFioka() {
	/*o = new Fioka(selected.sirina, selected.visina, selected.dubina, selected.debljinaDaske, selected.posX, selected.posY, selected.posZ, "fioka");
	o.Draw();
	objectsOnScene.push(o);*/
    var cont = document.getElementById("FiokeContainer");
    cont.innerHTML = "";
    for (var i = 1; i <= selected.childs.length + 1; i++) {
        $("<div><input type='checkbox' name='fioke' value='" + i + "'>" + i + "<br> </div>").appendTo(cont);
    }
}

//var vrata = document.getElementById("vrata");
//vrata.addEventListener("click", addVrata, false);

function addVrata() {
	/*var v = new nizVrata(10, 7, 1, 0, 0, 0, "nizVrata");
	v.Draw();
	objectsOnScene.push(v);*/
    var cont = document.getElementById("VrataContainer");
    cont.innerHTML = "";
    for (var i = 1; i <= selected.childs.length + 1; i++) {
        $("<div><input type='checkbox' name='vrata' value='" + i + "'>" + i + "<br> </div>").appendTo(cont);
    }
}

function mergeMeshes(meshes) {
    var combined = new THREE.Geometry();

    for (var i = 0; i < meshes.length; i++) {
        meshes[i].updateMatrix();
        combined.merge(meshes[i].geometry, meshes[i].matrix);
    }

    return combined;
}



function addSpotLights() {
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
    //if (blockedClicks) {
    //    mousedownEvent = event;
    //    event.stopPropagation();
    //    event.preventDefault();
    //    event.stopImmediatePropagation();
    //}
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    //var vector = new THREE.Vector3((event.clientX / host.outerWidth) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1,0.5);

    vector = vector.unproject(camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    //var intersects = raycaster.intersectObjects([plane1, plane2, plane3, plane4, plane5]);


    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
		/*
		intersects[ 0 ].object.material.transparent = true;
		intersects[ 0 ].object.material.opacity = 0.1;
		var Name  = intersects[ 0 ].object.Name;
		var o;
		for(var i = 0; i < objectsOnScene.length; i++)
		{
			if(objectsOnScene[i].Name == Name){
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

        var Name = selectedObject.Name;

        for (var i = 0; i < objectsOnScene.length; i++) {
            if (objectsOnScene[i].Name == Name) {
                selected = objectsOnScene[i];
                indexOfSelected = i;
                break;
            }
        }

        document.getElementById("item-width").value = selected.Width;
        document.getElementById("item-depth").value = selected.Depth;
        document.getElementById("item-height").value = selected.Height;
        document.getElementById("item-debljina").value = selected.BoardThickness;
        document.getElementById("context-menu-name").text = selected.Name;
        //document.getElementById("item-posX").value = selected.PositionX;
        //document.getElementById("item-posY").value = selected.PositionY;
        //document.getElementById("item-posZ").value = selected.PositionZ;
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

//start ObjectMouseDown
function ObjectMouseDown(x, y) {
    x = x * host.offsetWidth;
    y = y * window.innerHeight; 

    //if (blockedClicks) {
    //    mousedownEvent = event;
    //    event.stopPropagation();
    //    event.preventDefault();
    //    event.stopImmediatePropagation();
    //}

    var vector = new THREE.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.5);
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

        prevPosX = selectedObject.position.x;
        prevPosY = selectedObject.position.y;
        prevPosZ = selectedObject.position.z;
        // and calculate the offset
        var intersects = raycaster.intersectObject(plane);
        offset.copy(intersects[0].point).sub(plane.position);

        var name = selectedObject.Name;

        for (var i = 0; i < objectsOnScene.length; i++) {
            if (objectsOnScene[i].Name == name) {
                selected = objectsOnScene[i];
                indexOfSelected = i;
                break;
            }
        }

        document.getElementById("item-width").value = selected.Width;
        document.getElementById("item-depth").value = selected.Depth;
        document.getElementById("item-height").value = selected.Height;
        document.getElementById("item-debljina").value = selected.BoardThickness;
        document.getElementById("context-menu-name").text = selected.Name;
        //document.getElementById("item-posX").value = selected.PositionX;
        //document.getElementById("item-posY").value = selected.PositionY;
        //document.getElementById("item-posZ").value = selected.PositionZ;
        //$("#myModal").modal();

    }
    /*else {
        var intersects = raycaster.intersectObjects([red]);
        if (intersects.length > 0) {
            previousObject.rotation.z += 3.14 / 2;
        }

        var intersects = raycaster.intersectObjects([green]);
        if (intersects.length > 0) {
            previousObject.rotation.x += 3.14 / 2;
        }

        var intersects = raycaster.intersectObjects([blue]);
        if (intersects.length > 0) {
            previousObject.rotation.y += 3.14 / 2;
        }
    }*/
}
//end ObjectMouseDown

function onDocumentMouseMove(event) {

    //if (blockedClicks) {
    //    mousemoveEvent = event;
    //    event.stopPropagation();
    //    event.preventDefault();
    //    event.stopImmediatePropagation();
    //}
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);

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

//start ObjectMouseMove
function ObjectMouseMove(x, y) {
    x = x * host.offsetWidth;
    y = y * window.innerHeight; 

    //if (blockedClicks) {
    //    mousemoveEvent = event;
    //    event.stopPropagation();
    //    event.preventDefault();
    //    event.stopImmediatePropagation();
    //}

    var vector = new THREE.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.5);

    vector = vector.unproject(camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    
    var intersects = raycaster.intersectObjects(objects);

    //if (intersects.length > 1) {

    //    var points = [];
    //    points.push(new THREE.Vector3(-20, 30, 40));
    //    points.push(intersects[0].point);

    //    var mat = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 0.6});
    //    var tubeGeometry = new THREE.TubeGeometry(new THREE.SplineCurve3(points), 60, 0.1);

    //    if (tube) scene.remove(tube);
    	
    //    if (controls.showRay)
    //    {
    //        tube = new THREE.Mesh(tubeGeometry, mat);
    //        scene.add(tube);
    //    }
    	
    //}
    

    if (selectedObject) {
        // check the position where the plane is intersected
        var intersects = raycaster.intersectObject(plane);
        // reposition the selectedobject based on the intersection with the plane
        selectedObject.position.copy(intersects[0].point.sub(offset));
        //var intersects = raycaster.intersectObject(plane);
        // reposition the selectedobject based on the intersection with the plane
        //var novox = intersects[0].point.sub(offset).x;
        //var novoy = intersects[0].point.sub(offset).y;
        //if (novox + (selected.Width / 2) > 40 || novox - (selected.Width / 2) < -40)
        //    return;

        //if (novoy + (selected.Height / 2) > 20 || novoy - (selected.Height) < -10)
        //    return;
        //selectedObject.position.copy(intersects[0].point.sub(offset));







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
//end ObjectMouseMove

function onmouseup(event) {

    //if (blockedClicks) {
    //    mouseupEvent = event;
    //    event.stopPropagation();
    //    event.preventDefault();
    //    event.stopImmediatePropagation();
    //}

    if (selectedObject != null) {
        //document.getElementById("item-posX").value = selectedObject.position.x;
        //document.getElementById("item-posY").value = selectedObject.position.y;
        //document.getElementById("item-posZ").value = selectedObject.position.z;

        selected.PositionX = selectedObject.position.x;
        selected.PositionY = selectedObject.position.y;
        selected.PositionZ = selectedObject.position.z;

        var Name = selected.Name;

        //brise iz niza na sceni zbog promenjene pozicije
        var o;
        for (var i = 0; i < objectsOnScene.length; i++) {
            if (objectsOnScene[i].Name == Name) {
                o = objectsOnScene[i];
                objectsOnScene.splice(i, 1);
                break;
            }
        }

        //dodaje azurirani
        objectsOnScene.push(selected);


        addFioka();
        addVrata();
        
        //var rad = radius(selected.Width/2, selected.Height/2, selected.Depth/2);

		/*scene.remove(red);
		scene.remove(green);
		scene.remove(blue);
		circles(rad, selected.PositionX, selected.PositionY, selected.PositionZ);
		*/
        orbitControls.enabled = true; //orbitControls su za rotiranje
        previousObject = selectedObject;
        selectedObject = null;
    }
}

//start ObjectMouseUp
function ObjectMouseUp(x, y) {
    x = x * host.offsetWidth;
    y = y * window.innerHeight; 

    //if (blockedClicks) {
    //    mouseupEvent = event;
    //    event.stopPropagation();
    //    event.preventDefault();
    //    event.stopImmediatePropagation();
    //}

    if (selectedObject == null) return;
    //document.getElementById("item-posX").value = selectedObject.position.x;
    //document.getElementById("item-posY").value = selectedObject.position.y;
    //document.getElementById("item-posZ").value = selectedObject.position.z;

    //pozicije pre pomeranja
    var oldPositionX = selected.PositionX;
    var oldPositionY = selected.PositionY;
    var oldPositionZ = selected.PositionZ;

    var temp = new Box(selected.Width, selected.Height, selected.Depth, selected.BoardThickness, selected.PositionX, selected.PositionY, selected.PositionZ, selected.Name);
    //selectedObject - azurirran objekt
    temp.PositionX = selectedObject.position.x;
    temp.PositionY = selectedObject.position.y;
    temp.PositionZ = selectedObject.position.z;

    var name = selected.Name;
    var mogucePomeriti = true;

    //brise iz niza na sceni

    for (var i = 0; i < objectsOnScene.length; i++) {
        if (objectsOnScene[i].Name != name)  {
            if (sekuSe(temp, objectsOnScene[i]) == true)
                mogucePomeriti = false;
        }
    }

    var o;
    for (var i = 0; i < objectsOnScene.length; i++) {
        if (objectsOnScene[i].Name == name) {
            o = objectsOnScene[i];
            objectsOnScene.splice(i, 1);
            break;
        } 
    }

    if (mogucePomeriti == false) 
    {
        selectedObject.position.x = prevPosX;
        selectedObject.position.y = prevPosY;
        selectedObject.position.z = prevPosZ;
    }

    selected.PositionX = selectedObject.position.x;
    selected.PositionY = selectedObject.position.y;
    selected.PositionZ = selectedObject.position.z;

    //dodaje azurirani
    objectsOnScene.push(selected);

    addFioka();
    addVrata();
    /*var rad = radius(selected.sirina / 2, selected.visina / 2, selected.dubina / 2);

    scene.remove(red);
    scene.remove(green);
    scene.remove(blue);
    circles(rad, selected.posX, selected.posY, selected.posZ);*/

    //desno
    if (selectedObject.position.x + selected.Width / 2 > 45)
    {
        selectedObject.position.x = 45 - selected.Width / 2;
    }

    //levo
    if (selectedObject.position.x - selected.Width / 2 < -45)
    {
        selectedObject.position.x = -45 + selected.Width / 2;
    }

    //gore
    if (selectedObject.position.y + selected.Height / 2 > 20)
    {
        selectedObject.position.y = 20 - selected.Height / 2;
    }

    //dole
    if (selectedObject.position.y - selected.Height / 2 < -10)
    {
        selectedObject.position.y = -10 + selected.Height / 2;
    }





    orbitControls.enabled = true; //orbitControls su za rotiranje
    previousObject = selectedObject;
    selectedObject = null;
}
//end ObjectMouseUp

init();
animate();


//btn_upd.onclick = function () {

//    var o;
//    for (var i = 0; i < objectsOnScene.length; i++) {
//        if (objectsOnScene[i].Name == previousObject.Name) {
//            o = objectsOnScene[i];
//            objectsOnScene.splice(i, 1);
//            objects.splice(i, 1);
//            break;
//        }
//    }
//    scene.remove(previousObject);

//    selected.Width = parseFloat(document.getElementById("item-width").value);
//    selected.Height = parseFloat(document.getElementById("item-height").value);
//    selected.Depth = parseFloat(document.getElementById("item-depth").value);
//    selected.BoardThickness = parseFloat(document.getElementById("item-debljina").value);

//    var pomerajX = selected.PositionX;
//    var pomerajY = selected.PositionY;
//    var pomerajZ = selected.PositionZ;

//    selected.PositionX += selected.globalX;
//    selected.PositionY += selected.globalY;
//    selected.PositionZ += selected.globalZ;

//    selected.globalX += pomerajX;
//    selected.globalY += pomerajY;
//    selected.globalZ += pomerajZ;

//    var obj = selected.CreateGeometry();

//    scene.add(obj);
//    objects.push(obj);

//    objectsOnScene.push(selected);
//}


function updateBox(width, height, depth, debljina) {


    for (var i = 0; i < objectsOnScene.length; i++) {
        if (objectsOnScene[i].Name == previousObject.Name) {
            objectsOnScene.splice(i, 1);
            break;
        }
    }

    for (var i = 0; i < objects.length; i++) {
        if (objects[i].Name == previousObject.Name) {
            objects.splice(i, 1);
            break;
        }
    }
    //scene.remove(previousObject);

    var ratioWidth = width / selected.originalWidth;
    var ratioHeight = height / selected.originalHeight;
    var ratioDepth = depth / selected.originalDepth;

    selected.Width = width;
    selected.Height = height;
    selected.Depth = depth;

    //observer
    selected.PropagateChange();

    previousObject.scale.x = ratioWidth;
    previousObject.scale.y = ratioHeight;
    previousObject.scale.z = ratioDepth;
    //var pomerajX = selected.PositionX;
    //var pomerajY = selected.PositionY;
    //var pomerajZ = selected.PositionZ;

    ////selected.PositionX += selected.globalX ;
    ////selected.PositionY += selected.globalY;
    ////selected.PositionZ += selected.globalZ;
    
    //selected.globalX += pomerajX;
    //selected.globalY += pomerajY;
    //selected.globalZ += pomerajZ;

    //selected.PositionX = 0;
    //selected.PositionY = 0;
    //selected.PositionZ = 0;

    /*selected.PositionX = selected.globalX;
    selected.PositionY = selected.globalY;
    selected.PositionZ = selected.globalZ;*/

    //var obj = selected.CreateGeometry();

    //previousObject = obj;


    //scene.add(obj);
    objects.push(previousObject);

    objectsOnScene.push(selected);
    
}




//btn_del.onclick = function () {

//    deleteBox();
//}

function deleteBox()
{
    var Name = previousObject.Name;

    for (var i = 0; i < objectsOnScene.length; i++) {
        if (objectsOnScene[i].Name == Name) {
            objectsOnScene.splice(i, 1);
            break;
        }
    }

    for (var i = 0; i < objects.length; i++) {
        if (objects[i].Name == Name) {
            objects.splice(i, 1);
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

function radius(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
}


function circles(radius, PositionX, PositionY, PositionZ) {

    radius *= 1.1;
    var segments = 64;
    var material = new THREE.LineBasicMaterial({ color: 0x0000ff }),
        geometry = new THREE.CircleGeometry(radius, segments);

    //Remove center vertex
    geometry.vertices.shift();
    blue = new THREE.Line(geometry, material);
    blue.position.y = PositionY;
    blue.position.x = PositionX;
    blue.position.z = PositionZ;
    scene.add(blue);

    var material2 = new THREE.LineBasicMaterial({ color: 0x00ff00 }),
        geometry2 = new THREE.CircleGeometry(radius, segments);
    geometry2.vertices.shift();
    green = new THREE.Line(geometry2, material2);
    green.rotation.y += Math.PI / 2;
    green.position.y = PositionY;
    green.position.x = PositionX;
    green.position.z = PositionZ;
    scene.add(green);

    var material3 = new THREE.LineBasicMaterial({ color: 0xff0000 }),
        geometry3 = new THREE.CircleGeometry(radius, segments);
    geometry3.vertices.shift();
    red = new THREE.Line(geometry3, material3);
    red.rotation.x += Math.PI / 2;
    red.position.y = PositionY;
    red.position.x = PositionX;
    red.position.z = PositionZ;
    scene.add(red);
}

function dodajPregrade() {
    var brojPregrada = document.getElementById("brojPregrada").value;
    var pregradeVertikalno = document.getElementById("pregradeVertikalno").checked;

    var o;
    for (var i = 0; i < objectsOnScene.length; i++) {
        if (objectsOnScene[i].Name == previousObject.Name) {
            o = objectsOnScene[i];
            objectsOnScene.splice(i, 1);
            break;
        }
    }

    if (pregradeVertikalno == true) {
        var i = selected.Width / brojPregrada;
        for (var k = 0; k < brojPregrada - 1; k++) {
            //var d = new Daska(selected.BoardThickness, selected.Height, selected.Depth, - selected.Width / 2 + (k + 1) * i + startX, startY, startZ, "daska" + k);
            //var d = new Daska(selected.BoardThickness * selected.originalWidth / selected.Width, selected.originalHeight, selected.originalDepth, - selected.Width / 2 + (k + 1) * i + selected.globalX * selected.originalWidth / selected.Width, selected.globalY * selected.originalHeight / selected.Height, selected.globalZ * selected.originalDepth / selected.Depth, "daska" + k);

            var d = new Daska(selected.BoardThickness /** selected.originalWidth / selected.Width*/, selected.originalHeight, selected.originalDepth, (- selected.Width / 2 + (k + 1) * i + selected.globalX) * selected.originalWidth / selected.Width, selected.globalY * selected.originalHeight / selected.Height, selected.globalZ * selected.originalDepth / selected.Depth, "daska" + k);

            selected.addBoard(previousObject, d);
            //var mesh = d.CreateGeometry();
            //objectsOnScene.push(d);
            //var ob = scene.getObjectByName("daska" + k);
            //meshes.push(mesh);
            //previousObject.add(mesh);
            selected.childs.push(d);
        }
        selected.vertikalno = true;
    }
    else {
        var i = selected.Height / brojPregrada;
        for (var k = 0; k < brojPregrada - 1; k++) {
            //var d = new Daska(selected.Width, selected.BoardThickness, selected.Depth, startX, - selected.Height / 2 + (k + 1) * i + startY, startZ, "daska" + k);
            //var d = new Daska(selected.Width, selected.BoardThickness, selected.Depth, selected.globalX, - selected.Height / 2 + (k + 1) * i + selected.globalY, selected.globalZ, "daska" + k);

            var d = new Daska(selected.originalWidth, selected.BoardThickness, selected.originalDepth, selected.globalX, (- selected.Height / 2 + (k + 1) * i + selected.globalY) * selected.originalHeight / selected.Height, selected.globalZ, "daska" + k);

            selected.addBoard(previousObject, d);
            //var mesh = d.CreateGeometry();
            //objectsOnScene.push(d);
            //var ob = scene.getObjectByName("daska" + k);
            //	meshes.push(mesh);
            //previousObject.add(mesh);
            selected.childs.push(d);
        }
        selected.vertikalno = false;
    }

    objectsOnScene.push(selected);

}

function dodajPregradeSignalR(brojPregrada, pregradeVertikalno) {

    var o;
    for (var i = 0; i < objectsOnScene.length; i++) {
        if (objectsOnScene[i].Name == previousObject.Name) {
            o = objectsOnScene[i];
            objectsOnScene.splice(i, 1);
            break;
        }
    }

    if (pregradeVertikalno == true) {
        var i = selected.Width / brojPregrada;
        for (var k = 0; k < brojPregrada - 1; k++) {
            //var d = new Daska(selected.BoardThickness, selected.Height, selected.Depth, - selected.Width / 2 + (k + 1) * i + startX, startY, startZ, "daska" + k);
            //var d = new Daska(selected.BoardThickness, selected.Height, selected.Depth, - selected.Width / 2 + (k + 1) * i + selected.globalX, selected.globalY, selected.globalZ, "daska" + k);
            var d = new Daska(selected.BoardThickness /** selected.originalWidth / selected.Width*/, selected.originalHeight, selected.originalDepth, (- selected.Width / 2 + (k + 1) * i + selected.globalX) * selected.originalWidth / selected.Width, selected.globalY * selected.originalHeight / selected.Height, selected.globalZ * selected.originalDepth / selected.Depth, "daska" + k);
            d.Texture = selected.Texture;
            selected.addBoard(previousObject, d).add;
            //var mesh = d.CreateGeometry();
            //objectsOnScene.push(d);
            //var ob = scene.getObjectByName("daska" + k);
            //meshes.push(mesh);
            //previousObject.add(mesh);
            selected.childs.push(d);
        }
        selected.vertikalno = true;
    }
    else {
        var i = selected.Height / brojPregrada;
        for (var k = 0; k < brojPregrada - 1; k++) {
            //var d = new Daska(selected.Width, selected.BoardThickness, selected.Depth, startX, - selected.Height / 2 + (k + 1) * i + startY, startZ, "daska" + k);
            //var d = new Daska(selected.Width, selected.BoardThickness, selected.Depth, selected.globalX, - selected.Height / 2 + (k + 1) * i + selected.globalY, selected.globalZ, "daska" + k);

            var d = new Daska(selected.originalWidth, selected.BoardThickness, selected.originalDepth, selected.globalX, (- selected.Height / 2 + (k + 1) * i + selected.globalY) * selected.originalHeight / selected.Height, selected.globalZ, "daska" + k);
            d.Texture = selected.Texture;
            selected.addBoard(previousObject, d);
            //var mesh = d.CreateGeometry();
            //objectsOnScene.push(d);
            //var ob = scene.getObjectByName("daska" + k);
            //	meshes.push(mesh);
            //previousObject.add(mesh);
            selected.childs.push(d);
        }
        selected.vertikalno = false;
    }

    objectsOnScene.push(selected);

}



//$(document).on("click", "#dodajPregrade", function (event) {
//    dodajPregrade();
//});


function dodajFioke() {

    var o;
    for (var i = 0; i < objectsOnScene.length; i++) {
        if (objectsOnScene[i].Name == previousObject.Name) {
            o = objectsOnScene[i];
            objectsOnScene.splice(i, 1);
            break;
        }
    }

    var tmp = [];


    if (selected.vertikalno) {
        var duz = selected.originalWidth / (selected.childs.length + 1);
        var cont = document.getElementById("FiokeContainer");
        var checks = cont.childNodes;

        var start = - selected.originalWidth / 2 + duz / 2;
        //var start = previousObject.position.x - selected.Width / 2 + duz / 2
        for (var i = 0; i < selected.childs.length + 1; i++) {
            if (checks[i].firstChild.checked == true) {
                //var f = new Fioka(duz, selected.Height, selected.Depth, selected.BoardThickness, start + (i * duz) + startX, startY, startZ, "Fioka" + i);
                var f = new Fioka(duz, selected.originalHeight, selected.originalDepth, selected.BoardThickness, start + (i * duz) + selected.globalX, selected.globalY, selected.globalZ, "Fioka" + i);


                //var mesh = f.CreateGeometry();
                //previousObject.add(mesh);

                selected.addDrawer(previousObject, f);

                //meshes.push(mesh);
                //tmp[i] = checks[i].firstChild.checked;
                tmp[i] = true;
                selected.nizFioka.push(f);
            }
            else
                tmp[i] = false;
        }
    }
    else {
        var duz = selected.originalHeight / (selected.childs.length + 1);
        var cont = document.getElementById("FiokeContainer");
        var checks = cont.childNodes;

        var start = selected.originalHeight / 2 - duz / 2;
        //var start = previousObject.position.x - selected.Width / 2 + duz / 2
        for (var i = 0; i < selected.childs.length + 1; i++) {
            if (checks[i].firstChild.checked == true) {

                var f = new Fioka(selected.originalWidth, duz, selected.originalDepth, selected.BoardThickness, selected.globalX, start - (i * duz) + selected.globalY, selected.globalZ, "Fioka" + i);

                selected.addDrawer(previousObject, f);
                //var mesh = f.CreateGeometry();
                //previousObject.add(mesh);
                //meshes.push(mesh);
                //tmp[i] = checks[i].firstChild.checked;
                tmp[i] = true;
                selected.nizFioka.push(f);
            }
            else
                tmp[i] = false;
        }

    }
    selected.pozicije_fioka = tmp;

    objectsOnScene.push(selected);
}



function dodajFiokeSignalR(cont) {

    var o;
    for (var i = 0; i < objectsOnScene.length; i++) {
        if (objectsOnScene[i].Name == previousObject.Name) {
            o = objectsOnScene[i];
            objectsOnScene.splice(i, 1);
            break;
        }
    }

    var tmp = [];


    if (selected.vertikalno) {
        var duz = selected.originalWidth / (selected.childs.length + 1);

        var start = - selected.originalWidth / 2 + duz / 2;
        //var start = previousObject.position.x - selected.Width / 2 + duz / 2
        for (var i = 0; i < selected.childs.length + 1; i++) {
            if (cont[i] == true) {
                //var f = new Fioka(duz, selected.Height, selected.Depth, selected.BoardThickness, start + (i * duz) + startX, startY, startZ, "Fioka" + i);
                var f = new Fioka(duz, selected.originalHeight, selected.originalDepth, selected.BoardThickness, start + (i * duz) + selected.globalX, selected.globalY, selected.globalZ, "Fioka" + i);
                f.Texture = selected.Texture;
                //var mesh = f.CreateGeometry();
                //var obj = createMesh(mesh, "wood-2.jpg");
                //previousObject.add(mesh);

                selected.addDrawer(previousObject, f);
                //meshes.push(mesh);
                //tmp[i] = checks[i].firstChild.checked;
                tmp[i] = true;
                selected.nizFioka.push(f);
            }
            else
                tmp[i] = false;
        }
    }
    else {
        var duz = selected.originalHeight / (selected.childs.length + 1);

        var start = selected.originalHeight / 2 - duz / 2;
        //var start = previousObject.position.x - selected.Width / 2 + duz / 2
        for (var i = 0; i < selected.childs.length + 1; i++) {
            if (cont[i] == true) {
                //var f = new Fioka(duz, selected.Height, selected.Depth, selected.BoardThickness, start + (i * duz) + startX, startY, startZ, "Fioka" + i);
                var f = new Fioka(selected.originalWidth, duz, selected.originalDepth, selected.BoardThickness, selected.globalX, start - (i * duz) + selected.globalY, selected.globalZ, "Fioka" + i);
                f.Texture = selected.Texture;
                selected.addDrawer(previousObject, f);

                //var mesh = f.CreateGeometry();
                //var obj = createMesh(mesh, "wood-2.jpg");
                //previousObject.add(mesh);
                //meshes.push(mesh);
                //tmp[i] = checks[i].firstChild.checked;
                tmp[i] = true;
                selected.nizFioka.push(f);
            }
            else
                tmp[i] = false;
        }

    }
    selected.pozicije_fioka = tmp;

    objectsOnScene.push(selected);
}



//$(document).on("click", "#dodajFioke", function (event) {
//    dodajFioke();
//});

function dodajVrata() {

    var o;
    for (var i = 0; i < objectsOnScene.length; i++) {
        if (objectsOnScene[i].Name == previousObject.Name) {
            o = objectsOnScene[i];
            objectsOnScene.splice(i, 1);
            break;
        }
    }

    var tmp = [];
    if (selected.vertikalno) {
        var duz = selected.originalWidth / (selected.childs.length + 1);
        var cont = document.getElementById("VrataContainer");
        var checks = cont.childNodes;

        var start = - selected.originalWidth / 2 + duz / 2;
        for (var i = 0; i < selected.childs.length + 1; i++) {
            if (checks[i].firstChild.checked == true) {
                //var v = new nizVrata(duz, selected.Height, selected.BoardThickness, start + (i * duz) + startX, startY,  startZ + selected.Depth / 2 - selected.BoardThickness / 2, "nizVrata" + i);
                var v = new Vrata(duz, selected.originalHeight, selected.BoardThickness, start + (i * duz) + selected.globalX, selected.globalY, selected.globalZ + selected.Depth / 2 - selected.BoardThickness / 2, "Vrata" + i);

                selected.addDoor(previousObject, v);
                //var mesh = v.CreateGeometry();
                //meshes.push(mesh);
                //previousObject.add(mesh);
                tmp[i] = checks[i].firstChild.checked;
                selected.nizVrata.push(v);
            }
            else
                tmp[i] = false;
        }

    }
    else {
        var duz = selected.originalHeight / (selected.childs.length + 1);
        var cont = document.getElementById("VrataContainer");
        var checks = cont.childNodes;

        var start = selected.originalHeight / 2 - duz / 2;
        for (var i = 0; i < selected.childs.length + 1; i++) {
            if (checks[i].firstChild.checked == true) {
                //var v = new nizVrata(duz, selected.Height, selected.BoardThickness, start + (i * duz) + startX, startY,  startZ + selected.Depth / 2 - selected.BoardThickness / 2, "nizVrata" + i);
                var v = new Vrata(selected.originalWidth, duz, selected.BoardThickness, selected.globalX, start - (i * duz) + selected.globalY, selected.globalZ + selected.Depth / 2 - selected.BoardThickness / 2, "Vrata" + i);
                selected.addDoor(previousObject, v);
                //var mesh = v.CreateGeometry();
                //meshes.push(mesh);
                //previousObject.add(mesh);
                tmp[i] = checks[i].firstChild.checked;
                selected.nizVrata.push(v);
            }
            else
                tmp[i] = false;
        }
    }
    selected.pozicije_vrata = tmp;

    objectsOnScene.push(selected);
}

function dodajVrataSignalR(cont) {

    var o;
    for (var i = 0; i < objectsOnScene.length; i++) {
        if (objectsOnScene[i].Name == previousObject.Name) {
            o = objectsOnScene[i];
            objectsOnScene.splice(i, 1);
            break;
        }
    }

    var tmp = [];
    if (selected.vertikalno) {
        var duz = selected.originalWidth / (selected.childs.length + 1);

        var start = - selected.originalWidth / 2 + duz / 2;
        for (var i = 0; i < selected.childs.length + 1; i++) {
            if (cont[i] == true) {
                //var v = new nizVrata(duz, selected.Height, selected.BoardThickness, start + (i * duz) + startX, startY,  startZ + selected.Depth / 2 - selected.BoardThickness / 2, "nizVrata" + i);
                var v = new Vrata(duz, selected.originalHeight, selected.BoardThickness, start + (i * duz) + selected.globalX, selected.globalY, selected.globalZ + selected.Depth / 2 - selected.BoardThickness / 2, "Vrata" + i);
                v.Texture = selected.Texture;
                selected.addDoor(previousObject, v);
                //var mesh = v.CreateGeometry();
                //meshes.push(mesh);
                //previousObject.add(mesh);
                tmp[i] = true;
                selected.nizVrata.push(v);
            }
            else
                tmp[i] = false;
        }

    }
    else {
        var duz = selected.originalHeight / (selected.childs.length + 1);

        var start = selected.originalHeight / 2 - duz / 2;
        for (var i = 0; i < selected.childs.length + 1; i++) {
            if (cont[i] == true) {
                //var v = new nizVrata(duz, selected.Height, selected.BoardThickness, start + (i * duz) + startX, startY,  startZ + selected.Depth / 2 - selected.BoardThickness / 2, "nizVrata" + i);
                var v = new Vrata(selected.originalWidth, duz, selected.BoardThickness, selected.globalX, start - (i * duz) + selected.globalY, selected.globalZ + selected.Depth / 2 - selected.BoardThickness / 2, "Vrata" + i);
                v.Texture = selected.Texture;
                selected.addDoor(previousObject, v);
                //var mesh = v.CreateGeometry();
                //meshes.push(mesh);
                //previousObject.add(mesh);
                tmp[i] = true;
                selected.nizVrata.push(v);
            }
            else
                tmp[i] = false;
        }
    }
    selected.pozicije_vrata = tmp;

    objectsOnScene.push(selected);
}

//$(document).on("click", "#dodajVrata", function (event) {
//    dodajVrata();
//});


function createScene(planId) {
    $.ajax({
        url: '/Home/GetObjects',
        data: { planId: planId },
        datatype: 'json',
        success: function (data) {
            objectsOnScene = data.objects;

            for (var i = 0; i < objectsOnScene.length; i++) {
                var o = objectsOnScene[i];
                var b = new Box(o.Width, o.Height, o.Depth, o.BoardThickness, o.PositionX, o.PositionY, o.PositionZ, o.Name);
                b.Texture = o.Texture;
                b.vertikalno = o.vertikalno;
                b.horizontalno = o.horizontalno;
                b.globalX = o.globalX;
                b.globalY = o.globalY;
                b.globalZ = o.globalZ;

                
                
                

                //daske
                for (var j = 0; j < o.childs.length; j++) {
                    var child = o.childs[j];
                    b.childs[j] = new Daska(child.Width, child.Height, child.Depth, child.positionX, child.positionY, child.positionZ, child.Name);
                    b.childs[j].Texture = child.Texture;
                    //b.addBoard(obj, b.childs[j]);
                    //obj.geometry.verticesNeedUpdate = true;

                }

                //pozicije fioka
                //b.pozicije_fioka = [];
                //for (var j = 0; j < o.pozicije_fioka; j++)
                //    b.pozicije_fioka.push(o.pozicije_fioka[j]);
                b.pozicije_fioka = o.pozicije_fioka;

                //pozicije vrata
                //b.pozicije_vrata = [];
                //for (var j = 0; j < o.pozicije_vrata; j++)
                //    b.pozicije_vrata.push(o.pozicije_vrata[j]);
                b.pozicije_vrata = o.pozicije_vrata;
                //fioke
                for (var j = 0; j < o.nizFioka.length; j++) {
                    var f = o.nizFioka[j];
                    b.nizFioka[j] = new Fioka(f.Width, f.Height, f.Depth, f.BoardThickness, f.positionX, f.positionY, f.positionZ, f.Name);
                    b.nizFioka[j].Texture = f.Texture;
                    //b.addDrawer(obj, b.nizFioka[j]);
                }

                //vrata
                for (var j = 0; j < o.nizVrata.length; j++) {
                    var v = o.nizVrata[j];
                    b.nizVrata[j] = new Vrata(v.Width, v.Height, v.Depth, v.positionX, v.positionY, v.positionZ, v.Name);
                    b.nizVrata[j].Texture = v.Texture;
                    //b.addDoor(obj, b.nizVrata[j]);
                }

                
                /*obj.position.x += b.globalX;
                obj.position.y += b.globalY;
                obj.position.z += b.globalZ;*/

                var obj = b.CreateGeometry();
                scene.add(obj);
                objects.push(obj);
            }
        },
        error: function () {
            alert("error");
        }
    });

}

/*
$(document).on("click", "#kreiraj", function (event) {
    createScene();
});
*/


function SaveConfiguration(planId) {
    $.each(objectsOnScene, function (index, object) {
        $.ajax({
            url: '/Dashboard/SaveConfiguration',
            data: { ArrayOfObjects: JSON.stringify(object), planId: planId },
            datatype: 'json',
            traditional: true,
            success: function (data) {
                if (index == (objectsOnScene.length - 1))
                    alert("Succesful saving!");
            },
            error: function () {
                alert("error");
            }
        });
    });

}

//$(document).on("click", "#new_texture", function (event) {

//    var o;
//    for (var i = 0; i < objectsOnScene.length; i++) {
//        if (objectsOnScene[i].Name == previousObject.Name) {
//            o = objectsOnScene[i];
//            objectsOnScene.splice(i, 1);
//            break;
//        }
//    }
//    scene.remove(previousObject);

//    var img_src = document.getElementById("new_texture").src;
//    var niz = img_src.split("/");
//    var tex = niz[niz.length - 1];
//    selected.Texture = tex;

//    var pomerajX = selected.PositionX;
//    var pomerajY = selected.PositionY;
//    var pomerajZ = selected.PositionZ;

//    selected.PositionX += selected.globalX;
//    selected.PositionY += selected.globalY;
//    selected.PositionZ += selected.globalZ;

//    selected.globalX += pomerajX;
//    selected.globalY += pomerajY;
//    selected.globalZ += pomerajZ;

//    var obj = selected.CreateGeometry();
//    scene.add(obj);
//    objects.push(obj);

//    objectsOnScene.push(selected);
//});

function changeTexture(num) {

    var image = "/box/w" + num + ".jpg"
    selected.Texture = image;

    var Texture = THREE.ImageUtils.loadTexture("/Content/textures/general/" + image);
    previousObject.material.map = Texture;
    previousObject.material.needsUpdate = true;

    for (var i = 0; i < previousObject.children.length; i++) {
        previousObject.children[i].material.map = Texture;
        previousObject.children[i].material.needsUpdate = true;
    }


    selected.PropagateChange();
    //var o;
    //for (var i = 0; i < objectsOnScene.length; i++) {
    //    if (objectsOnScene[i].Name == previousObject.Name) {
    //        objectsOnScene.splice(i, 1);
    //        break;
    //    }
    //}

    //for (var i = 0; i < objects.length; i++) {
    //    if (objects[i].Name == previousObject.Name) {
    //        objects.splice(i, 1);
    //        break;
    //    }
    //}
    //scene.remove(previousObject);

    //var image = "/box/w" + num + ".jpg"
    //selected.Texture = image;

    //var pomerajX = selected.PositionX;
    //var pomerajY = selected.PositionY;
    //var pomerajZ = selected.PositionZ;

    ////selected.PositionX += selected.globalX;
    ////selected.PositionY += selected.globalY;
    ////selected.PositionZ += selected.globalZ;

    //selected.globalX += pomerajX;
    //selected.globalY += pomerajY;
    //selected.globalZ += pomerajZ;

    //selected.PositionX = 0;
    //selected.PositionY = 0;
    //selected.PositionZ = 0;

    //var obj = selected.CreateGeometry();
    //scene.add(obj);
    //objects.push(obj);

    //objectsOnScene.push(selected);
}

//$.each($('.slika'), function (index, slika) {
//    slika.onclick = function () {
//        changeTexture(index + 1);
//    };
//});


function stopClicks() {
    blockedClicks = true;

    $("a").click(function (event) {
        event.stopPropagation();
        event.preventDefault();
        event.stopImmediatePropagation();
    });
    $("li").click(function (event) {
        event.stopPropagation();
        event.preventDefault();
        event.stopImmediatePropagation();
    });
    $("div").click(function (event) {
        event.stopPropagation();
        event.preventDefault();
        event.stopImmediatePropagation();
    });
    $("button").click(function (event) {
        event.stopPropagation();
        event.preventDefault();
        event.stopImmediatePropagation();
    });

}

function startClicks() {

    blockedClicks = false;
    $("a").unbind("click");
    $("li").unbind("click");
    $("div").unbind("click");
    $("button").unbind("click");

    for (var i = 0; i < mousedownEvent.path.length; i++) {
        mousedownEvent.path[i].unbind("click");
    }

    for (var i = 0; i < mousedownEvent.path.length; i++) {
        mousemoveEvent.path[i].unbind("click");
    }

    for (var i = 0; i < mousedownEvent.path.length; i++) {
        mouseupEvent.path[i].unbind("click");
    }

}

function sekuSe(box1, box2) {
    if ((((box1.Width + box2.Width) / 2 + box1.BoardThickness + box2.BoardThickness) > Math.abs(box1.PositionX - box2.PositionX)) && (((box1.Height + box2.Height) / 2) > Math.abs(box1.PositionY - box2.PositionY)))
        return true;
    else
        return false;
}