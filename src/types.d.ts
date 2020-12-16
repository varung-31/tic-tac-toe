interface SquareProps {
    text: string,
    onClick: (event: React.MouseEvent) => void,
    color: string
}

interface BoardProps {
    board: Char[],
    onClick: (index: number) => void
}

interface GameState {
    history: Char[][],
    isXNext: boolean,
    stepNumber: number
}
