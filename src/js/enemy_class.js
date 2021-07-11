class enemy {
    constructor (health, path_number, speed, img) {
        this.health = health;
        this.path_number = path_number;
        this.point_number = 0;
        this.point_progress = 0;
        this.speed = speed;
        this.should_be_destroyed = false;
        this.img = img;
        this.move();
    }

    move () {
        if (this.point_number < paths[this.path_number].length-1) {
            var current_segment_length = this.find_path_length(this.path_number, this.point_number);
            var current_segment_x_range = paths[this.path_number][this.point_number+1].x - paths[this.path_number][this.point_number].x;
            var current_segment_y_range = paths[this.path_number][this.point_number+1].y - paths[this.path_number][this.point_number].y;
            this.point_progress += this.speed;
            
            if (this.point_progress >= current_segment_length) {
                this.point_progress = 0;
                this.point_number += 1;
            }

            this.x = paths[this.path_number][this.point_number].x + (this.point_progress/current_segment_length)*current_segment_x_range;
            this.y = paths[this.path_number][this.point_number].y + (this.point_progress/current_segment_length)*current_segment_y_range;

        } else {
            this.destroy();
        }
        
    }

    destroy() {
        this.should_be_destroyed = true;
    }

    damage(amount) {
        this.health -= amount;
    }

    tick() {
        if (this.health <= 0) {
            this.should_be_destroyed = true;
        }
    }

    find_path_length (path_number, point_number) {
        var distance = 0;
        if (point_number < paths[path_number].length-1) {
            var first_point = paths[path_number][point_number];
            var second_point = paths[path_number][point_number+1];
            var distance = Math.sqrt(((first_point.x - second_point.x)**2)+((first_point.y - second_point.y)**2));
        }

        return distance;
    }


}