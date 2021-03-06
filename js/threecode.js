
function three_canvas(params) {
    var camera, renderer;
    
    var canvas = params.canvas;
    
    var scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(
        75,
        canvas.width / canvas.height,
        1, 10000
    );

    camera.position.y = 40;
    
    // World sphere
    var sgeometry = new THREE.SphereGeometry(600, 32, 32);
    var smaterial = new THREE.ShaderMaterial({
        vertexShader: params.shaders.sky.vertex,
        fragmentShader: params.shaders.sky.fragment,
        side: THREE.BackSide
    });

    // Ground
    var gmaterial = new THREE.MeshBasicMaterial({
        color: 0x333333
    });
    var ggeometry = new THREE.BoxGeometry( 10000, 0.3, 10000 );
    var gcube = new THREE.Mesh(ggeometry, gmaterial);
    scene.add(gcube);
    
    var sphere = new THREE.Mesh(sgeometry, smaterial);
    sphere.position.x = 0.0;
    sphere.position.y = 0.0;
    sphere.position.z = 0.0;
    
    scene.add(sphere);

    var geometry = new THREE.BoxGeometry(10, 10, 10);

    var uniforms = {
        time: {value: 1.0},
    };

    // Buildings
    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: params.shaders.vertex,
        fragmentShader: params.shaders.fragment,
        side: THREE.DoubleSide
    });

    for(var i = 0; i < 40; i++){
        for(var j = 0; j < 40; j++){
            var height = Math.random() * 30 + 10;

            height += 70 * Math.cos(i/20 + 1);
            height += 70 * Math.cos(j/20 + 1);
            
            geometry = new THREE.BoxGeometry(10, height, 10);
            mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = i * 20 - 400;
            mesh.position.y = 0.0;
            mesh.position.z = j * 20 - 400;
            scene.add(mesh);
        }
    }
    
    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });

    var exports = {};

    var playing = true;
    
    animate();

    function update(time){
        uniforms.time.value = time;
        camera.rotation.y = time * Math.PI;
        camera.updateMatrix();
    }
    
    function animate() {
        requestAnimationFrame(animate);

        var time = new Date().getTime() / 10000;
        update(time);
        
        if(playing){
            uniforms.time.value += 0.05;
            renderer.render(scene, camera);
        }
    }

    exports.start = function(){
        playing = true;
    };

    exports.stop = function(){
        playing = false;
    };
    
    exports.canvas = canvas;
    
    exports.render = function(time){
        update(time);
        
        renderer.render(scene, camera);
    };
    
    return exports;
}
