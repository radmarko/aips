function Painter() {
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);;
	this.webGLRenderer = new THREE.WebGLRenderer();
	var self = this;
	this.objects = new Array();
	
	this.init = function(){
		this.webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
		this.webGLRenderer.setSize(window.innerWidth-370, window.innerHeight);
		this.webGLRenderer.shadowMapEnabled = true;
		
		this.orbitControls = new THREE.OrbitControls(this.camera);
		this.clock = new THREE.Clock();
		this.orbitControls.update();
		
		this.camera.position.x = -20;
		this.camera.position.y = 30;
		this.camera.position.z = 40;
		this.camera.lookAt(new THREE.Vector3(10, 0, 0));
		
		var spotLight = new THREE.SpotLight(0xffffff);
		spotLight.position.set(-10, 100, -20);
		this.scene.add(spotLight);
		
		document.getElementById("WebGL-output").appendChild(this.webGLRenderer.domElement);
		
		
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
		
		this.scene.add(floor);
		this.scene.add(wall);
		this.scene.add(wall2);
		this.scene.add(wall3);
		this.scene.add(wall4);
		
		//////////////////////////////////////////////////////////////////////////
		/*scena*/
		/////////////////////////////////////////////////////////////////////////
		
		
		var cube = new THREE.BoxGeometry(10, 7, 0.5, 1, 1, 1);
		var plane = this.createMesh(cube, "wood-2.jpg");
		plane.position.y += 10;	
		
		this.scene.add(plane);
		this.render();
	}	
	
	this.render = function(){
		//plane.rotation.y = step += 0.01;
		//var delta = clock.getDelta();
		//orbitControls.update(delta);
		// render using requestAnimationFrame
		requestAnimationFrame(self.render);
		
		self.webGLRenderer.render(self.scene, self.camera);
		var delta = self.clock.getDelta();
		self.orbitControls.update(delta);
	}
		
	
	/*
	var buttonDaska = document.getElementById("daska");
	buttonDaska.onclick = function(){
		var mat = new THREE.MeshPhongMaterial();
		var texture = THREE.ImageUtils.loadTexture("../assets/textures/general/" + "wood-2" + ".jpg");
		
		var daska = new THREE.Mesh(new THREE.BoxGeometry(10, 8, 0.5, 10), new THREE.MeshPhongMaterial({
            map: texture
        }));
		
		daska.position.y += 10;
		
		self.scene.add(daska);
		//self.render();
	}
	*/
	/*this.createMesh = function(geom) 
	{
        // assign two materials
		var meshMaterial = new THREE.MeshPhongMaterial();
		meshMaterial.side = THREE.DoubleSide;
		var wireFrameMat = new THREE.MeshPhongMaterial();
		wireFrameMat.wireframe = true;

		// create a multimaterial
		var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

		return mesh;
	}*/	
	
	this.createMesh = function(geom, imageFile) {
            var texture = THREE.ImageUtils.loadTexture("../assets/textures/general/" + imageFile);
            var mat = new THREE.MeshPhongMaterial();
            mat.map = texture;

            var mesh = new THREE.Mesh(geom, mat);
            return mesh;
	}
	
	var el = document.getElementById("daska");    
	el.addEventListener("click", addCube, false);
	
	function addCube(){
		var mat = new THREE.MeshPhongMaterial();
		var texture = THREE.ImageUtils.loadTexture("../assets/textures/general/" + "wood-2" + ".jpg");
		
		var daska = new THREE.Mesh(new THREE.BoxGeometry(10, 8, 0.5, 10), new THREE.MeshPhongMaterial({
            map: texture
        }));
		
		daska.position.y += 10;
		
		self.scene.add(daska);

         
	}
          
}


window.onload = function(){
	var painter = new Painter();
	painter.init();
};