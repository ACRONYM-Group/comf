var global_canvas = undefined;

function draw()
{
    if (typeof global_canvas === "undefined")
    {
        alert("Loading Canvas");

        global_canvas = document.getElementById("main_canvas")
    }

    var ctx = global_canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, global_canvas.width, global_canvas.height);
}