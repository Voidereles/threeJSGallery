uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653;
uniform float distanceFromCenter;
uniform vec2 pixels;

void main() {
    // vUv = (uv - vec2(0.5))*0.7 + vec2(0.5); //no zooming
    vUv = (uv - vec2(0.6))*(0.9 - 0.1*distanceFromCenter*(2. - distanceFromCenter)) + vec2(0.5);
    vec3 pos = position;

// pos.x -= sin(PI.uv.x) * 0.01;
pos.y += sin(PI*uv.x) * 0.02;
pos.z -= sin(PI*uv.x) * 0.1;
//bending

    pos.y += sin(time*0.3)*0.02;
    vUv.y += sin(time*0.3)*0.02;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}