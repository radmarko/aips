function Daska(w, h, d, x, y, z, n) {

    this.Width = w;
    this.Height = h;
    this.Depth = d;
    this.Name = n;
    this.PositionX = x;
    this.PositionY = y;
    this.PositionZ = z;
    this.Texture = "wood-2.jpg";
    this.geometry;

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

        geometry = mergeMeshes(meshes);
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

        geometry = mergeMeshes(meshes);
        var obj = createMesh(geometry, this.Texture);
        obj.Name = this.Name;
        return obj;
    }
}