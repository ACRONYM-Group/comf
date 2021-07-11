var global_canvas = undefined;
var global_image = undefined;
var global_images = {};

var game_state = "menu";

var grid_size = 32;

var game_objects = [new tower(-1, 0, 10.0, tower_oven)]; //new tower(0, 0, 10.0, tower_oven)

var is_speed = false;

var tower_to_place = undefined;

var cursor_pos = {"x": 3, "y": 3};

var path = [];

var autostart = false;

function draw()
{

    // cold_hard_cash_display = document.getElementById("cold_hard_cash_display");
    // cold_hard_cash_display.innerText = "$CHC " + cold_hard_cash;

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

var background_height = 0;
var background_width = 0;

function draw_game(canvas, ctx)
{
    document.getElementById("chc_counter_value").innerHTML = cold_hard_cash;
    document.getElementById("wave_2").innerHTML = spawn_state.wave;

    document.getElementById("health_value").innerHTML = comfort_value;

    back = get_image("Lizs_forest_post-logging");
    console.log(canvas.width);
    ctx.drawImage(back, 0, 0,canvas.width,canvas.height-116);
    background_width = canvas.width;
    background_height = canvas.height-116;
    

    for (e in enemies)
    {
        draw_game_object(enemies[e], canvas, ctx, undefined, undefined, undefined, enemies[e].scale());
    }

    for (e in ongoing_attacks)
    {
        draw_game_object(ongoing_attacks[e], canvas, ctx);
    }

    for (t in game_objects)
    {
        draw_game_object(game_objects[t], canvas, ctx, game_objects[t].health / game_objects[t].max_health, game_objects[t].angle);
    }

    if (typeof tower_to_place !== "undefined")
    {
        let obj = new tower(cursor_pos.x, cursor_pos.y, 1, tower_to_place);
        draw_game_object(obj, canvas, ctx, undefined, undefined, obj.range, 1, 0.5);
    }
}

function grid_to_coord(grid_pos, canvas)
{
    x_ratio = background_width/1920;
    y_ratio = background_height/821;
    return {"x": Math.round(canvas.width / 2) + grid_pos.x * (grid_size*(x_ratio)), "y": Math.round((canvas.height-116) / 2) + grid_pos.y * (grid_size*y_ratio)}
}

function draw_game_object(obj, canvas, ctx, health_bar, angle, range, scale, alpha)
{
    if (typeof angle === "undefined")
    {
        angle = 0;
    }

    if (typeof scale === "undefined")
    {
        scale = 1;
    }

    if (typeof alpha === "undefined")
    {
        alpha = 1;
    }

    pos = grid_to_coord(obj, canvas);

    img = get_image(obj.img);

    ctx.save();

    x_ratio = background_width/1920;
    y_ratio = background_height/1080;

    ctx.translate(pos.x, pos.y);

    ctx.globalAlpha = alpha;

    ctx.rotate(angle);
    if (obj.img_type == "png") {
        ctx.drawImage(img, - img.width * scale / 2, - img.height * scale / 2, img.width * scale, img.height * scale);
        // var ctx = global_canvas.getContext("2d");
        // ctx.strokeStyle = "red";
        // ctx.beginPath();
        // ctx.moveTo(- img.width / 2,  - img.height / 2);
        // ctx.lineTo(- img.width / 2+50,  - img.height / 2);
        // ctx.moveTo(- img.width / 2,  - img.height / 2);
        // ctx.lineTo(- img.width / 2,  - img.height / 2+50);
        // ctx.stroke();
    } else if (obj.img_type == "spritesheet") {
        ctx.translate(0, 105);
        ctx.drawImage(img, 0, (obj.frame_number*16), 16, 16, - img.width * scale / 2, - img.height * scale / 2, 16 * scale, 16 * scale);
        obj.frame_timer += 1;
        if (obj.frame_timer >= 10) {
            obj.frame_timer = 0;
            obj.frame_number += 1;
        }
        if (obj.frame_number >= 14) {
            obj.frame_number = 0;
        }
    }

    

    ctx.restore();

    if (typeof health_bar !== "undefined")
    {
        ctx.fillStyle = "grey";

        ctx.fillRect(pos.x - grid_size * 0.4, pos.y + grid_size * 0.4, grid_size * 0.8, grid_size * 0.15);

        ctx.fillStyle = "green";

        ctx.fillRect(pos.x - grid_size * 0.4, pos.y + grid_size * 0.4, grid_size * 0.8 * health_bar, grid_size * 0.15);
    }
    
    if (typeof range !== "undefined")
    {
        r = range * grid_size;
        ctx.fillStyle = "#E0C0C040";
        ctx.beginPath();
        ctx.ellipse(pos.x, pos.y, r, r, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function tick_game()
{
    for (index in enemies) {
        enemies[index].tick();
        enemies[index].move();
        if (enemies[index].should_be_destroyed)
        {
            enemies.splice(index, 1);
            for (index_2 in ongoing_attacks) {
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

    for (index in game_objects)
    {
        game_objects[index].tick();
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
            alert("Unable to load image " + img_name);
        }

        global_images[img_name] = img;
    }

    return global_images[img_name];
}

function deal_damage_to_player(amount) {
    comfort_value -= amount;
    if (comfort_value <= 0) {
        alert("GAME OVER");
        location.reload();
    }
}

function main_loop()
{
    draw();

    let count = 1;

    if (is_speed)
    {
        count = 3;

        document.getElementById("fastwave").classList.add("button_disabled");
    }
    else
    {
        document.getElementById("fastwave").classList.remove("button_disabled");
    }

    for (let i = 0; i < count; i += 1)
    {
        if (game_state == "in_game")
        {
            tick_game();
            spawn_enemy_tick();
        }
    }
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function click_canvas(canvas, x, y)
{
    x -= canvas.width / 2;
    y -= canvas.height / 2;

    x_ratio = background_width/1920;
    y_ratio = background_height/821;

    y += 58

    x /= grid_size*x_ratio;
    y /= grid_size*y_ratio;
    
    if (typeof tower_to_place !== "undefined")
    {
        


        for (i in game_objects)
        {
            g = game_objects[i];
            if (g.x == Math.round(x) && g.y == Math.round(y))
            {
                return;
            }
        }

        if (cold_hard_cash >= tower_to_place.cost) {
            game_objects.push(new tower(Math.round(x), Math.round(y), 10, tower_to_place));
            cold_hard_cash -= tower_to_place.cost;
        }
    }
    else
    {
        path.push({"x": x, "y": y});

        console.log(path);
    }
}

function mouse_canvas(canvas, x, y)
{
    x -= canvas.width / 2;
    y -= canvas.height / 2;


    x_ratio = background_width/1920;
    y_ratio = background_height/821;

    y += 58

    x /= grid_size*x_ratio;
    y /= grid_size*y_ratio;




    cursor_pos = {"x": Math.round(x), "y": Math.round(y)};
    
}

function key_press(e)
{
    if (e.keyCode === 27)
    {
        tower_to_place = undefined;
    }
}

function right_click(e)
{
    tower_to_place = undefined;

    e.disableDefault();
}

setInterval(main_loop, (1000/60));

window.onload = function()
{
    document.getElementById("tower1").onclick = function() { tower_to_place = tower_oven; };
    document.getElementById("tower2").onclick = function() { tower_to_place = tower_campfire; };

    document.getElementById("main_canvas").addEventListener('contextmenu', function (e) { 
        tower_to_place = undefined;
        e.preventDefault(); 
      }, false);

    document.getElementById("main_menu").onclick = function()
    {
        switch_to_game();
    }

    document.getElementById("main_canvas").onclick = function(e)
    {
        canvas = document.getElementById("main_canvas");

        x = e.x;
        y = e.y;

        var bbox = canvas.getBoundingClientRect();
        
        click_canvas(canvas,  x - bbox.left * (canvas.width  / bbox.width),
                    y - bbox.top  * (canvas.height / bbox.height)
        );
    }

    document.getElementById("main_canvas").onmousemove = function(e)
    {
        canvas = document.getElementById("main_canvas");

        x = e.x;
        y = e.y;

        var bbox = canvas.getBoundingClientRect();
        
        mouse_canvas(canvas,  x - bbox.left * (canvas.width  / bbox.width),
                    y - bbox.top  * (canvas.height / bbox.height)
        );
    }
    
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  window.addEventListener('keydown',key_press,false);