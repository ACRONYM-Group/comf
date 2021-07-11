class tower {
    constructor (x, y, health) {
        this.grid_x = x;
        this.grid_y = y;
        this.x = this.grid_x * grid_pixel_width;
        this.y = this.grid_y * grid_pixel_width;

        this.health = health;
    }


}