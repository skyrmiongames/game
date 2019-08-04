export interface Vector {
    scalar: number;
    direction: number;
}

export const add_vectors = (...vectors: Vector[]) =>
    vectors.reduce(
        (prev, curr) => {
            let prev_x = prev.scalar * Math.cos(prev.direction);
            let prev_y = prev.scalar * Math.sin(prev.direction);

            let curr_x = curr.scalar * Math.cos(curr.direction);
            let curr_y = curr.scalar * Math.sin(curr.direction);

            let sum_x = prev_x + curr_x;
            let sum_y = prev_y + curr_y;

            console.log(`x: ${sum_x}, y: ${sum_y}, y/x: ${sum_y / sum_x}, x/y: ${sum_x / sum_y}`);

            return {
                direction: Math.atan2(sum_y, sum_x),
                scalar: Math.sqrt(Math.pow(sum_x, 2) + Math.pow(sum_y, 2)),
            };
        },
        { scalar: 0, direction: 0 }
    );
