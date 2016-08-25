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

    camera.position.z = 1000;
    
    geometry = new THREE.BoxGeometry( 200, 200, 200 );
    material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
    
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    
    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });
    console.log(canvas)
    //renderer.setSize( window.innerWidth, window.innerHeight );

    var exports = {};

    var playing = true;
    
    animate();

    function animate() {
        requestAnimationFrame( animate );
        
        if(playing){
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;
            
            renderer.render( scene, camera );
        }
    }

    exports.start = function(){
        playing = true;
    };

    exports.stop = function(){
        playing = false;
    };
    
    exports.canvas = canvas;
    
    exports.render = function(){
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
        
        renderer.render( scene, camera );
    };
    
    return exports;
}
