var spawn_state = {"power_modifier": 2.0, "distribution_factor": 1.0, "difficulty": 1.0, "remaining": 0.0, "rate": 40.0, "variance": 0.1, "paths": [0], "wave_timer": 10.0, "in_wave": true, "wave_length": 10.0};

function spawn_new_enemy()
{
    let v = ["snowflake", "snowflake_yellow"][Math.trunc((Math.random()) * spawn_state.power_modifier)];
    enemies.push(new enemy(1, spawn_state.paths[Math.trunc(spawn_state.paths.length * Math.random())], .03 * spawn_state.difficulty, v));
}

function spawn_enemy_tick()
{
    console.log("Spawn_enemy_tick");
    if (spawn_state.in_wave)
    {
        console.log("in_wave");
        if (spawn_state.remaining <= 0.0)
        {
            console.log("Enemies Remaining");
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