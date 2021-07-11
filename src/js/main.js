var global_canvas = undefined;
var global_image = undefined;
var global_images = {};

var game_state = "menu";

var grid_size = 50;

var game_objects = [{"pos": {"x":0, "y":0}, "img": "blank"}, {"pos": {"x":-1, "y":0}, "img": "blank"}, {"pos": {"x":1, "y":0}, "img": "blank"}];

function draw()
{
    if (typeof global_canvas === "undefined")
    {
        global_canvas = document.getElementById("main_canvas");
    }

    if (typeof global_image === "undefined")
    {
        global_image = document.getElementById("main_menu")
    }

    if (game_state === "menu")
    {
        global_image.style.display = "block";
    }
    else
    {
        global_image.style.display = "none";
    }

    if (game_state === "in_game")
    {
        global_canvas.width = global_canvas.offsetWidth;
	    global_canvas.height = global_canvas.offsetHeight;

        var ctx = global_canvas.getContext("2d");
        
        draw_game(global_canvas, ctx);
    }
}

function draw_game(canvas, ctx)
{
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (e in enemies)
    {
        draw_game_object(enemies[e], canvas, ctx);
    }

    for (e in ongoing_attacks)
    {
        draw_game_object(ongoing_attacks[e], canvas, ctx);
    }
}

function grid_to_coord(grid_pos, canvas)
{
    return {"x": Math.round(canvas.width / 2) + grid_pos.x * grid_size, "y": Math.round(canvas.height / 2) + grid_pos.y * grid_size}
}

function draw_game_object(obj, canvas, ctx)
{
    ctx.fillStyle = "red";

    width = 25;
    height = 25;

    pos = grid_to_coord(obj, canvas);

    img = get_image("blank");

    ctx.drawImage(img, pos.x - img.width / 2, pos.y - img.height / 2);
}

function tick_game()
{
    for (index in enemies) {
        enemies[index].tick();
        enemies[index].move();
        if (enemies[index].should_be_destroyed) {
            enemies.splice(index, 1);
            for (index_2 in ongoing_attacks) {
                console.log(ongoing_attacks[index_2].target);
                if (ongoing_attacks[index_2].target > index) {
                    ongoing_attacks[index_2].target -= 1;
                }
                if (ongoing_attacks[index_2].target == index) {
                    ongoing_attacks[index_2].lock_target = true;
                    // ongoing_attacks[index_2].target.should_be_destroyed = true;
                    // ongoing_attacks.splice(index_2, 1);
                }
            }
        }

    }

    for (index in ongoing_attacks) {
        ongoing_attacks[index].tick();
        if (ongoing_attacks[index].should_be_destroyed) {
            ongoing_attacks.splice(index, 1);
        }

    }
}

function switch_to_game()
{
    game_state = "in_game";
}

function get_image(img_name)
{
    if (typeof global_images[img_name] === "undefined")
    {
        img = document.getElementById(img_name + "_img");

        if (img === null)
        {
            alert("Unable to load image " + img_name)
        }

        global_images[img_name] = img;
    }

    return global_images[img_name];
}

function main_loop()
{
    draw();

    if (game_state == "in_game")
    {
        tick_game();
    }
}

function create_enemies() {
    enemies.push(new enemy(3, 0, .06))
    enemies.push(new enemy(3, 1, .06))
}

function create_projectiles() {

    for (var i = 0; i < 1; i++) {
        if (enemies.length != 0) {
            var target_id = getRandomInRange(0, enemies.length-1);
            ongoing_attacks.push(new ongoing_attack("air", 0, "enemy", target_id));
        }
    }
    
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(main_loop, (1000/60));

setInterval(create_enemies, 500);

setInterval(create_projectiles, 100);

window.onload = function()
{
    document.getElementById("main_menu").onclick = function()
    {
        switch_to_game();
    }
}