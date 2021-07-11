var tower_campfire = {
    "attack": function() {

        this.timer -= 1;

        if (this.timer <= 0) {
            for (i in enemies)
            {
                let e = enemies[i];
        
                let dist = Math.pow(this.x - e.x, 2.0) + Math.pow(this.y - e.y, 2.0);
        
                if (dist < this.range)
                {
                    enemies[i].damage(1);
                }
            }
            this.timer = 240;
        }
    },
    "img":"campfire",
    "img_type":"spritesheet",
    "range":3,
    "cost":50,
    "health":20.0
}
