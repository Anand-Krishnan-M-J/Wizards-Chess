export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
uniform float time;
varying vec2 vUv;

void main() {
    vec2 center = vec2(0.5, 0.5); // Center of the screen
    float distance = distance(vUv, center); // Distance from the center

    // Start color: White (marble base)
    vec3 startColor = vec3(1.0, 1.0, 1.0); // Pure white

    // End color: Magical Violet
    vec3 endColor = vec3(0,0,0); // A violet color (RGB: 148, 0, 211)

    // Calculate the color based on distance
    vec3 finalColor = mix(startColor, endColor, smoothstep(0.1, 0.6, distance));

    gl_FragColor = vec4(finalColor, 1.0); // Output the final color
  }
`;
