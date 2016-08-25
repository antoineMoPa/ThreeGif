varying vec2 UV;

uniform float time;

void main(){
    vec4 col = vec4(0.0);

    col.rg = floor(5.0 * UV)/5.0;
    col.b = time;
    col.a = 1.0;
    
    gl_FragColor=vec4(col);
}
