# Simple particles animation
## Setup
### 1. Include library
full version:<br>
`<script src="anim_particles.js"></script>`<br>
minified version:<br>
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
Create particles from canvas element and optional config.<br>
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
Set mouse X and Y position.<br>
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
`count: number` - particles count<br>
`ctxBackgroundColor: string` - canvas background color<br>
`mainClr: string` - main color<br>
`touchRange: number` - mouse range<br>
`touchClr: string` - color changed when particles interact with mouse<br>
`moveSpeed: number` - maximum particle movement speed<br>
`angSpeed: number` - maximum angle change speed<br>
`maxSize: number` - maximum particle size<br>
`maxLife: number` - maximum particle life value<br>
`maxConnections: number` - maximum number of connections between particles<br>
`connectionLength: number` - maximum connection length between particles
