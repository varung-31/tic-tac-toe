import React from "react";
import "./Square.css";

class Square extends React.Component<SquareProps, any> {
    render() {
        return (
            <button className="square" onClick={this.props.onClick}
                    style={{color: this.props.color, backgroundColor: this.props.backgroundColor}}>
                {this.props.text}
            </button>
        );
    }
}

export default Square;
