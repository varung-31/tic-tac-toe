import React from 'react';
import Board from "./Board";
import "./App.css";

class App extends React.Component<any , GameState> {
    constructor(props: any) {
        super(props);
        this.state = {
            history: [new Array(9).fill(null)],
            isXNext: true,
            stepNumber: 0
        };
    }

    computeColor(character: string) {
        return character === 'X' ? "green" : "blue";
    }

    determineWinner() {
        const winConfigurations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const currentBoard = this.state.history[this.state.stepNumber];
        for (const confIndex in winConfigurations) {
            const conf = winConfigurations[confIndex];
            if (currentBoard[conf[0]] === currentBoard[conf[1]] && currentBoard[conf[1]] === currentBoard[conf[2]] &&
                currentBoard[conf[2]] !== null) {
                return this.state.isXNext ? 'O' : 'X';
            }
        }

        return null;
    }

    determineGameStatus(nextPlayer: string) {
        const winner = this.determineWinner();

        // we have a winner
        if (winner !== null) {
            return <>Winner : <span style={{color: this.computeColor(winner)}}>{winner}</span></>;
        }

        // check for the drawn state
        if (this.state.history[this.state.stepNumber].filter(x => x === null).length === 0) {
            return <>The game is drawn!</>;
        }

        return <>Next Player : <span style={{color: this.computeColor(nextPlayer)}}>{nextPlayer}</span></>;
    }

    handleClick(index: number) {
        // do not mark a symbol on an already marked square or if the game is already finished
        if (this.state.history[this.state.stepNumber][index] !== null || this.determineWinner() !== null) {
            return;
        }

        // Immutability is important! Hence creating a copy of the state for modification.
        let modifiedBoard = this.state.history[this.state.stepNumber].slice();
        modifiedBoard[index] = this.state.isXNext ? 'X' : 'O';

        // append the new board to the history
        let modifiedHistory = this.state.history.slice(0, this.state.stepNumber + 1).concat([modifiedBoard]);

        // don't forget to flip the turns and increment the step number
        this.setState({history: modifiedHistory, isXNext: !this.state.isXNext, stepNumber: this.state.stepNumber + 1});
    }

    jumpToStep(index: number) {
        this.setState({stepNumber: index, isXNext: index % 2 === 0})
    }

    render() {
        const nextPlayer = this.state.isXNext ? 'X' : 'O';
        const pastMoves = this.state.history.map(((value, index) => {
            const message = index === 0 ? 'Go to game start' : 'Go to move #' + index;
            return (
                <li>
                    <button onClick={() => this.jumpToStep(index)}>{message}</button>
                </li>
            );
        }));
        return (
            <div className="game">
                <h1>Welcome to Tic Tac Toe !!!</h1>
                <div className="game-board">
                    <Board board={this.state.history[this.state.stepNumber]} onClick={(index) => this.handleClick(index)} />
                </div>
                <div className="game-info">
                    <h2>{this.determineGameStatus(nextPlayer)}</h2>
                    <ol>{pastMoves}</ol>
                </div>
            </div>
        );
    }
}

export default App;
