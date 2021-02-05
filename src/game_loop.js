class GameLoop {
    constructor(grid, ctx) {
        this.grid = grid;
        this.ctx = ctx;
        this.client = 0;
        // this.addKeyBindings = this.addKeyBindings.bind(this);
    }

    start() {
        this.lastTime = 0;
        //start the animation
        //call the add key bindings method here
        
        this.addKeyBindings(this) //passed this in as a parameter
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        const timeDelta = time - this.lastTime;

        // this.grid.step(timeDelta);
        this.grid.draw(this.ctx);
        this.lastTime = time;

        requestAnimationFrame(this.animate.bind(this));
    }

    //add key binding method here
    addKeyBindings(that) { 
        //so that that could equal this and be used to access this.grid.player  
        //I do not know why i had to do it this way.  I found it out using trial by error and google
        document.addEventListener('keydown', function (event) {
            event.preventDefault()
            let client = that.grid.player;
            console.log(client);
            if (event.keyCode === 37) {
                //left
               client.keyLeft = true;
               
            }
            else if (event.keyCode === 39) {
                //right
               client.keyRight = true;
               
            }
            else if (event.keyCode === 38) {
                //up
               client.keyUp = true;
               
            }
            else if (event.keyCode === 40) {
                //down
               client.keyDown = true;
               
            } 
        });
        document.addEventListener('keyup', function (event) {
            let client = that.grid.player;
            if (event.keyCode === 37) {
                //left
               client.keyLeft = false;
            //    client.canMove = true;
               
            }
            else if (event.keyCode === 39) {
                //right
               client.keyRight = false;
            //    client.canMove = true;
               
            }
            else if (event.keyCode === 38) {
                //up
               client.keyUp = false;
            //    client.canMove = true;
               
            }
            else if (event.keyCode === 40) {
                //down
               client.keyDown = false;
            //    client.canMove = true;
               
            }
        });

    }

   

}
module.exports = GameLoop;