import { Cell, CellType } from "./cell";
import { Container } from "pixi.js";
import { AssetManager } from "../assetManager";

export class Table {
    private tableContents: Cell[][] = [];
    public container: Container;

    constructor(rows: number, cols: number, numberOfBombs: number) {
        this.container = new Container();

        const minesweeperHints = Table.generaMineSweeperHints(rows, cols, numberOfBombs);
        console.log(minesweeperHints);

        for (let i = 0; i < rows; i++) {
            this.tableContents[i] = [];
            for (let j = 0; j < cols; j++) {
                const type =
                    minesweeperHints[i][j] === -1 ? "mine" : (`empty${minesweeperHints[i][j].toString()}` as CellType);

                const texture = AssetManager.getInstance().getAsset("default");
                if (!texture) throw new Error(`Texture for ("default") not found`);
                this.tableContents[i][j] = new Cell(type, texture, 500 + (i % rows) * 80, 200 + (j % cols) * 80);
                this.container.addChild(this.tableContents[i][j].getSprite());
            }
        }
    }

    static generaMineSweeperHints(rows: number, cols: number, numberOfBombs: number): number[][] {
        const minePositions = Table.generateRandomNumbersFromTo(numberOfBombs, 0, rows * cols - 1);

        const minesCoordinates = Table.getMatrixPositions(minePositions, rows, cols);
        return Table.calculateMinesweeperHints(minesCoordinates, rows, cols);
    }

    static generateRandomNumbersFromTo(count: number, min: number, max: number): number[] {
        const randomNumbers: number[] = [];
        while (randomNumbers.length < count) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!randomNumbers.includes(num)) {
                randomNumbers.push(num);
            }
        }
        return randomNumbers;
    }

    static getMatrixPositions(numbers: number[], rows: number, cols: number): { row: number; col: number }[] {
        return numbers.map((num) => {
            const row = Math.floor(num / rows);
            const col = num % cols;
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
                if (matrix[adjRow][adjCol] != -1) {
                    matrix[adjRow][adjCol]++;
                }
            }
        }
        return matrix;
    }
}
