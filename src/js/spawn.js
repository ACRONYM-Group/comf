var spawn_state = {"power_modifier": 0.5, "distribution_factor": 1.0, "difficulty": 0.75, "remaining": 0.0, "rate": 50.0, "variance": 0.1, "paths": [0], "wave_timer": 5.0, "in_wave": false, "wave_length": 5.0, "wave": 0, "waves_remaining": 0};

var enemy_types = [
    {"name": "Snowflake", "type":enemy_white_snow, "description": "Just your run-of-the-mill snowflakes", "img": "snowflake", "speed": 1.0, "cost": 1.0, "health": 1.0},
    {"name": "Yellow Snowflake", "type":enemy_yellow_snow, "description": "Beware of the yellow snow, seriously, just don't ask", "img": "snowflake_yellow", "speed": 1.3, "cost": 2.0, "health": 2.0},
    {"name": "Ice Golem", "type":enemy_ice_golem}
]

function spawn_new_enemy()
{
    let v = enemy_types[Math.trunc((Math.random()) * spawn_state.power_modifier)];
    enemies.push(new enemy(spawn_state.paths[Math.trunc(spawn_state.paths.length * Math.random())], v.type));
}

function spawn_enemy_tick()
{
    if (spawn_state.in_wave)
    {
        if (spawn_state.remaining <= 0.0)
        {
            spawn_new_enemy();

            spawn_state.remaining = spawn_state.rate * (1.0 + (Math.random() - 0.5) * spawn_state.variance);
            spawn_state.remaining /= spawn_state.difficulty;
        }

        spawn_state.remaining -= 1.0;
    }

    if (spawn_state.wave_timer <= 0 && spawn_state.waves_remaining > 0)
    {
        spawn_state.in_wave = !spawn_state.in_wave;
        spawn_state.wave_timer = spawn_state.wave_length;

        if (!spawn_state.in_wave)
        {
            spawn_state.wave_timer /= spawn_state.difficulty;
            spawn_state.waves_remaining -= 1;
        }
    }

    spawn_state.wave_timer -= 1.0 / 60.0;

    if (spawn_state.waves_remaining === 0 && enemies.length === 0)
    {
        document.getElementById("next_wave").onclick = next_wave;
        document.getElementById("next_wave").classList.remove("button_disabled");
    }
}

function next_wave()
{
    if (spawn_state.waves_remaining === 0)
    {
        document.getElementById("next_wave").onclick = function() {};
        document.getElementById("next_wave").classList.add("button_disabled");

        spawn_state.wave += 1;
        spawn_state.difficulty = 1.0 + (spawn_state.wave - 1) * 0.2;
        spawn_state.power_modifier = 1.0 + 0.25 * (spawn_state.wave - 1);
        spawn_state.in_wave = true;

        spawn_state.wave_length = 5.0 + spawn_state.wave;
        spawn_state.wave_timer = spawn_state.wave_length + 2.0;

        spawn_state.waves_remaining = 1 + Math.round(0.45 * spawn_state.wave);
    }
}