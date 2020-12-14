import React from "react";
import "./Square.css";

class Square extends React.Component<SquareProps, any> {
    render() {
        return (
            <button className="square" style={{color: this.props.color}} onClick={this.props.onClick}>
                {this.props.text}
            </button>
        );
    }
}

export default Square;
