var spawn_state = {"power_modifier": 1.0, "distribution_factor": 1.0, "difficulty": 1.0, "remaining": 0.0, "rate": 120.0, "variance": 0.1, "paths": [0, 1]};

function spawn_new_enemy()
{
    enemies.push(new enemy(0, spawn_state.paths[Math.trunc(spawn_state.paths.length * Math.random())], .03 * spawn_state.difficulty));
}

function spawn_enemy_tick()
{
    if (spawn_state.remaining <= 0.0)
    {
        spawn_new_enemy();

        spawn_state.remaining = spawn_state.rate * (1.0 + (Math.random() - 0.5) * spawn_state.variance);
        spawn_state.remaining /= spawn_state.difficulty;
    }

    spawn_state.remaining -= 1.0;
}