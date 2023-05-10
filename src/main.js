import Matter from 'matter-js'

/*
Primary App Class
 */
class App {
  constructor() {
    // module aliases
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
      element: document.querySelector('#app main'),
      engine: engine,
      options: {
        width: 600,
        height: 800,
      }
    });

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    console.log('+++ ', runner)
  }
}

/*
Initialisations
 */
var app;
window.onload = function() {
  window.app = new App();
};
