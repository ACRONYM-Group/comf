var global_canvas = undefined;
var global_image = undefined;

var game_state = "menu";

function draw()
{
    if (typeof global_canvas === "undefined")
    {
        global_canvas = document.getElementById("main_canvas")
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
        var ctx = global_canvas.getContext("2d");
        
        draw_game(global_canvas, ctx);
    }
}

function draw_game(canvas, ctx)
{
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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