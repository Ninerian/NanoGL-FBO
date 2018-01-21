const glsl = require('glslify')
const Renderer = require('nanogl-renderer')
const Program = require('nanogl').Program
const Node = require('nanogl-node')
const Camera = require('nanogl-camera')
const Circle = require('nanogl-primitives-2d').Circle

const frag = glsl('./glsl/shader.frag')
const vert = glsl('./glsl/shader.vert')

class Scene {
  constructor(renderer) {
    this._onPrerender = this._onPrerender.bind(this)
    this._onRender = this._onRender.bind(this)
    this._onResize = this._onResize.bind(this)

    this.gl = renderer.gl
    this.renderer = renderer
    this.node = new Node
    this.renderer.root.add(this.node)

    this.camera = new Camera.makePerspectiveCamera();
    this.camera.lens.setAutoFov( 43.68 / 180 * Math.PI)
    this.camera.lens.aspect = offsetWidth / offsetHeight;
    this.camera.lens.far = 12000.
    this.camera.lens.near = 0.00001
    this.camera.z = 1
    this.node.add(this.camera)

    this.circle = new Circle(gl, 1.0)
    this.node.add(this.circle)
  }

  activate () {
    this.renderer.events.on('resize', this._onResize)
    this.renderer.events.on('prerender', this._onPrerender)
    this.renderer.events.on('render', this._onRender)
    this._onResize()
  }

  deactivate(){
    this.renderer.events.off('resize', this._onResize)
    this.renderer.events.off('prerender', this._onPrerender)
    this.renderer.events.off('render', this._onRender)
  }

  _onResize() {
    this.camera.updateViewProjectionMatrix( this.renderer.width, this.renderer.height)
  }

  _onPrerender(dt, time, renderer){
    this.camera.updateViewProjectionMatrix( this.renderer.width, this.renderer.height)
    
  }

  _onRender(dt, time, renderer) {

  }
}

const MyRenderer = Renderer({
  init() {
    const gl = this.gl
    const { offsetWidth, offsetHeight } = this;

    gl.viewport(0, 0, offsetWidth, offsetHeight)
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    this.p = new Program(gl)
    this.p.compile(vert, frag)
   
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
      failIfMajorPerformanceCaveat: false
    }
  },

  render(dt) {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    this.p.use()
    this.circle.attribPointer(this.p)
    this.circle.render()
  },

  pixelRatio: 1.0,

  resize() {

    var w = this.width;
    var h = this.height;

    var elw = this.canvasWidth;
    var elh = this.canvasHeight;

    this.gl.viewport(0, 0, w, h);
  }
})

var renderer = new MyRenderer(canvas)

renderer.play()
