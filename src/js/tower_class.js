class tower {
    constructor (x, y, max_health)
    {
        this.x = x;
        this.y = y;

        this.max_health = max_health;
        this.health = max_health;

        this.img = "blank";
    }

    tick()
    {
        var i = 0;
        this.health *= 0.99;

        if (this.health < this.max_health * 0.01)
        {
            i = ocupied_cells.indexOf([this.x, this.y]);
            ocupied_cells.splice(i, 1);

            i = game_objects.indexOf(this);
            game_objects.splice(i, 1);
        }
    }
}