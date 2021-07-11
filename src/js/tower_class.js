class tower {
    constructor (x, y, health) {
        this.grid_x = x;
        this.grid_y = y;
        this.x = this.grid_x * grid_pixel_width;
        this.y = this.grid_y * grid_pixel_width;
        this.health = health;
        this.should_be_destroyed = false
        this.random_id = Math.random();
    }

    tick() {
        if (this.health <= 0) {
            this.should_be_destroyed = true;
        }
    }

    damage(amount) {
        this.health -= 1;
    }


}