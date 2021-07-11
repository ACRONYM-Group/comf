var global_canvas = undefined;
var global_image = undefined;

var game_state = "menu";

var grid_size = 50;

var game_objects = [{"pos": {"x":0, "y":0}}, {"pos": {"x":-1, "y":0}}, {"pos": {"x":1, "y":0}}];

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

    pos = grid_to_coord(obj.pos, canvas);

    ctx.fillRect(Math.round(pos.x - width / 2), Math.round(pos.y - height / 2), width, height);
}

function tick_game()
{

}

function switch_to_game()
{
    game_state = "in_game";
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