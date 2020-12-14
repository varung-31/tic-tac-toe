interface SquareProps {
    text: string,
    onClick: (event: React.MouseEvent) => void,
    color: string
}

interface BoardState {
    board: Char[],
    isXNext: boolean
}
