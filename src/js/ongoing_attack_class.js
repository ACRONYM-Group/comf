class ongoing_attack {
    constructor(x, y, target_type, target, damage) {
        this.target = target;
        this.target_type = target_type;
        this.progress = 0;
        this.should_be_destroyed = false;
        this.lock_target = false;
        this.speed = 0.35;
        if (target_type == "enemy") {
            this.img = "cookie";
        } else {
            this.img = "snowball";
        }
        
        this.img_type = "png";

        this.x = x;
        this.y = y;

        this.find_target();

        if (damage == undefined)
        {
            this.damage = 1;
        }
        else
        {
            this.damage = damage;
        }
    }

    find_target() {
        if (this.target >= game_objects.length && this.target_type == "tower") {
            this.lock_target = true;
        } else {
            if (this.target < enemies.length) {
                if (this.target_type == "enemy") {
                    this.target_x = enemies[this.target].x;
                    this.target_y = enemies[this.target].y;
                } else if (this.target_type == "tower") {
                    this.target_x = game_objects[this.target].x;
                    this.target_y = game_objects[this.target].y;
                } else if (this.target_type == "air") {
                    this.target_x = 0;
                    this.target_y = 0;
                } else {
                    this.target_x = 0;
                    this.target_y = 0;
                }
            }
        }
        
        
    }

    tick() {


        this.last_target_x = this.target_x;
        this.last_target_y = this.target_y;
        if (!this.lock_target) {
            this.find_target();
        }
        

        // this.progress += .05;

        var distance = Math.sqrt(((this.target_x - this.x)**2)+((this.target_y - this.y)**2));

        var current_segment_x_range = this.x - this.target_x;
        var current_segment_y_range = this.y - this.target_y;

        // this.x = this.source_x + (this.progress/distance)*-current_segment_x_range;
        // this.y = this.source_y + (this.progress/distance)*-current_segment_y_range;

        // this.source_x = this.x;
        // this.source_y = this.y;
        // this.progress = 0;

        if (!this.lock_target) {
            this.delta_x = (this.speed/distance)*current_segment_x_range;
            this.delta_y = (this.speed/distance)*current_segment_y_range;
        }
        
        this.x -= this.delta_x;
        this.y -= this.delta_y;

        // var ctx = global_canvas.getContext("2d");
        // ctx.strokeStyle = "red";
        // ctx.beginPath();
        // ctx.moveTo(Math.round(global_canvas.width / 2) + this.x*grid_size, Math.round(global_canvas.height / 2) + this.y*grid_size);
        // ctx.lineTo(Math.round(global_canvas.width / 2) + this.target_x*grid_size, Math.round(global_canvas.height / 2) + this.target_y*grid_size);
        // ctx.stroke();

        if (this.target_type == "enemy") {
            for (e in enemies) {
                if (Math.sqrt(((enemies[e].x - this.x)**2)+((enemies[e].y - this.y)**2)) < 1) {
                    enemies[e].damage(1);
                    this.should_be_destroyed = true;
                }
            }
        } else if (this.target_type == "tower") {
            for (e in game_objects) {
                if (Math.sqrt(((game_objects[e].x - this.x)**2)+((game_objects[e].y - this.y)**2)) < 1) {
                    game_objects[e].damage(1);
                    this.should_be_destroyed = true;
                }
            }
        }
    }
}