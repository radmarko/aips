function Fioka(w, h, d, debljina, x, y, z, n) {

    this.Width = w;
    this.Height = h;
    this.Depth = d;
    this.Name = n;
    this.BoardThickness = debljina;
    this.PositionX = x;
    this.PositionY = y;
    this.PositionZ = z;
    this.Texture = "wood-2.jpg";
    this.geometry;

    this.Draw = function () {
        var meshes = [];

        var WidthPola = this.Width / 2;
        var HeightPola = this.Height / 2;
        var DepthPola = this.Depth / 2;
        var BoardThicknessPola = this.BoardThickness / 2;
        var PiPola = 3.14 / 2;
        var cube = new THREE.BoxGeometry(this.Width, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane = createMesh(cube, this.Texture);
        plane.rotation.x += PiPola;
        plane.position.x = this.PositionX;
        plane.position.y = this.PositionY - (HeightPola - BoardThicknessPola);
        plane.position.z = this.PositionZ;

        //scene.add(plane);
        meshes.push(plane);

        var cube2 = new THREE.BoxGeometry(this.Height, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane2 = createMesh(cube2, this.Texture);
        plane2.rotation.x += PiPola;
        plane2.rotation.y += PiPola;
        plane2.position.x = this.PositionX - WidthPola;
        plane2.position.y = this.PositionY;
        plane2.position.z = this.PositionZ;

        //scene.add(plane2);
        meshes.push(plane2);

        var cube3 = new THREE.BoxGeometry(this.Height, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane3 = createMesh(cube3, this.Texture);
        plane3.rotation.x += PiPola;
        plane3.rotation.y += PiPola;
        plane3.position.x = this.PositionX + WidthPola;
        plane3.position.y = this.PositionY;
        plane3.position.z = this.PositionZ;

        //scene.add(plane3);
        meshes.push(plane3);

        var cube4 = new THREE.BoxGeometry(this.Width, this.Height, this.BoardThickness, 1, 1, 1);
        var plane4 = createMesh(cube4, this.Texture);
        plane4.position.x = this.PositionX;
        plane4.position.y = this.PositionY;
        plane4.position.z = this.PositionZ - DepthPola + BoardThicknessPola;

        //scene.add(plane4);
        meshes.push(plane4);

        var cube6 = new THREE.BoxGeometry(this.Width * 1.05, this.Height * 1.05, this.BoardThickness, 1, 1, 1);
        var plane6 = createMesh(cube6, this.Texture);
        plane6.position.x = this.PositionX;
        plane6.position.y = this.PositionY;
        plane6.position.z = this.PositionZ + DepthPola - BoardThicknessPola;
        //scene.add(plane6);
        meshes.push(plane6);

        var radius = this.BoardThickness;
        var widthSegments = 10;
        var heightSegments = 10;
        var phiStart = 0;
        var phiLength = Math.PI * 2;
        var thetaStart = 0;
        var thetaLength = Math.PI;
        var sph = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
        var sphere = createMesh(sph, this.Texture);

        sphere.position.x = this.PositionX;
        sphere.position.y = this.PositionY;
        sphere.position.z = this.PositionZ + DepthPola + this.BoardThickness;
        //scene.add(sphere);
        meshes.push(sphere);

        var geometry = mergeMeshes(meshes);
        var obj = createMesh(geometry, this.Texture);
        obj.Name = Name;
        obj.id = "fioka12";
        //obj.position.y -= HeightPola - BoardThicknessPola;
        objects.push(obj);
        scene.add(obj);

    }

    this.CreateGeometry = function () {
        var meshes = [];

        var WidthPola = this.Width / 2;
        var HeightPola = this.Height / 2;
        var DepthPola = this.Depth / 2;
        var BoardThicknessPola = this.BoardThickness / 2;
        var PiPola = 3.14 / 2;
        var cube = new THREE.BoxGeometry(this.Width, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane = createMesh(cube, this.Texture);
        plane.rotation.x += PiPola;
        plane.position.x = this.PositionX;
        plane.position.y = this.PositionY - (HeightPola - BoardThicknessPola);
        plane.position.z = this.PositionZ;

        //scene.add(plane);
        meshes.push(plane);

        var cube2 = new THREE.BoxGeometry(this.Height, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane2 = createMesh(cube2, this.Texture);
        plane2.rotation.x += PiPola;
        plane2.rotation.y += PiPola;
        plane2.position.x = this.PositionX - WidthPola;
        plane2.position.y = this.PositionY;
        plane2.position.z = this.PositionZ;

        //scene.add(plane2);
        meshes.push(plane2);

        var cube3 = new THREE.BoxGeometry(this.Height, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane3 = createMesh(cube3, this.Texture);
        plane3.rotation.x += PiPola;
        plane3.rotation.y += PiPola;
        plane3.position.x = this.PositionX + WidthPola;
        plane3.position.y = this.PositionY;
        plane3.position.z = this.PositionZ;

        //scene.add(plane3);
        meshes.push(plane3);

        var cube4 = new THREE.BoxGeometry(this.Width, this.Height, this.BoardThickness, 1, 1, 1);
        var plane4 = createMesh(cube4, this.Texture);
        plane4.position.x = this.PositionX;
        plane4.position.y = this.PositionY;
        plane4.position.z = this.PositionZ - DepthPola + BoardThicknessPola;

        //scene.add(plane4);
        meshes.push(plane4);

        var cube6 = new THREE.BoxGeometry(this.Width * 1.05, this.Height * 1.05, this.BoardThickness, 1, 1, 1);
        var plane6 = createMesh(cube6, this.Texture);
        plane6.position.x = this.PositionX;
        plane6.position.y = this.PositionY;
        plane6.position.z = this.PositionZ + DepthPola - BoardThicknessPola;
        //scene.add(plane6);
        meshes.push(plane6);

        var radius = this.BoardThickness;
        var widthSegments = 10;
        var heightSegments = 10;
        var phiStart = 0;
        var phiLength = Math.PI * 2;
        var thetaStart = 0;
        var thetaLength = Math.PI;
        var sph = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
        var sphere = createMesh(sph, this.Texture);

        sphere.position.x = this.PositionX;
        sphere.position.y = this.PositionY;
        sphere.position.z = this.PositionZ + DepthPola + this.BoardThickness;
        //scene.add(sphere);
        meshes.push(sphere);

        var geometry = mergeMeshes(meshes);
        var obj = createMesh(geometry, this.Texture);
        obj.Name = this.Name;
        obj.id = "fioka12";
        //obj.position.y -= HeightPola - BoardThicknessPola;
        //objects.push(obj);
        //scene.add(obj);
        return obj;
    }

}