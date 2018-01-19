const Renderer = require('nanogl-renderer');
const Program = require('nanogl').Program;
const Circle = require('nanogl-primitives-2d').Circle;

const frag = require('./glsl/shader.frag');
const vert = require('./glsl/shader.vert');

const MyRenderer = Renderer({
  init() {
    const gl = this.gl;
    this.p = new Program(gl);
    this.p.compile(vert, frag);
    this.circle = new Circle(gl);
  },

  getContextOptions() {
    return {
      alpha: true,
      depth: true,
      stencil: true,
      antialias: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      preferLowPowerToHighPerformance: true,
      failIfMajorPerformanceCaveat: false,
    };
  },

  render(dt) {
    console.log(dt);
  },
});

var renderer = new MyRenderer(canvas);
