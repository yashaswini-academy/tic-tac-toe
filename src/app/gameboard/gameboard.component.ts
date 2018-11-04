import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {

  isPlayerFirst = true
  isPlayerMove = true

  playerScore = 0
  compScore = 0
  gameMessage = 'Game Starts! Player Moves';

  moves = 0

  cellSum = [0, 0, 0, 0, 0, 0, 0, 0];

  cells = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  constructor() {}

  ngOnInit() {
  }

  onSelect() {
    this.isPlayerFirst = !this.isPlayerFirst;
    if (!this.isPlayerFirst) {
      this.gameMessage = 'Game Starts! Computer Moves';
    }
  }

  makeMove(i, j, val) {
    this.cells[i][j] = val;

    let addVal = val == 0 ? -1 : 1;
    this.cellSum[i] += addVal;
    this.cellSum[j + 3] += addVal;

    // diag 1
    if (i == j) {
      this.cellSum[6] += addVal;
    }

    // diag 2
    if ((i == 0 && j == 2) || (i == 1 && j == 1) || (i == 2 && j == 0)) {
      this.cellSum[7] += addVal;
    }

    this.moves++;

    if (this.moves >= 5) {
      return this.checkWin();
    }

    return false;
  }

  cellClicked(i, j) {
    if (this.isPlayerMove && this.cells[i][j] === null) {
      this.isPlayerMove = false;

      if (!this.makeMove(i, j, 1)) {
        this.playComp();
      }
    }
  }

  playComp() {
    if (this.moves < 8) {
      this.gameMessage = 'Computer Moves';
      setTimeout(() => {
        let availableMoves = [];
        this.cells.forEach((row, rowIndex) => {
          row.forEach((colValue, colIndex) => {
            if (colValue === null) {
              availableMoves.push([rowIndex, colIndex]);
            }
          });
        });

        let compMove = this.getRandomInt(0, availableMoves.length - 1);
        if (!this.makeMove(availableMoves[compMove][0], availableMoves[compMove][1], 0)) {
          this.isPlayerMove = true;
          this.gameMessage = 'Player Moves';
        }
      }, 500);
    }
  }

  checkWin() {
    console.log(this.cellSum);
    if (this.cellSum.indexOf(3) >= 0) {
      this.gameMessage = 'Player Wins!';
      this.playerScore++;
      return true;
    } else if (this.cellSum.indexOf(-3) >= 0) {
      this.gameMessage = 'Computer Wins!';
      this.compScore++;
      return true;
    } else if (this.moves >= 9) {
      this.gameMessage = 'Game End!';
    }

    return false
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  startNewGame() {
    this._clear()
  }

  resetGame() {
    this.playerScore = 0
    this.compScore = 0

    this._clear()
  }

  _clear() {
    this.cells = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    this.cellSum = [0, 0, 0, 0, 0, 0, 0, 0];
    this.moves = 0


    if (this.isPlayerFirst) {
      this.gameMessage = 'Game Starts! Player Moves'
      this.isPlayerMove = true
    } else {
      this.gameMessage = 'Game Starts! Computer Moves';
      this.playComp()
    }
  }

}
