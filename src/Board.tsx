import React from "react";
import Square from "./Square";
import "./Board.css";

class Board extends React.Component<BoardProps, any> {
    computeColor(character: string) {
        return character === 'X' ? "green" : "blue";
    }

    renderSquare(index: number) {
        // display X in green and O in blue colors
        const color = this.computeColor(this.props.board[index]);
        const backgroundColor = this.props.winConf.includes(index) ? "lightsalmon" : "white";

        // added key to allow React to uniquely identify every element in the list
        // onClick custom function has to be an arrow function or it will be invoked on every execution of renderSquare
        return <Square key={index} text={this.props.board[index]} onClick={() => this.props.onClick(index)}
                       color={color} backgroundColor={backgroundColor} />
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
        return <>{buttonLayout}</>;
    }
}

export default Board;
