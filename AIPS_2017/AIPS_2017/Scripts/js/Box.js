function Box(w, h, d, debljina, x, y, z, n) {

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
    this.childs = [];
    this.nizFioka = [];
    this.pozicije_fioka;
    this.nizVrata = [];
    this.pozicije_vrata;
    this.vertikalno = true;
    this.globalX = startX;
    this.globalY = startY;
    this.globalZ = startZ;
    this.obj;
    this.originalWidth = w;
    this.originalHeight = h;
    this.originalDepth = d;
    this.Draw = function () {
        var WidthPola = this.Width / 2;
        var HeightPola = this.Height / 2;
        var DepthPola = this.Depth / 2;
        var BoardThicknessPola = this.BoardThickness / 2;
        var PiPola = 3.14 / 2;

        var meshes = [];

        //donja
        var cube = new THREE.BoxGeometry(this.Width, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane = createMesh(cube, this.Texture);
        plane.rotation.x += PiPola;
        plane.position.x = this.PositionX;
        plane.position.y = this.PositionY - HeightPola + BoardThicknessPola;
        plane.position.z = this.PositionZ;

        meshes.push(plane);

        //leva
        var cube2 = new THREE.BoxGeometry(this.Height, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane2 = createMesh(cube2, this.Texture);
        plane2.rotation.x += PiPola;
        plane2.rotation.y += PiPola;
        plane2.position.x = this.PositionX - WidthPola;
        plane2.position.y = this.PositionY;
        plane2.position.z = this.PositionZ;

        meshes.push(plane2);

        //desna
        var cube3 = new THREE.BoxGeometry(this.Height, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane3 = createMesh(cube3, this.Texture);
        plane3.rotation.x += PiPola;
        plane3.rotation.y += PiPola;
        plane3.position.x = this.PositionX + WidthPola;
        plane3.position.y = this.PositionY;
        plane3.position.z = this.PositionZ;

        meshes.push(plane3);

        //zadnja
        var cube4 = new THREE.BoxGeometry(this.Width, this.Height, this.BoardThickness, 1, 1, 1);
        var plane4 = createMesh(cube4, this.Texture);
        plane4.position.x = this.PositionX;
        plane4.position.y = this.PositionY;
        plane4.position.z = this.PositionZ - DepthPola + BoardThicknessPola;

        meshes.push(plane4);

        //gornja
        var cube5 = new THREE.BoxGeometry(this.Width, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane5 = createMesh(cube5, this.Texture);
        plane5.rotation.x += PiPola;
        plane5.position.x = this.PositionX;
        plane5.position.y = this.PositionY + HeightPola - BoardThicknessPola;
        plane5.position.z = this.PositionZ;

        meshes.push(plane5);

        var geometry = mergeMeshes(meshes);
        this.obj = createMesh(geometry, this.Texture);
        //obj.position.y -= HeightPola;
        this.obj.Name = this.Name;
        objects.push(this.obj);
        scene.add(this.obj);

    }

    this.CreateGeometry = function () {
        var WidthPola = this.Width / 2;
        var HeightPola = this.Height / 2;
        var DepthPola = this.Depth / 2;
        var BoardThicknessPola = this.BoardThickness / 2;
        var PiPola = 3.14 / 2;

        var meshes = [];

        //donja
        var cube = new THREE.BoxGeometry(this.Width, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane = createMesh(cube, this.Texture);
        plane.rotation.x += PiPola;
        plane.position.x = this.PositionX;
        plane.position.y = this.PositionY - HeightPola + BoardThicknessPola;
        plane.position.z = this.PositionZ;

        meshes.push(plane);

        //leva
        var cube2 = new THREE.BoxGeometry(this.Height, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane2 = createMesh(cube2, this.Texture);
        plane2.rotation.x += PiPola;
        plane2.rotation.y += PiPola;
        plane2.position.x = this.PositionX - WidthPola;
        plane2.position.y = this.PositionY;
        plane2.position.z = this.PositionZ;

        meshes.push(plane2);

        //desna
        var cube3 = new THREE.BoxGeometry(this.Height, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane3 = createMesh(cube3, this.Texture);
        plane3.rotation.x += PiPola;
        plane3.rotation.y += PiPola;
        plane3.position.x = this.PositionX + WidthPola;
        plane3.position.y = this.PositionY;
        plane3.position.z = this.PositionZ;

        meshes.push(plane3);

        //zadnja
        var cube4 = new THREE.BoxGeometry(this.Width, this.Height, this.BoardThickness, 1, 1, 1);
        var plane4 = createMesh(cube4, this.Texture);
        plane4.position.x = this.PositionX;
        plane4.position.y = this.PositionY;
        plane4.position.z = this.PositionZ - DepthPola + BoardThicknessPola;

        meshes.push(plane4);

        //gornja
        var cube5 = new THREE.BoxGeometry(this.Width, this.Depth, this.BoardThickness, 1, 1, 1);
        var plane5 = createMesh(cube5, this.Texture);
        plane5.rotation.x += PiPola;
        plane5.position.x = this.PositionX;
        plane5.position.y = this.PositionY + HeightPola - BoardThicknessPola;
        plane5.position.z = this.PositionZ;

        meshes.push(plane5);

        geometry = mergeMeshes(meshes);
        this.obj = createMesh(geometry, this.Texture);

        if (this.vertikalno == true) {
            if (this.childs != null) {

                var i = this.Width / (this.childs.length + 1);
                for (var k = 0; k < this.childs.length; k++) {
                    this.childs[k] = new Daska(this.BoardThickness, this.Height, this.Depth, - this.Width / 2 + (k + 1) * i + this.PositionX, this.PositionY, this.PositionZ, "daska" + k);
                    this.childs[k].Texture = this.Texture;
                    var mesh = this.childs[k].CreateGeometry();
                    this.obj.add(mesh);
                }

            }

            if (this.nizFioka != null && this.nizFioka.length != 0) {
                var duz = this.Width / (this.childs.length + 1);
                var start = - this.Width / 2 + duz / 2;
                for (var i = 0; i < this.childs.length + 1; i++) {
                    if (this.pozicije_fioka[i] == true) {
                        this.nizFioka[i] = new Fioka(duz, this.Height, this.Depth, this.BoardThickness, start + (i * duz) + this.PositionX, this.PositionY, this.PositionZ, "Fioka" + i);
                        //var f = new Fioka(duz, selected.Height, selected.Depth, selected.BoardThickness, start + (i * duz) + startX, previousObject.position.y + startY, previousObject.position.z + startZ, "Fioka" + i);
                        this.nizFioka[i].Texture = this.Texture;
                        var mesh = this.nizFioka[i].CreateGeometry();
                        this.obj.add(mesh);
                    }
                }
            }


            if (this.nizVrata != null && this.nizVrata.length != 0) {
                var duz = this.Width / (this.childs.length + 1);
                var start = - this.Width / 2 + duz / 2;

                for (var i = 0; i < this.childs.length + 1; i++) {
                    if (this.pozicije_vrata[i] == true) {
                        this.nizVrata[i] = new Vrata(duz, this.Height, this.BoardThickness, start + (i * duz) + this.PositionX, this.PositionY, this.PositionZ + this.Depth / 2 - this.BoardThickness / 2, "nizVrata" + i);
                        this.nizVrata[i].Texture = this.Texture;
                        var mesh = this.nizVrata[i].CreateGeometry();
                        this.obj.add(mesh);
                    }
                }
            }
        }
        else {
            if (this.childs != null) {

                var i = this.Height / (this.childs.length + 1);
                for (var k = 0; k < this.childs.length; k++) {

                    this.childs[k] = new Daska(this.Width, this.BoardThickness, this.Depth, this.PositionX, - this.Height / 2 + (k + 1) * i + this.PositionY, this.PositionZ, "daska" + k);
                    this.childs[k].Texture = this.Texture;
                    var mesh = this.childs[k].CreateGeometry();
                    this.obj.add(mesh);
                }

            }

            if (this.nizFioka != null && this.nizFioka.length != 0) {
                var duz = this.Height / (this.childs.length + 1);
                var start = this.Height / 2 - duz / 2;
                for (var i = 0; i < this.childs.length + 1; i++) {
                    if (this.pozicije_fioka[i] == true) {
                        this.nizFioka[i] = new Fioka(this.Width, duz, this.Depth, this.BoardThickness, this.PositionX, start - (i * duz) + this.PositionY, this.PositionZ, "Fioka" + i);
                        //var f = new Fioka(duz, selected.Height, selected.Depth, selected.BoardThickness, start + (i * duz) + startX, previousObject.position.y + startY, previousObject.position.z + startZ, "Fioka" + i);
                        this.nizFioka[i].Texture = this.Texture;
                        var mesh = this.nizFioka[i].CreateGeometry();
                        this.obj.add(mesh);
                    }
                }
            }

            if (this.nizVrata != null && this.nizVrata.length != 0) {
                var duz = this.Height / (this.childs.length + 1);
                var start = this.Height / 2 - duz / 2;

                for (var i = 0; i < this.childs.length + 1; i++) {
                    if (this.pozicije_vrata[i] == true) {
                        this.nizVrata[i] = new Vrata(this.Width, duz, this.BoardThickness, this.PositionX, start - (i * duz) + this.PositionY, this.PositionZ + this.Depth / 2 - this.BoardThickness / 2, "nizVrata" + i);
                        this.nizVrata[i].Texture = this.Texture;
                        var mesh = this.nizVrata[i].CreateGeometry();
                        this.obj.add(mesh);
                    }
                }
            }
        }


        //scene.add(obj);
        //objects.push(obj);
        this.obj.Name = this.Name;
        return this.obj;
    }


    Box.prototype.addDrawer = fluent(function(selected, drawer){
        var mesh = drawer.CreateGeometry();
        //this.obj.add(mesh);
        selected.add(mesh);
    })

    Box.prototype.addBoard = fluent(function addBoard(selected, board){
        var mesh = board.CreateGeometry();
        //this.obj.add(mesh);
        selected.add(mesh);
    })

    Box.prototype.addDoor = fluent(function addBoard(selected, door) {
        var mesh = door.CreateGeometry();
        //this.obj.add(mesh);
        selected.add(mesh);
    })
    

}


function fluent(fn) {
    return function (...args) {
        fn.apply(this, args);
        return this;
    }
}

function decorateWith(decorator) {
    return (target, name, descriptor) => {
        descriptor.value = decorator.call(target, descriptor.value);
    }
}

/*

@decorateWith(fluent)
adddDrawer(selected, drawer){
    var mesh = drawer.CreateGeometry();
    //this.obj.add(mesh);
    selected.add(mesh);
}

@decorateWith(fluent)
addDoor(selected, door){
    var mesh = drawer.CreateGeometry();
    //this.obj.add(mesh);
    selected.add(mesh);
}

@decorateWith(fluent)
addBoard(selected, board){
    var mesh = drawer.CreateGeometry();
    //this.obj.add(mesh);
    selected.add(mesh);
}*/