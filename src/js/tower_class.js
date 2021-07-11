class tower {
    constructor (x, y, type)
    {
        this.x = x;
        this.y = y;

        this.max_health = type.health;
        this.health = type.health;

        this.img = type.img;

        this.angle = 0;

        this.timer = 60;

        this.range = type.range;

        this.attack = type.attack;

        this.frame_number = 0;

        this.frame_timer = 0;

        this.img_type = type.img_type;

        this.selected = false;
    }

    damage(amount) {
        this.health -= amount;
    }

    tick()
    {
        var i = 0;
        // this.health *= 0.99;

        if (this.health < this.max_health * 0.01)
        {
            i = game_objects.indexOf(this);
            game_objects.splice(i, 1);
        }

        this.attack();
        
    }
}