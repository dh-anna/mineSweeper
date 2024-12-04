import { Cell } from "./cell";
import { Container } from "pixi.js";

export class Table {
    private tableContents: Cell[][] = [];
    private rows: number;
    private cols: number;
    public container: Container;

    constructor(rows: number, cols: number, numberOfBombs: number) {
        this.rows = rows;
        this.cols = cols;

        this.container = new Container();
        const randomNumbers = Table.generateRandomNumbers(numberOfBombs, 0, rows * cols - 1);

        for (let i = 0; i < rows; i++) {
            this.tableContents[i] = [];
            for (let j = 0; j < cols; j++) {
                if (randomNumbers.includes(i * cols + j)) {
                    this.tableContents[i][j] = Cell.createSpecificCell("mine", 100 + (i % 5) * 80, 100 + (j % 5) * 80);
                    this.container.addChild(this.tableContents[i][j].getSprite());
                } else {
                    this.tableContents[i][j] = Cell.createSpecificCell(
                        "empty1",
                        100 + (i % 5) * 80,
                        100 + (j % 5) * 80,
                    );
                    this.container.addChild(this.tableContents[i][j].getSprite());
                }
            }
        }
    }

    static generateRandomNumbers(count: number, min: number, max: number): number[] {
        const randomNumbers: number[] = [];
        while (randomNumbers.length < count) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!randomNumbers.includes(num)) {
                randomNumbers.push(num);
            }
        }
        return randomNumbers;
    }
}
