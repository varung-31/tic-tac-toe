interface SquareProps {
    text: string,
    onClick: (event: React.MouseEvent) => void
}

interface BoardState {
    board: Char[],
    isXNext: boolean
}
