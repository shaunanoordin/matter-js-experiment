import Matter from 'matter-js'

/*
Primary App Class
 */
class App {
  constructor() {
    const {
      Engine, Render, Runner, Bodies, Composite
     } = Matter
    
    this.canvasWidth = 1000
    this.canvasHeight = 600
    this.hero = null

    // Create Matter.js engine
    this.matterJsEngine = Engine.create()

    // Create Matter.js renderer
    this.matterJsRender = Render.create({
      element: document.querySelector('#app main'),
      engine: this.matterJsEngine,
      options: {
        width: this.canvasWidth,
        height: this.canvasHeight,
        showCollisions: true,
        showPositions: true,
        showAngleIndicator: true,
      }
    })

    // Create objects
    var boxA = Bodies.rectangle(400, 200, 80, 80)
    var boxB = Bodies.rectangle(450, 50, 80, 80)
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

    // Add objects to world
    Composite.add(this.matterJsEngine.world, [boxA, boxB, ground])

    // Run the engine!
    Render.run(this.matterJsRender)
    this.matterJsRunner = Runner.create()
    Runner.run(this.matterJsRunner, this.matterJsEngine)
  }
}

/*
Initialisations
 */
var app
window.onload = function() {
  window.app = new App()
}
