import React from "react";

class Square extends React.Component<SquareProps, any> {
    render() {
        return (
            <button className="square" onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

export default Square;
