var spawn_state = {"power_modifier": 2.0, "distribution_factor": 1.0, "difficulty": 1.0, "remaining": 0.0, "rate": 40.0, "variance": 0.1, "paths": [0], "wave_timer": 10.0, "in_wave": true, "wave_length": 10.0};

var enemy_types = [
    {"name": "Snowflake", "description": "Just your run-of-the-mill snowflakes", "img": "snowflake", "speed": 1.0, "cost": 1.0, "health": 1.0},
    {"name": "Yellow Snowflake", "description": "Beware of the yellow snow, seriously, just don't ask", "img": "snowflake_yellow", "speed": 1.3, "cost": 2.0, "health": 2.0},
]

function spawn_new_enemy()
{
    let v = enemy_types[Math.trunc((Math.random()) * spawn_state.power_modifier)];
    console.log(v.health);
    enemies.push(new enemy(v.health, spawn_state.paths[Math.trunc(spawn_state.paths.length * Math.random())], .03 * spawn_state.difficulty * v.speed, v.img, v.cost));
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
        spawn_state.difficulty += 1.0 / 60.0 / 60.0;
    }
    
    if (spawn_state.wave_timer <= 0)
    {
        spawn_state.in_wave = !spawn_state.in_wave;

        spawn_state.wave_timer = spawn_state.wave_length;
    }

    spawn_state.wave_timer -= 1.0 / 60.0;
}