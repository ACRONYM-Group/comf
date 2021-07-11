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

    game_objects.forEach(function (item, index)
    {
        draw_game_object(item, canvas, ctx);
    });

    for (e in enemies)
    {
        draw_game_object(e, canvas, ctx);
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
        enemies[index].move();

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

setInterval(main_loop, (1000/60));

window.onload = function()
{
    document.getElementById("main_menu").onclick = function()
    {
        switch_to_game();
    }
}