interface SquareProps {
    text: string,
    onClick: (event: React.MouseEvent) => void,
    color: string,
    backgroundColor: string
}

interface BoardProps {
    board: Char[],
    onClick: (index: number) => void,
    winConf: number[]
}

interface GameState {
    history: Char[][],
    isXNext: boolean,
    stepNumber: number,
    winConfiguration: number[]
}
