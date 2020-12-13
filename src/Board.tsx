import React from "react";
import Square from "./Square";

class Board extends React.Component<any, BoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            board: new Array(9).fill(null),  // initialise the board with null values
            isXNext: true
        }
    }

    handleClick(index: number) {
        // do not mark a symbol on an already marked square
        if (this.state.board[index] !== null) {
            return;
        }

        // Immutability is important! Hence creating a copy of the state for modification.
        let modifiedBoard = this.state.board.slice();
        modifiedBoard[index] = this.state.isXNext ? 'X' : 'O';

        // don't forget to flip the turns
        this.setState({board: modifiedBoard, isXNext: !this.state.isXNext});
    }

    renderSquare(index: number) {
        // added key to allow React to uniquely identify every element in the list
        // onClick custom function has to be an arrow function or it will be invoked on every execution of renderSquare
        return <Square key={index} text={this.state.board[index]} onClick={() => this.handleClick(index)} />
    }

    render() {
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
            <div className="board">{buttonLayout}</div>
        );
    }
}

export default Board;
