import Matter from 'matter-js'

/*
Primary App Class
 */
class App {
  constructor() {
    const {
      Engine, Render, Runner, Bodies, Events
     } = Matter
    
    this.canvasWidth = 1000
    this.canvasHeight = 600

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
    this.entities = []
    this.hero = this.createEntity(
      {},
      Bodies.rectangle(
        this.canvasWidth / 2, 100,
        20, 40,
        {
          angle: Math.PI/2,
          render: {
            strokeStyle: '#060a19'
          }
        }
      )
    )
    this.createEntity({}, Bodies.rectangle(400, 200, 10, 20))
    this.createEntity({}, Bodies.rectangle(450, 50, 10, 20))
    this.createEntity({}, Bodies.rectangle(this.canvasWidth / 2, 0, this.canvasWidth, 20, { isStatic: true }))
    this.createEntity({}, Bodies.rectangle(this.canvasWidth / 2, this.canvasHeight, this.canvasWidth, 20, { isStatic: true }))
    this.createEntity({}, Bodies.rectangle(0, this.canvasHeight / 2, 20, this.canvasHeight, { isStatic: true }))
    this.createEntity({}, Bodies.rectangle(this.canvasWidth, this.canvasHeight / 2, 20, this.canvasHeight, { isStatic: true }))

    // Add objects to world
    // Composite.add(this.matterJsEngine.world, [boxA, boxB, ground])

    // Setup event listeners
    this.playerInput = {
      // Keys that are currently being pressed.
      // keysPressed = { key: { duration, acknowledged } }
      keysPressed: {},
    }

    Events.on(this.matterJsEngine, 'beforeUpdate', this.main.bind(this))
    document.addEventListener('keydown', this.onKeyDown.bind(this))
    document.addEventListener('keyup', this.onKeyUp.bind(this))

    // Run the engine!
    Render.run(this.matterJsRender)
    this.matterJsRunner = Runner.create()
    Runner.run(this.matterJsRunner, this.matterJsEngine)
  }

  createEntity (data, body) {
    const {
      Composite
     } = Matter

    if (!data || !body) return

    const entity = new Entity(data, body)
    this.entities.push(entity)
    Composite.add(this.matterJsEngine.world, entity.body)
    return entity
  }

  main (event) {
    const { Body, Vector } = Matter
    const hero = this.hero
    const timeStep = event?.delta || 0
    const keysPressed = this.playerInput.keysPressed
    const moveSpeed = 0.005
    const rotateSpeed = 0.1

    if (keysPressed['ArrowLeft']) {
      Body.rotate(hero?.body, -rotateSpeed)
    }

    if (keysPressed['ArrowRight']) {
      Body.rotate(hero?.body, +rotateSpeed)
    }

    if (keysPressed['ArrowDown']) {
      const moveVector = Vector.create(
        moveSpeed * Math.cos(hero?.body.angle),
        moveSpeed * Math.sin(hero?.body.angle)
      )
      Body.applyForce(hero?.body, hero?.body.position, moveVector)
    }

    if (keysPressed['ArrowUp']) {
      const moveVector = Vector.create(
        -moveSpeed * Math.cos(hero?.body.angle),
        -moveSpeed * Math.sin(hero?.body.angle)
      )
      Body.applyForce(hero?.body, hero?.body.position, moveVector)
    }

    // Increment the duration of each currently pressed key
    Object.keys(this.playerInput.keysPressed).forEach(key => {
      if (this.playerInput.keysPressed[key]) this.playerInput.keysPressed[key].duration += timeStep
    })

  }

  onKeyDown (e) {
    // General input
    if (!this.playerInput.keysPressed[e.key]) {
      this.playerInput.keysPressed[e.key] = {
        duration: 0,
        acknowledged: false,
      }
    }
  }

  onKeyUp (e) {
    this.playerInput.keysPressed[e.key] = undefined
  }

}

class Entity {
  constructor (data, body) {
    this.data = data
    this.body = body
  }
}

/*
Initialisations
 */
var app
window.onload = function() {
  window.app = new App()
}
