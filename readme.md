# Simple particles animation
## Setup
### 1. Include library
full version:
`<script src="anim_particles.js"></script>`
minified version:
`<script src="anim_particles.min.js"></script>`
### 2. Create particles
```javascript
// setup and start particles
(function() {
    let canvas = document.querySelector('canvas');
    let particleController = new fireParticles(canvas);
    let onResize = () => {
        particleController.resizeCanvas(window.innerWidth, window.innerHeight);
    }
    let onMouseMove = (evt) => {
        particleController.setMouse(evt.clientX, evt.clientY);
    }
    // resize drawing area on start
    onResize();

    // add callbacks to resize drawing area and reaction for mouse move
    window.addEventListener('resize', onResize);
    document.addEventListener('mousemove', onMouseMove);
    particleController.startRender();

    // now we can access particleController in controlers from website outside this function
    window.particles = particleController;
})();
```
We got working particles with default configuration!
## fireParticles class methods
#### constructor(required canvas element, optional config object)
Create particles from canvas element and optional config.
You can't change canvas element later.
#### startRender()
Start particles animation.
#### stopRender()
Stop particles animation.
#### clearRender()
Clear only canvas.
#### clear()
Clear canvas and all dots.
#### applyConfig(config object)
Set particles config, can be changed when particles animation is running.
#### setMouse(number X, number Y)
Set mouse X and Y position.
You can set null and particles will not interact with mouse.
#### resizeCanvas(number Width, number Height)
Set canvas resolution in pixels.
## Config
Default configuration:
```javascript
config = {
    count: 300,
    ctxBackgroundColor: '#000000', 
    mainClr: '#cccccc',
    touchRange: 100,
    touchClr: '#ff0000', 
    moveSpeed: 2, 
    angSpeed: 30,
    maxSize: 0.7,
    maxLife: 12,
    maxConnections: 3,
    connectionLength: 80
}
```
`count: number` - particles count
`ctxBackgroundColor: string` - canvas background color
`mainClr: string` - main color
`touchRange: number` - mouse range
`touchClr: string` - color changed when particles interact with mouse
`moveSpeed: number` - maximum particle movement speed
`angSpeed: number` - maximum angle change speed
`maxSize: number` - maximum particle size
`maxLife: number` - maximum particle life value
`maxConnections: number` - maximum number of connections between particles
`connectionLength: number` - maximum connection length between particles
