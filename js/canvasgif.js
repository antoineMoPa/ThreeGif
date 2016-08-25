/*
  Resources: 
  
  * https://gist.github.com/mbostock/5440492
  * http://memfrag.se/blog/simple-vertex-shader-for-2d
  * https://www.opengl.org/wiki/Data_Type_%28GLSL%29#Vector_constructors
  * https://www.opengl.org/wiki/Built-in_Variable_%28GLSL%29
  * https://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf

  */

var anim_len = 10;
var anim_delay = 100;
var frame = 0;
var mouse = [0.0, 0.0];
var smooth_mouse = [0.0, 0.0];

// The main canvas
var canvas = qsa(".result-canvas")[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ratio = canvas.width / window.height;

// Canvas for making gifs
var gif_canvas = qsa(".gif-canvas")[0];
gif_canvas.width = 500;
gif_canvas.height = 500;

var fragment_error_pre = qsa(".fragment-error-pre")[0];
var vertex_error_pre = qsa(".vertex-error-pre")[0];

enable_mouse(canvas);
enable_mouse(gif_canvas);

function enable_mouse(can){
    can.hover = false;
    
    mouse = [can.width / 2.0, can.height / 2.0];
    smooth_mouse = [0.5, 0.5];

    can.addEventListener("mouseenter", function(e){
        can.hover = true;
        mouse = [can.width / 2.0, can.height / 2.0];
    });
    
    can.addEventListener("mousemove", setMouse);
    
    function setMouse(e){
        var x, y;
        
        x = e.clientX
            - can.offsetLeft
            - can.offsetParent.offsetLeft
            + window.scrollX;
        y = e.clientY
            - can.offsetTop
            - can.offsetParent.offsetTop
            + window.scrollY;
        
        mouse = [x, y];
    }
    
    can.addEventListener("mouseleave", function(){
        can.hover = false;
        mouse = [can.width / 2.0, can.height / 2.0];
    });
}

var can = three_canvas({canvas: canvas});
var gif_can = three_canvas({canvas: gif_canvas});

var gif_button = qsa("button[name='make-gif']")[0];

gif_button.addEventListener("click", make_gif);

// Render all the frames
function make_gif(){
    var to_export = {};
    
    to_export.delay = anim_delay;
    to_export.data = [];
    
    gif_can.stop();
    
    for(var i = 0; i < anim_len; i++){
        gif_can.render();
        to_export.data.push(gif_canvas.toDataURL());
    }

    gif_can.start();
    
    export_gif(to_export);
}

// Make the gif from the frames
function export_gif(to_export){
    var gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: "gif-export/lib/gifjs/gif.worker.js"
    });
    
    data = to_export.data;
    
    var images = [];
    
    for(var i = 0; i < data.length; i++){
        var image = new Image();
        image.src = data[i];
        image.onload = imageLoaded;
        images.push(image);
    }
    
    var number_loaded = 0;
    function imageLoaded(){
        number_loaded++;
        if(number_loaded == data.length){
            convert();
        }
    }
    
    function convert(){
        for(var i = 0; i < images.length; i++){    
            gif.addFrame(images[i],{delay: to_export.delay});
        }
        
        gif.render();

        var images_div = qsa(".result-images")[0];
        
        gif.on('finished',function(blob){
            // Create image
            var img = dom("<img>");
            img.src = URL.createObjectURL(blob);

            // Add it to the body
            images_div.insertBefore(img, images_div.firstChild)
        })
    }
}
