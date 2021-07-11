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
        global_image = document.getElementById("image")
    }

    if (game_state === "menu")
    {
        global_image.style.display = "block";
    }
    else
    {
        global_image.style.display = "hidden";
    }

    var ctx = global_canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, global_canvas.width, global_canvas.height);
}

function main_loop()
{
    draw();
}

setInterval(main_loop, (1000/60));
