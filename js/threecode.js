
function three_canvas(params) {
    var scene, camera, renderer;
    var geometry, material, mesh;
    
    var canvas = params.canvas;
    
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(
        75,
        canvas.width / canvas.height,
        1, 10000
    );

    camera.position.z = 400;
    
    geometry = new THREE.BoxGeometry(200, 200, 200);

    var uniforms = {
        time: {value: 1.0},
    };

    material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: params.shaders.vertex,
        fragmentShader: params.shaders.fragment,
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });

    var exports = {};

    var playing = true;
    
    animate();

    function animate() {
        requestAnimationFrame(animate);

        if(playing){
            mesh.rotation.x += 0.01;
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
        mesh.rotation.x = time * 0.5 * Math.PI;
        
        uniforms.time.value = time;
        
        renderer.render(scene, camera);
    };
    
    return exports;
}
