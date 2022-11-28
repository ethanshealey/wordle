import { useEffect, useState } from 'react';
import Keyboard from './components/Keyboard';
import Row from './components/Row';

function App() {

  const [ currentRow, setCurrentRow ] = useState<number>(0);
  const [ guesses, setGuesses ] = useState<string[]>([])
  const [ guess, setGuess ] = useState<string[]>(['', '', '', '', ''])
  const [ currentBox, setCurrentBox ] = useState<string>('box-0-0')

  useEffect(() => { 
    // Select first input box on load
    document.getElementById(currentBox)?.focus()
   }, [])

   useEffect(() => {
    console.log(`CURRENT GUESS: ${guess.join('')}`)
   }, [guess])

   useEffect(() => {
    document.getElementById(`box-${currentRow}-0`)?.focus()
   }, [currentRow])

  const stopClick = () => {
    console.log(currentBox)
    setTimeout(() => document.getElementById(currentBox)?.focus(), 20)
  }

  const handleInput = (e: KeyboardEvent, pos: number) => {
    const char: string = e.key.toUpperCase()
    const g: string[] = guess;
    // IF is a character
    if(char.match(/^[A-Z]{1}$/g) && !(guess[pos] !== '' && pos === 4)) {
      g[pos] = char;
      setGuess(_ => [ ...g ])
      if(pos !== 4) {
        document.getElementById(`box-${currentRow}-${pos+1}`)?.focus()
        setCurrentBox(`box-${currentRow}-${pos+1}`)
      }
    }
    // IF backspace
    else if(char.match(/^BACKSPACE$/g) && pos !== 0) {
      if(pos === 4 && guess[pos] !== '') {
        g[pos] = ''
        document.getElementById(`box-${currentRow}-${pos}`)?.focus()
        setCurrentBox(`box-${currentRow}-${pos}`)
      }
      else {
        g[pos - 1] = ''
        document.getElementById(`box-${currentRow}-${pos-1}`)?.focus()
        setCurrentBox(`box-${currentRow}-${pos-1}`)
      }
      setGuess(_ => [ ...g ])
    }
    // IF enter
    else if(char.match(/^ENTER$/g) && guess.at(-1) !== '') {
      console.log(`Submitted Guess: ${guess.join('')}`)
      setGuesses((g: string[]) => [ ...g, guess.join('')])
      setCurrentRow(cr => cr + 1)
      setGuess(_ => ['', '', '', '', ''])
      
    }
  }

  return (
    <div id="main" onClick={() => stopClick()}>
      <h1>WORDLE</h1>
      <div id="board">
        { Array(6).fill(1).map((_, i) => <Row key={i} row={i} currentRow={currentRow} guess={guess} guesses={guesses} handleInput={handleInput} />) }
      </div>
      <Keyboard />
    </div>
  );
}

export default App;
