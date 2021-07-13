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

        this.name = type.name;

        this.upgrades = {"speed": 0, "damage": 0};
    }

    damage(amount) {
        this.health -= amount;
    }

    tick()
    {
        var i = 0;
        // this.health *= 0.99;

        if (this.health <= 0)
        {
            i = game_objects.indexOf(this);
            game_objects.splice(i, 1);
        }

        this.attack();
        
    }

    upgrade_speed()
    {
        console.log(this);
        this.upgrades.speed += 1;
    }

    upgrade_damage()
    {
        this.upgrades.damage += 1;
    }

    set_as_selected_menu(index)
    {
        document.getElementById("selection_tower_name").innerText = this.name;
        document.getElementById("upgrade_speed_count").innerText = "Lvl " + this.upgrades.speed;
        document.getElementById("upgrade_damage_count").innerText = "Lvl " + this.upgrades.damage;

        let obj = this;

        document.getElementById("upgrade_speed").onclick = function () { obj.upgrade_speed() };
        document.getElementById("upgrade_damage").onclick = function () { obj.upgrade_damage() };
    }
}