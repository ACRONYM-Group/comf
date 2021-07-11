class ongoing_attack {
    constructor(source_type, source, target_type, target) {
        this.source = source;
        this.source_type = source_type;
        this.target = target;
        this.target_type = target_type;
        this.progress = 0;
    }

    tick() {
        this.progress += 0.1;
        if (this.source_type == "enemy") {
            var source_x = enemies[source].x;
            var source_y = enemies[source].y;
        } else if (this.source_type == "tower") {
            var source_x = towers[source].x;
            var source_y = towers[source].y;
        } else if (this.source_type == "air") {
            var source_x = 150;
            var source_y = 150;
        } else {
            var source_x = 0;
            var source_y = 0;
        }

        if (this.target_type == "enemy") {
            var target_x = enemies[source].x;
            var target_y = enemies[source].y;
        } else if (this.target_type == "tower") {
            var target_x = towers[source].x;
            var target_y = towers[source].y;
        } else if (this.target_type == "air") {
            var target_x = 150;
            var target_y = 150;
        } else {
            var target_x = 0;
            var target_y = 0;
        }

        this.distance = Math.sqrt(((target_x + source_x)**2)+((target_y + source_y)**2));

        if (this.progress >= this.distance) {
            if (this.target_type == "enemy") {
                enemies[target].damage(1);
            } else if (this.target_type == "tower") {
                towers[target].damage(1);
            }
        }
    }
}