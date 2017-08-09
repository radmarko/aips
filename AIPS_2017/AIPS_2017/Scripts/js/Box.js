function Box(w, h, d, debljina, x, y, z, n) {

    this.Width = w;
    this.Height = h;
    this.Depth = d;
    this.Name = n;
    this.BoardThickness = debljina;
    this.PositionX = x;
    this.PositionY = y;
    this.PositionZ = z;
    this.Texture;
    this.geometry;
    this.childs = [];
    this.nizFioka = [];
    this.pozicije_fioka;
    this.nizVrata = [];
    this.pozicije_vrata;
    this.vertikalno = false;
    this.horizontalno = false;
    this.globalX = startX;
    this.globalY = startY;
    this.globalZ = startZ;

    this.Draw = function () {
        var sirinaPola = this.Width / 2;
        var visinaPola = this.Height / 2;
        var dubinaPola = this.Depth / 2;
        var debljinaDaskePola = this.BoardThickness / 2;
        var PiPola = 3.14 / 2;

        var meshes = [];

        //donja
        var cube = new THREE.BoxGeometry(this.Width, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane = createMesh(cube, "wood-2.jpg");
        plane.rotation.x += PiPola;
        plane.position.x = this.PositionX;
        plane.position.y = this.PositionY - visinaPola + debljinaDaskePola;
        plane.position.z = this.PositionZ;

        meshes.push(plane);

        //leva
        var cube2 = new THREE.BoxGeometry(this.Height, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane2 = createMesh(cube2, "wood-2.jpg");
        plane2.rotation.x += PiPola;
        plane2.rotation.y += PiPola;
        plane2.position.x = this.PositionX - sirinaPola;
        plane2.position.y = this.PositionY;
        plane2.position.z = this.PositionZ;

        meshes.push(plane2);

        //desna
        var cube3 = new THREE.BoxGeometry(this.Height, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane3 = createMesh(cube3, "wood-2.jpg");
        plane3.rotation.x += PiPola;
        plane3.rotation.y += PiPola;
        plane3.position.x = this.PositionX + sirinaPola;
        plane3.position.y = this.PositionY;
        plane3.position.z = this.PositionZ;

        meshes.push(plane3);

        //zadnja
        var cube4 = new THREE.BoxGeometry(this.Width, this.Height, this.BoardThickness, 1, 1, 1);
        var plane4 = createMesh(cube4, "wood-2.jpg");
        plane4.position.x = this.PositionX;
        plane4.position.y = this.PositionY;
        plane4.position.z = this.PositionZ - dubinaPola + debljinaDaskePola;

        meshes.push(plane4);

        //gornja
        var cube5 = new THREE.BoxGeometry(this.Width, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane5 = createMesh(cube5, "wood-2.jpg");
        plane5.rotation.x += PiPola;
        plane5.position.x = this.PositionX;
        plane5.position.y = this.PositionY + visinaPola - debljinaDaskePola;
        plane5.position.z = this.PositionZ;

        meshes.push(plane5);

        var geometry = mergeMeshes(meshes);
        var obj = createMesh(geometry, "wood-2.jpg");
        //obj.position.y -= visinaPola;
        obj.Name = this.Name;
        objects.push(obj);
        scene.add(obj);

    }

    this.CreateGeometry = function () {
        var sirinaPola = this.Width / 2;
        var visinaPola = this.Height / 2;
        var dubinaPola = this.Depth / 2;
        var debljinaDaskePola = this.BoardThickness / 2;
        var PiPola = 3.14 / 2;

        var meshes = [];

        //donja
        var cube = new THREE.BoxGeometry(this.Width, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane = createMesh(cube, "wood-2.jpg");
        plane.rotation.x += PiPola;
        plane.position.x = this.PositionX;
        plane.position.y = this.PositionY - visinaPola + debljinaDaskePola;
        plane.position.z = this.PositionZ;

        meshes.push(plane);

        //leva
        var cube2 = new THREE.BoxGeometry(this.Height, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane2 = createMesh(cube2, "wood-2.jpg");
        plane2.rotation.x += PiPola;
        plane2.rotation.y += PiPola;
        plane2.position.x = this.PositionX - sirinaPola;
        plane2.position.y = this.PositionY;
        plane2.position.z = this.PositionZ;

        meshes.push(plane2);

        //desna
        var cube3 = new THREE.BoxGeometry(this.Height, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane3 = createMesh(cube3, "wood-2.jpg");
        plane3.rotation.x += PiPola;
        plane3.rotation.y += PiPola;
        plane3.position.x = this.PositionX + sirinaPola;
        plane3.position.y = this.PositionY;
        plane3.position.z = this.PositionZ;

        meshes.push(plane3);

        //zadnja
        var cube4 = new THREE.BoxGeometry(this.Width, this.Height, this.BoardThickness, 1, 1, 1);
        var plane4 = createMesh(cube4, "wood-2.jpg");
        plane4.position.x = this.PositionX;
        plane4.position.y = this.PositionY;
        plane4.position.z = this.PositionZ - dubinaPola + debljinaDaskePola;

        meshes.push(plane4);

        //gornja
        var cube5 = new THREE.BoxGeometry(this.Width, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane5 = createMesh(cube5, "wood-2.jpg");
        plane5.rotation.x += PiPola;
        plane5.position.x = this.PositionX;
        plane5.position.y = this.PositionY + visinaPola - debljinaDaskePola;
        plane5.position.z = this.PositionZ;

        meshes.push(plane5);

        geometry = mergeMeshes(meshes);
        var obj = createMesh(geometry, "wood-2.jpg");

        if (this.childs != null) {

            if (this.vertikalno == true) {
                var i = this.Width / (this.childs.length + 1);
                for (var k = 0; k < this.childs.length; k++) {
                    this.childs[k] = new Daska(this.BoardThickness, this.Height, this.Depth, - this.Width / 2 + (k + 1) * i + this.PositionX, this.PositionY, this.PositionZ, "daska" + k);
                    var mesh = this.childs[k].CreateGeometry();
                    obj.add(mesh);
                }
            }
            if (this.horizontalno == true) {
                var i = this.Height / this.childs.length + 1;
                for (var k = 0; k < this.childs.length; k++) {

                    this.childs[k] = new Daska(this.Width, this.BoardThickness, this.Depth, this.PositionX, - this.Height / 2 + (k + 1) * i + this.PositionY, this.PositionZ, "daska" + k);

                    var mesh = this.childs[k].CreateGeometry();
                    obj.add(mesh);
                }
            }
        }

        if (this.nizFioka != null && this.nizFioka.length != 0) {
            var duz = this.Width / (this.childs.length + 1);
            var start = - this.Width / 2 + duz / 2;
            for (var i = 0; i < this.childs.length + 1; i++) {
                if (this.pozicije_fioka[i] == true) {
                    this.nizFioka[i] = new Fioka(duz, this.Height, this.Depth, this.BoardThickness, start + (i * duz) + this.PositionX, this.PositionY, this.PositionZ, "Fioka" + i);
                    //var f = new Fioka(duz, selected.visina, selected.dubina, selected.debljinaDaske, start + (i * duz) + startX, previousObject.position.y + startY, previousObject.position.z + startZ, "Fioka" + i);
                    var mesh = this.nizFioka[i].CreateGeometry();
                    obj.add(mesh);
                }
            }
        }

        if (this.nizVrata != null && this.nizVrata.length != 0) {
            var duz = this.Width / (this.childs.length + 1);
            var start = - this.Width / 2 + duz / 2;

            for (var i = 0; i < this.childs.length + 1; i++) {
                if (this.pozicije_vrata[i] == true) {
                    this.nizVrata[i] = new Vrata(duz, this.Height, this.BoardThickness, start + (i * duz) + this.PositionX, this.PositionY, this.PositionZ + this.Depth / 2 - this.BoardThickness / 2, "Vrata" + i);
                    var mesh = this.nizVrata[i].CreateGeometry();
                    obj.add(mesh);
                }
            }
        }

        //scene.add(obj);
        //objects.push(obj);
        return obj;
    }
}
