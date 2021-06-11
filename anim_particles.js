class fireParticles {
    canvas = null;
    ctx = null;
    allowRender = false;
    pause = false;
    dots = [];
    mouse = {x: null, y: null};

    // default config
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
    };

    // new fireParticles(required canvas element, optional config object)
    constructor(setCanvas = null, setConfig = null){
        if (setConfig) {
            this.config = {...this.config, ...setConfig};
        }
        if (setCanvas) {
            this.allowRender = true;
            this.ctx = setCanvas.getContext('2d');
            this.canvas = setCanvas;
            this.canvas.style['background-color'] = this.config.ctxBackgroundColor;
        }
    }

    // start animation
    startRender() {
        this.pause = false;
        requestAnimationFrame(() => {
            this.renderer(this);
        });
    }

    // stop animation
    stopRender() {
        this.pause = true;
    }

    // clear canvas
    clearRender() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // clear particles table and canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.dots = [];
    }

    // change config
    applyConfig(setConfig = {}) {
        this.config = {...this.config, ...setConfig};
        this.canvas.style['background-color'] = this.config.ctxBackgroundColor;}

    // setting mouse or fake mouse position
    setMouse(x, y) {
        this.mouse = {x: x, y: y};
    }

    // function to change canvas resolution
    resizeCanvas(width, height) {
        this.ctx.width = this.canvas.width = width;
        this.ctx.height = this.canvas.height = height;
    }

    // main renderer function
    renderer(parent) {
        parent.ctx.clearRect(0, 0, parent.canvas.width, parent.canvas.height);
        for (let i = 0;i < parent.config.count; i++) {
            let dot = parent.dots[i];
            // add dots
            if (!dot) {
                dot = {};
                // dot position
                dot.x = Math.random() * parent.canvas.width;
                dot.y = Math.random() * parent.canvas.height;
                // dot max size
                dot.s = Math.random() * parent.config.maxSize;
                // start angle
                dot.a = Math.ceil(Math.random() * 360);
                // dot life time
                dot.life = Math.random() * parent.config.maxLife;
                // time to change angle
                dot.an = Math.random();
                // dot colors
                dot.c = parent.config.mainClr;
                dot.c2 = parent.config.touchClr;
                // add dot to table
                parent.dots[i] = dot;
            }
            // all dots can exist for specified time
            if (dot.life < 0) {
                // dot time ended, poor dot died.
                delete parent.dots[i];
            } else {
                // dot is still alive
                dot.life -= 0.01;
                dot.an -= 0.01;
                // when it's time to change angle...
                if (dot.an < 0) {
                    // random angle
                    dot.a += (parent.config.angSpeed / 2) - Math.random() * parent.config.angSpeed;
                    // and random time to change angle again
                    dot.an = Math.random() * 3;
                }
                // when touchRange is more than 0 here we're changing dot color
                if (dot.ms) {
                    dot.ms -= 0.01;
                    if(dot.ms < 0) {
                        delete dot.ms;
                        parent.ctx.fillStyle = parent.ctx.strokeStyle = dot.c;
                    } else {
                        parent.ctx.fillStyle = parent.ctx.strokeStyle = dot.c2;
                    }
                } else {
                    parent.ctx.fillStyle = parent.ctx.strokeStyle = dot.c;
                }
                // and dot speed
                if (!dot.ms) {
                    dot.x += Math.random() * Math.cos(dot.a) * parent.config.moveSpeed;
                    dot.y += Math.random() * Math.sin(dot.a) * parent.config.moveSpeed;
                } else {
                    dot.x += Math.random() * Math.cos(dot.a) * parent.config.moveSpeed * 3;
                    dot.y += Math.random() * Math.sin(dot.a) * parent.config.moveSpeed * 3;
                }
                // prevents it from running away from the screen, they're closed until they die...
                if (dot.x < 0) dot.x = 0;
                if (dot.y < 0) dot.y = 0;
                if (dot.x > parent.canvas.width) dot.x = parent.canvas.width;
                if (dot.y > parent.canvas.height) dot.y = parent.canvas.height;
                // draw dot on specified position with specified size
                parent.ctx.beginPath();
                parent.ctx.arc(dot.x, dot.y, dot.s, 0, 2*Math.PI);
                parent.ctx.stroke();
                parent.ctx.fill();
                parent.ctx.closePath();
                dot.has = 0;
                // check mouse range if mouse is defined (if we don't add setMouse(x, y) nowhere, dots will not interact with mouse
                if(parent.mouse.x){
                    if(parent.dist(dot.x, dot.y, parent.mouse.x, parent.mouse.y) < parent.config.touchRange) {
                        dot.ms = 1 + Math.random();
                        dot.a = parent.dir(dot.x, dot.y, parent.mouse.x, parent.mouse.y) + 180;
                    }
                }
                // now draw connections between near dots
                for (let d = 0; d < parent.config.count; d++) {
                    // iterate all dots, check if our dot is not out of connections limit
                    if (parent.dots[d] && dot.has < parent.config.maxConnections ) {
                        let dot2 = parent.dots[d];
                        if (parent.dist(dot.x, dot.y, dot2.x, dot2.y) < parent.config.connectionLength) {
                            // we got connection, draw line between our dot and found near dot2
                            dot.has++;
                            parent.ctx.lineWidth = (dot.s + dot2.s) / 2;
                            parent.ctx.beginPath();
                            parent.ctx.moveTo(dot.x, dot.y);
                            parent.ctx.lineTo(dot2.x, dot2.y);
                            parent.ctx.closePath();
                            parent.ctx.stroke();
                        }
                    }

                }
            }
        }
        // if we use stopRender parent.pause will be equal to true which means here we will not request next animation frame
        if (!parent.pause) requestAnimationFrame(() => {
            parent.renderer(parent);
        });
    }

    // calculating direction, inside class ( to do not collide with your code :) )
    dir(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    // calculating distance between 2 points
    dist(x1, y1, x2, y2) {
        let a = x1 - x2,
            b = y1 - y2;
        return Math.sqrt(  a * a + b * b );
    }
}
