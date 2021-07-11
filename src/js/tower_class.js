class tower {
    constructor (x, y, max_health)
    {
        this.x = x;
        this.y = y;

        this.max_health = max_health;
        this.health = max_health;

        this.img = "oven";

        this.angle = 1;

        this.timer = 60;

        this.range = 7;
    }

    tick()
    {
        var i = 0;
        // this.health *= 0.99;

        if (this.health < this.max_health * 0.01)
        {
            i = game_objects.indexOf(this);
            game_objects.splice(i, 1);
        }

        // Check for the nearest enemy
        let best = null;
        let best_dist = this.range * this.range;
        let best_i = null;

        for (i in enemies)
        {
            let e = enemies[i];

            let dist = Math.pow(this.x - e.x, 2.0) + Math.pow(this.y - e.y, 2.0);

            if (dist < best_dist)
            {
                best_i = i;
                best = e;
                best_dist = dist;
            }
        }

        if (best != null)
        {
            // var ctx = global_canvas.getContext("2d");

            let p0 = grid_to_coord(this, global_canvas);
            let p1 = grid_to_coord(best, global_canvas);

            if (this.timer <= 0)
            {
                let attack = new ongoing_attack(this.x, this.y, "enemy", best_i);

                console.log(attack);
            
                ongoing_attacks.push(attack);

                this.timer = 60;
            }

            this.timer -= 1;
            

            // ctx.beginPath();
            // ctx.moveTo(p0.x, p0.y);
            // ctx.lineTo(p1.x, p1.y);
            // ctx.stroke();

            this.angle = Math.atan2(p1.x - p0.x, p0.y - p1.y);
        }
        
    }
}