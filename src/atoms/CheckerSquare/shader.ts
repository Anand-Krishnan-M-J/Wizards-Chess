export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const fragmentShader = `
  uniform float time;
  varying vec2 vUv;

  void main() {
    vec2 center = vec2(0.5, 0.5);
    float distance = distance(vUv, center);

    // Start color: White (marble base)
    vec3 startColor = vec3(1.0, 1.0, 1.0); // Pure white

    // End color: #0d315a (deep blue)
    vec3 endColor = vec3(0.051, 0.192, 0.353);  // Deep marble blue

    // Calculate the color based on distance
    vec3 finalColor = mix(startColor, endColor, smoothstep(0.1, 0.6, distance));

    gl_FragColor = vec4(finalColor, 1.0);
  }
`
