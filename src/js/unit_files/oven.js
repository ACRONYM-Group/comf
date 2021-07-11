var tower_oven = {
    "attack": function() {
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
    
                //console.log(attack);
            
                ongoing_attacks.push(attack);
    
                this.timer = 240;
            }
    
            this.timer -= 1;
            
    
            // ctx.beginPath();
            // ctx.moveTo(p0.x, p0.y);
            // ctx.lineTo(p1.x, p1.y);
            // ctx.stroke();
    
            this.angle = Math.atan2(p1.x - p0.x, p0.y - p1.y);
        }
    },
    "img":"oven",
    "img_type":"png",
    "range":7
}
