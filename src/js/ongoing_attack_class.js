class ongoing_attack {
    constructor(source_type, source, target_type, target) {
        this.source = source;
        this.source_type = source_type;
        this.target = target;
        this.target_type = target_type;
        this.progress = 0;
        this.should_be_destroyed = false;
        this.lock_target = false;
        this.speed = 0.15;
        this.target_random_id = enemies[this.target].random_id;
        this.img = "blank";

        if (this.source_type == "enemy") {
            this.source_x = enemies[this.source].x;
            this.source_y = enemies[this.source].y;
        } else if (this.source_type == "tower") {
            this.source_x = towers[this.source].x;
            this.source_y = towers[this.source].y;
        } else if (this.source_type == "air") {
            this.source_x = 0;
            this.source_y = 0;
        } else if (this.source_type == "random") {
            this.source_x = getRandomInRange(-15,15);
            this.source_y = getRandomInRange(-5,5);
        } else {
            this.source_x = 0;
            this.source_y = 0;
        }

        this.x = this.source_x;
        this.y = this.source_y;

        this.find_target();
    }

    find_target() {
        if (this.target_type == "enemy") {
            this.target_x = enemies[this.target].x;
            this.target_y = enemies[this.target].y;
        } else if (this.target_type == "tower") {
            this.target_x = towers[this.target].x;
            this.target_y = towers[this.target].y;
        } else if (this.target_type == "air") {
            this.target_x = 0;
            this.target_y = 0;
        } else {
            this.target_x = 0;
            this.target_y = 0;
        }
    }

    tick() {

        if (enemies[this.target].random_id != this.target_random_id) {
            this.should_be_destroyed = true;

        }

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

        this.x -= (this.speed/distance)*current_segment_x_range;
        this.y -= (this.speed/distance)*current_segment_y_range;

        // var ctx = global_canvas.getContext("2d");
        // ctx.strokeStyle = "red";
        // ctx.beginPath();
        // ctx.moveTo(Math.round(global_canvas.width / 2) + this.x*grid_size, Math.round(global_canvas.height / 2) + this.y*grid_size);
        // ctx.lineTo(Math.round(global_canvas.width / 2) + this.target_x*grid_size, Math.round(global_canvas.height / 2) + this.target_y*grid_size);
        // ctx.stroke();

        
        if (distance < 0.1) {
            if (!this.lock_target) {
                if (this.target_type == "enemy") {
                    enemies[this.target].damage(3);
                } else if (this.target_type == "tower") {
                    towers[this.target].damage(3);
                }
            }
            
            this.should_be_destroyed = true;
        }
    }
}