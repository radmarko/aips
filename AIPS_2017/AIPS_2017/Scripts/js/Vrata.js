function Vrata(w, h, d, x, y, z, n) {

    this.Width = w;
    this.Height = h;
    this.Depth = d;
    this.Name = n;
    this.PositionX = x;
    this.PositionY = y;
    this.PositionZ = z;
    this.Texture = "wood-2.jpg";


    this.Update = function (w, h, d, x, y, z, texture) {
        this.Width = w;
        this.Height = h;
        this.Depth = d;
        this.Name = n;
        this.PositionX = x;
        this.PositionY = y;
        this.PositionZ = z;
        this.Texture = texture;
    }

    this.Draw = function () {

        var meshes = [];

        var PiPola = 3.14 / 2;
        var cube = new THREE.BoxGeometry(this.Width, this.Height, this.Depth, 1, 1, 1);
        var plane = createMesh(cube, this.Texture);
        plane.position.x = this.PositionX;
        plane.position.y = this.PositionY;
        plane.position.z = this.PositionZ;

        //scene.add(plane);
        meshes.push(plane);

        var radius = this.Depth;
        var widthSegments = 10;
        var heightSegments = 10;
        var phiStart = 0;
        var phiLength = Math.PI * 2;
        var thetaStart = 0;
        var thetaLength = Math.PI;
        var sph = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
        var sphere = createMesh(sph, this.Texture);

        sphere.position.x = this.PositionX + 2 / 5 * this.Width;
        sphere.position.y = this.PositionY;
        sphere.position.z = this.PositionZ + this.Depth * 1.33;
        //scene.add(sphere);
        meshes.push(sphere);

        var geometry = mergeMeshes(meshes);
        var obj = createMesh(geometry, this.Texture);
        obj.Name = this.Name;
        objects.push(obj);
        scene.add(obj);
    }

    this.CreateGeometry = function () {
        var meshes = [];

        var PiPola = 3.14 / 2;
        var cube = new THREE.BoxGeometry(this.Width, this.Height, this.Depth, 1, 1, 1);
        var plane = createMesh(cube, this.Texture);
        plane.position.x = this.PositionX;
        plane.position.y = this.PositionY;
        plane.position.z = this.PositionZ;

        //scene.add(plane);
        meshes.push(plane);

        var radius = this.Depth;
        var widthSegments = 10;
        var heightSegments = 10;
        var phiStart = 0;
        var phiLength = Math.PI * 2;
        var thetaStart = 0;
        var thetaLength = Math.PI;
        var sph = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
        var sphere = createMesh(sph, this.Texture);

        sphere.position.x = this.PositionX + 2 / 5 * this.Width;
        sphere.position.y = this.PositionY;
        sphere.position.z = this.PositionZ + this.Depth * 1.33;
        //scene.add(sphere);
        meshes.push(sphere);

        var geometry = mergeMeshes(meshes);
        var obj = createMesh(geometry, this.Texture);
        obj.Name = this.Name;
        return obj;
    }

}