varying vec2 UV;
varying vec3 nor;
varying vec3 vpos;

uniform float time;

void main(void){
    float x = UV.x;
    float y = UV.y;

    vec4 col = vec4(0.0);
    
    float window = 0.0;
    
    col.rgb = vec3(0.1, 0.2, 0.2);
    
    if(abs(nor.y) < 0.2){
        // Not roof or floor
        if(sin(20.0 * x) > 0.0){
            if(sin(50.0 * y) > 0.0){
                window = 1.0;
            }
        }

        col.r += 0.6 * window;
        col.g += 0.4 * window;

        if(window > 0.5){
            // Some jitter
            col.r *= 1.0 + 0.2 * sin(0.1 * vpos.x * vpos.y);
            col.g *= 1.0 + 0.3 * sin(0.2 * vpos.x * vpos.y);
            col.b *= 1.0 + 0.3 * sin(0.04 * vpos.x * vpos.y);
        } else {
            // Some jitter
            col.r *= 1.0 + 0.2 * sin(0.01 * vpos.x * vpos.y);
            col.g *= 1.0 + 0.3 * sin(0.02 * vpos.x * vpos.y);
            col.b *= 1.0 + 0.3 * sin(0.04 * vpos.x * vpos.y);
        }
        
    } else {
        // Either roof or floor
        
    }
    
    col.a = 1.0;
    
    gl_FragColor = col;
}
