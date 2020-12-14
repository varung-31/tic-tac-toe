import React from "react";
import Square from "./Square";
import "./Board.css";

class Board extends React.Component<any, BoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            board: new Array(9).fill(null),  // initialise the board with null values
            isXNext: true
        }
    }

    handleClick(index: number) {
        // do not mark a symbol on an already marked square or if the game is already finished
        if (this.state.board[index] !== null || this.determineWinner() !== null) {
            return;
        }

        // Immutability is important! Hence creating a copy of the state for modification.
        let modifiedBoard = this.state.board.slice();
        modifiedBoard[index] = this.state.isXNext ? 'X' : 'O';

        // don't forget to flip the turns
        this.setState({board: modifiedBoard, isXNext: !this.state.isXNext});
    }

    computeColor(character: string) {
        return character === 'X' ? "green" : "blue";
    }

    renderSquare(index: number) {
        // display X in green and O in blue colors
        const color = this.computeColor(this.state.board[index]);

        // added key to allow React to uniquely identify every element in the list
        // onClick custom function has to be an arrow function or it will be invoked on every execution of renderSquare
        return <Square key={index} text={this.state.board[index]} onClick={() => this.handleClick(index)} color={color} />
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

        for (const confIndex in winConfigurations) {
            const conf = winConfigurations[confIndex];
            if (this.state.board[conf[0]] === this.state.board[conf[1]] &&
                this.state.board[conf[1]] === this.state.board[conf[2]] && this.state.board[conf[2]] !== null) {
                return this.state.isXNext ? 'O' : 'X';
            }
        }

        return null;
    }

    determineGameStatus(nextPlayer: string) {
        // check for the drawn state
        if (this.state.board.filter(x => x === null).length === 0) {
            return <>The game is drawn!</>;
        }

        const winner = this.determineWinner();

        // we have a winner
        if (winner !== null) {
            return <>Winner : <span style={{color: this.computeColor(winner)}}>{winner}</span></>;
        }

        return <>Next Player : <span style={{color: this.computeColor(nextPlayer)}}>{nextPlayer}</span></>;
    }

    render() {
        const nextPlayer = this.state.isXNext ? 'X' : 'O';
        let buttonLayout = new Array(3);
        for (let i = 0; i <= 2; i++) {
            let buttonRow = new Array(3);
            for (let j = 0; j <= 2; j++) {
                buttonRow.push(this.renderSquare(i * 3 + j));
            }
            // added key to allow React to uniquely identify every element in the list
            buttonLayout.push(<div key={i} className="board-row">{buttonRow}</div>);
        }
        return (
            <div className="game">
                <h1>Welcome to Tic Tac Toe !!!</h1>
                <div className="game-board">{buttonLayout}</div>
                <div className="game-info">
                    <h2>{this.determineGameStatus(nextPlayer)}</h2>
                </div>
            </div>
        );
    }
}

export default Board;
