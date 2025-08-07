
const canvas = document.getElementById("cubeCanvas");
const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
