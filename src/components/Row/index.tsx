
const Row = ({ row, currentRow, guess, guesses, handleInput }: { row: number, currentRow: number, guess: string[], guesses: string[], handleInput: any }) => {
  return (
    <div id={`row-${row}`}>
      {
        Array(5).fill(1).map((_, i) => (
          <input id={`box-${row}-${i}`} value={currentRow === row ? guess[i]: guesses[row] ? guesses[row][i] : '' } readOnly disabled={row !== currentRow} onKeyDown={e => handleInput(e, i)} maxLength={1} />
        ))
      }
    </div>
  )
}

export default Row