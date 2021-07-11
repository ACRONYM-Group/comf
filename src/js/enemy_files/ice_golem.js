var enemy_ice_golem = {
    "attack": function() {
        // Check for the nearest enemy
        let best = null;
        let best_dist = this.range * this.range;
        let best_i = null;
        console.log(best_dist);
    
        for (i in game_objects)
        {
            let e = game_objects[i];
    
            let dist = Math.pow(this.x - e.x, 2.0) + Math.pow(this.y - e.y, 2.0);
            if (dist < best_dist)
            {
                best_i = i;
                best = e;
                best_dist = dist;
            }
        }
    
        console.log(best);
        if (best != null)
        {
            // var ctx = global_canvas.getContext("2d");
    
            let p0 = grid_to_coord(this, global_canvas);
            let p1 = grid_to_coord(best, global_canvas);
    
            if (this.timer <= 0)
            {
                console.log("ICE GOLEM ATTACK");
                let attack = new ongoing_attack(this.x, this.y, "tower", best_i);
            
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
    },
    "type":"ice_golem",
    "img":"ice_golem",
    "img_type":"png",
    "health":5.0,
    "speed":0.05,
    "cost":5.0,
    "range":7
}
