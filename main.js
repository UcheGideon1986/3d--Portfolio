
const canvas = document.getElementById("bgCanvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.z = 5;

const uniforms = {
  time: { value: 0.0 }
};

const material = new THREE.ShaderMaterial({
  wireframe: true,
  uniforms: uniforms,
  vertexShader: \`
    uniform float time;
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      vPosition.x += sin(time + vPosition.z * 4.0) / 4.0;
      vPosition.y += cos(time + vPosition.z * 4.0) / 4.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
    }
  \`,
  fragmentShader: \`
    varying vec3 vPosition;
    void main() {
      gl_FragColor = vec4(vPosition * 2.0, 1.0);
    }
  \`
});

const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate(time) {
  requestAnimationFrame(animate);
  uniforms.time.value = time * 0.001;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
