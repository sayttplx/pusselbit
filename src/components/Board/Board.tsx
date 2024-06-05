import React, { useState, useEffect } from "react";
import {StyledBoard, StyledRow, StyledTile, StyledGameActions, StyledGameSection, StyledGameStatus,} from "./components";
import Button from "../ui/Button";


// Adjust here to change the size of the board
let w = 4;
let h = 4;

const shuffelBoard = (w: number, h: number) => {
  // Get all numbers by multiplying width and height and subtracting 1 for the empty cell
  const length = w * h - 1;
  // Create an array of all numbers
  const numbers = Array.from({ length }, (_, i) => i + 1);
  // Shuffle the numbers
  const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);

  // Create a board with the shuffled numbers by separating them into rows by given height
  const board = Array.from({ length: h }, (_, i) =>
    // Grab a slice of the shuffled numbers array for each row
    shuffledNumbers.slice(i * w, (i + 1) * w)
  );

  // Set the last cell to 0
  board[h - 1][w - 1] = 0;
  return board;
};

const Board: React.FC = () => {
  const [board, setBoard] = useState(shuffelBoard(w, h));
  const [win, setWin] = useState(false);

  const getSolution = () => {
    // Create a board with the numbers in order
    const newBoard = Array.from({ length: h }, (_, y) =>
      Array.from({ length: w }, (_, x) => {
        // Row value, will equeal the starting point of each row,
        // i.e the index of the last cell on the previous row. First row equals 0
        const row = y * w;

        // Column value, will equal the index of the current cell in the row
        const col = x + 1;

        // The value of the cell, will equal the sum of the row and column values
        return row + col;
      })
    );

    // Set the last cell to 0
    newBoard[h - 1][w - 1] = 0;
    return newBoard;
  };

  const solve = () => {
    setBoard(getSolution());
  };

  const reset = () => {
    setBoard(shuffelBoard(w, h));
    setWin(false);
  };

  const handleClick = (clickedRow: number, clickedCol: number) => {
    // Check if clicked row or column contains the empty cell
    const emptyInRow = board[clickedRow].includes(0);
    const emptyInCol = board.map((row) => row[clickedCol]).includes(0);

    // Return if clicked invalid cell
    if (!emptyInRow && !emptyInCol) return;

    // Create a copy of current board state
    const newBoard = structuredClone(board);

    if (emptyInRow) {
      // Set emptyIndex to the index of the empty cell in the clicked row
      const emptyIndex = {
        row: clickedRow,
        col: board[clickedRow].indexOf(0),
      };

      if (clickedCol < emptyIndex.col) {
        // Clicked cell is left of empty cell
        // Move clicked cell and all cells after clicked cells, until empty cell, to the right

        for (let i = emptyIndex.col; i > clickedCol; i--) {
          newBoard[clickedRow][i] = newBoard[clickedRow][i - 1];
        }
      } else if (clickedCol > emptyIndex.col) {
        // Clicked cell is to the right of empty cell
        // Move clicked cell and all cells before clicked cells, until empty cell, to the left

        for (let i = emptyIndex.col; i < clickedCol; i++) {
          newBoard[clickedRow][i] = newBoard[clickedRow][i + 1];
        }
      }
    } else if (emptyInCol) {
      // Set emptyIndex to the index of the empty cell in the clicked column
      const emptyIndex = {
        row: board.map((row) => row[clickedCol]).indexOf(0),
        col: clickedCol,
      };

      if (clickedRow < emptyIndex.row) {
        // Clicked cell is above empty cell
        // Move clicked cell and all cells below clicked cells, until empty cell, up

        for (let i = emptyIndex.row; i > clickedRow; i--) {
          newBoard[i][clickedCol] = newBoard[i - 1][clickedCol];
        }
      } else if (clickedRow > emptyIndex.row) {
        // Clicked cell is below empty cell
        // Move clicked cell and all cells above clicked cells, until empty cell, down

        for (let i = emptyIndex.row; i < clickedRow; i++) {
          newBoard[i][clickedCol] = newBoard[i + 1][clickedCol];
        }
      }
    }

    // Clicked cell should now be empty, set clicked cell to 0
    newBoard[clickedRow][clickedCol] = 0;
    setBoard(newBoard);
  };

  useEffect(() => {
    const _board = board.flatMap((row) => row).join("");
    const _solution = getSolution()
      .flatMap((row) => row)
      .join("");
    if (_board === _solution) {
      setWin(true);
    }
  }, [board]);

  return (
    <StyledGameSection>
      <StyledBoard>
        {board.map((row, rowIndex) => (
          <StyledRow key={rowIndex}>
            {row.map((cell, colIndex) => (
              <StyledTile
                key={cell}
                $empty={cell === 0}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {!!cell && <span>{cell}</span>}
              </StyledTile>
            ))}
          </StyledRow>
        ))}
      </StyledBoard>
      {win && <StyledGameStatus>You win!</StyledGameStatus>}
      <StyledGameActions>
        <Button onClick={solve}>solve</Button>
        <Button onClick={reset}>reset</Button>
      </StyledGameActions>
    </StyledGameSection>
  );
};

export default Board;
