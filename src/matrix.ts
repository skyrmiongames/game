export interface Matrix<T> {
    at(x: number, y: number): T | undefined;
    readonly entries: Array<{ x: number; y: number; value: T }>;
}

export class ArrayMatrix<T> implements Matrix<T> {
    private array: Array<Array<T>>;

    constructor(array: Array<Array<T>>) {
        this.array = array;
    }

    at(x: number, y: number): T | undefined {
        return this.array[y] && this.array[y][x];
    }

    get entries(): Array<{ x: number; y: number; value: T }> {
        return this.array.flatMap((xs, y) =>
            xs.map((value, x) => ({ x, y, value }))
        );
    }
}

export const emptyMatrix = <T>() => new ArrayMatrix<T>([]);

export default Matrix;
