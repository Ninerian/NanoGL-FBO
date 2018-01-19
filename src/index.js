const glsl = require('glslify')
const Renderer = require('nanogl-renderer')
const Program = require('nanogl').Program
const Circle = require('nanogl-primitives-2d').Circle

const frag = glsl('./glsl/shader.frag')
const vert = glsl('./glsl/shader.vert')

const MyRenderer = Renderer({
  init () {
    const gl = this.gl
    this.p = new Program(gl)
    this.p.compile(vert, frag)
    this.circle = new Circle(gl, 0.5)
  },

  getContextOptions () {
    return {
      alpha: true,
      depth: true,
      stencil: true,
      antialias: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      preferLowPowerToHighPerformance: true,
      failIfMajorPerformanceCaveat: false
    }
  },

  render (dt) {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    this.p.use()
    this.circle.attribPointer(this.p)
    this.circle.render()
  },
  pixelRatio: 1.0
})

var renderer = new MyRenderer(canvas)

renderer.play()
