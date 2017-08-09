function Vrata(w, h, d, x, y, z, n) {

    this.sirina = w;
    this.visina = h;
    this.dubina = d;
    this.name = n;
    this.posX = x;
    this.posY = y;
    this.posZ = z;
    this.texture;

    this.Draw = function () {

        var meshes = [];

        var PiPola = 3.14 / 2;
        var cube = new THREE.BoxGeometry(this.sirina, this.visina, this.dubina, 1, 1, 1);
        var plane = createMesh(cube, "wood-2.jpg");
        plane.position.x = this.posX;
        plane.position.y = this.posY;
        plane.position.z = this.posZ;

        //scene.add(plane);
        meshes.push(plane);

        var radius = this.dubina;
        var widthSegments = 10;
        var heightSegments = 10;
        var phiStart = 0;
        var phiLength = Math.PI * 2;
        var thetaStart = 0;
        var thetaLength = Math.PI;
        var sph = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
        var sphere = createMesh(sph, "wood-2.jpg");

        sphere.position.x = this.posX + 2 / 5 * this.sirina;
        sphere.position.y = this.posY;
        sphere.position.z = this.posZ + this.dubina * 1.33;
        //scene.add(sphere);
        meshes.push(sphere);

        var geometry = mergeMeshes(meshes);
        var obj = createMesh(geometry, "wood-2.jpg");
        obj.name = this.name;
        objects.push(obj);
        scene.add(obj);
    }

    this.CreateGeometry = function () {
        var meshes = [];

        var PiPola = 3.14 / 2;
        var cube = new THREE.BoxGeometry(this.sirina, this.visina, this.dubina, 1, 1, 1);
        var plane = createMesh(cube, "wood-2.jpg");
        plane.position.x = this.posX;
        plane.position.y = this.posY;
        plane.position.z = this.posZ;

        //scene.add(plane);
        meshes.push(plane);

        var radius = this.dubina;
        var widthSegments = 10;
        var heightSegments = 10;
        var phiStart = 0;
        var phiLength = Math.PI * 2;
        var thetaStart = 0;
        var thetaLength = Math.PI;
        var sph = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
        var sphere = createMesh(sph, "wood-2.jpg");

        sphere.position.x = this.posX + 2 / 5 * this.sirina;
        sphere.position.y = this.posY;
        sphere.position.z = this.posZ + this.dubina * 1.33;
        //scene.add(sphere);
        meshes.push(sphere);

        var geometry = mergeMeshes(meshes);
        var obj = createMesh(geometry, "wood-2.jpg");
        obj.name = this.name;
        return obj;
    }

}