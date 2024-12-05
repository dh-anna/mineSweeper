import { Cell, CellType } from "./cell";
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
        const randomNumbers = Table.generateRandomNumbers(numberOfBombs, 1, rows * cols);
        const mines = Table.getMatrixPositions(randomNumbers);
        const minesweeperHints = Table.calculateMinesweeperHints(mines, rows, cols);

        for (let i = 0; i < rows; i++) {
            this.tableContents[i] = [];
            for (let j = 0; j < cols; j++) {
                if (randomNumbers.includes(i * cols + j)) {
                    this.tableContents[i][j] = Cell.createSpecificCell("mine", 100 + (i % 5) * 80, 100 + (j % 5) * 80);
                    this.container.addChild(this.tableContents[i][j].getSprite());
                } else {
                    const typehelp = minesweeperHints[i][j] === -1 ? "" : minesweeperHints[i][j].toString();
                    const type = typehelp === "" ? "mine" : (`empty${typehelp}` as CellType);

                    this.tableContents[i][j] = Cell.createSpecificCell(type, 100 + (i % 5) * 80, 100 + (j % 5) * 80);
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

    static getMatrixPositions(numbers: number[]): { row: number; col: number }[] {
        return numbers.map((num) => {
            const row = Math.floor((num - 1) / 5);
            const col = (num - 1) % 5;
            return { row: row, col: col };
        });
    }

    static getAdjacentCells(row: number, col: number, rows: number, cols: number): { row: number; col: number }[] {
        const directions = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ];
        const adjacentCells: { row: number; col: number }[] = [];

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            // Ensure the cell is within the matrix bounds
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                adjacentCells.push({ row: newRow, col: newCol });
            }
        }

        return adjacentCells;
    }

    static calculateMinesweeperHints(mines: { row: number; col: number }[], rows: number, cols: number): number[][] {
        const matrix: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));

        for (const { row, col } of mines) {
            matrix[row][col] = -1;
        }

        for (const { row, col } of mines) {
            const adjacent = Table.getAdjacentCells(row, col, rows, cols);
            for (const { row: adjRow, col: adjCol } of adjacent) {
                if (matrix[adjRow][adjCol] !== -1) {
                    matrix[adjRow][adjCol]++;
                }
            }
        }
        return matrix;
    }
}
