var global_canvas = undefined;
var global_image = undefined;
var global_images = {};

var game_state = "menu";

var grid_size = 50;

var game_objects = [new tower(0, 0, 10.0)];
var ocupied_cells = [];

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

    for (t in game_objects)
    {
        console.log(game_objects[t]);
        draw_game_object(game_objects[t], canvas, ctx, game_objects[t].health / game_objects[t].max_health);
    }
}

function grid_to_coord(grid_pos, canvas)
{
    return {"x": Math.round(canvas.width / 2) + grid_pos.x * grid_size, "y": Math.round(canvas.height / 2) + grid_pos.y * grid_size}
}

function draw_game_object(obj, canvas, ctx, health_bar)
{
    pos = grid_to_coord(obj, canvas);

    img = get_image(obj.img);

    ctx.drawImage(img, pos.x - img.width / 2, pos.y - img.height / 2);

    if (typeof health_bar !== "undefined")
    {
        ctx.fillStyle = "grey";

        ctx.fillRect(pos.x - grid_size * 0.4, pos.y + grid_size * 0.3, grid_size * 0.8, grid_size * 0.15);

        ctx.fillStyle = "green";

        ctx.fillRect(pos.x - grid_size * 0.4, pos.y + grid_size * 0.3, grid_size * 0.8 * health_bar, grid_size * 0.15);
    }
}

function tick_game()
{
    for (index in enemies)
    {
        enemies[index].move();
        if (enemies[index].should_be_destroyed)
        {
            enemies.splice(index, 1);
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

function main_loop()
{
    draw();

    if (game_state == "in_game")
    {
        tick_game();
        spawn_enemy_tick();
    }
}

function click_canvas(canvas, x, y)
{
    x -= canvas.width / 2;
    y -= canvas.height / 2;

    x /= grid_size;
    y /= grid_size;

    if (!ocupied_cells.includes([Math.trunc(x), Math.trunc(y)]))
    {
        game_objects.push(new tower(Math.trunc(x), Math.trunc(y), 10));
        ocupied_cells.push([Math.trunc(x), Math.trunc(y)]);
    }
}

setInterval(main_loop, (1000/60));

window.onload = function()
{
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
    
}