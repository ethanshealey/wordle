import { useEffect, useState } from 'react';
import Keyboard from './components/Keyboard';
import Row from './components/Row';
import answerList from './words/answer-list.json'
import wordList from './words/word-list.json'
import { AiOutlineReload } from 'react-icons/ai'
function App() {

  const [ word, setWord ] = useState('')
  const [ currentRow, setCurrentRow ] = useState<number>(0);
  const [ guesses, setGuesses ] = useState<string[]>([])
  const [ guess, setGuess ] = useState<string[]>(['', '', '', '', ''])
  const [ currentBox, setCurrentBox ] = useState<string>('box-0-0')

  useEffect(() => { 
    // Select first input box on load
    document.getElementById(currentBox)?.focus()
    // Select a random word
    setWord(_ => answerList.words[Math.floor(Math.random() * answerList.words.length)])
   }, [])

   useEffect(() => {
    // focus next row on guess
    document.getElementById(`box-${currentRow}-0`)?.focus()
   }, [currentRow])

   useEffect(() => {
    setTimeout(() => document.getElementById(currentBox)?.focus(), 20)
   }, [currentBox])

  const stopClick = () => {
    // handle user clicking away from input
    setTimeout(() => document.getElementById(currentBox)?.focus(), 20)
  }

  const handleGuessColors = (): void => {

    let ans = word.toUpperCase().split('')
    let g = [ ...guess ]

    g.forEach((ch, i) => {
      if(ans[i] === ch) {
        document.getElementById(`box-${currentRow}-${i}`)!.style.borderColor = "#538d4e"
        document.getElementById(`box-${currentRow}-${i}`)!.style.backgroundColor = "#538d4e"
        // set key
        document.getElementById(`key-${guess[i]}`)!.style.backgroundColor = "#538d4e"
        ans[i] = ''
      }
    })
    g.forEach((ch, i) => {
      if(ans.includes(ch)) {
        document.getElementById(`box-${currentRow}-${i}`)!.style.borderColor = document.getElementById(`box-${currentRow}-${i}`)!.style.borderColor === "rgb(83, 141, 78)" ? "rgb(83, 141, 78)" : "#b59f3b"
        document.getElementById(`box-${currentRow}-${i}`)!.style.backgroundColor = document.getElementById(`box-${currentRow}-${i}`)!.style.backgroundColor === "rgb(83, 141, 78)" ? "rgb(83, 141, 78)" : "#b59f3b"
        // set key
        document.getElementById(`key-${guess[i]}`)!.style.backgroundColor = document.getElementById(`key-${guess[i]}`)!.style.backgroundColor === "rgb(83, 141, 78)" ? "rgb(83, 141, 78)" : "#b59f3b"
        ans[i] = ''
      }
      else {
        // set box
        document.getElementById(`box-${currentRow}-${i}`)!.style.backgroundColor = document.getElementById(`box-${currentRow}-${i}`)!.style.backgroundColor === "rgb(83, 141, 78)" ? "rgb(83, 141, 78)" : "#3a3a3c"
        // set key
        document.getElementById(`key-${guess[i]}`)!.style.backgroundColor = document.getElementById(`key-${guess[i]}`)!.style.backgroundColor === "rgb(83, 141, 78)" ? "rgb(83, 141, 78)" : "#121213"  
      }
    })
    
  }

  const handleInput = (e: KeyboardEvent, pos: number): void => {
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
      if(wordList.words.includes(guess.join('').toLowerCase())) {
        handleGuessColors()
        setGuesses((g: string[]) => [ ...g, guess.join('')])
        setCurrentBox(_ => `box-${currentRow+1}-0`)
        if(guess.join('') === word.toUpperCase()) {
          alert("You won!")
          document.getElementById('play-again')!.style.visibility = "visible"
          setCurrentRow(cr => -1)
        }
        else {
          setCurrentRow(cr => cr + 1)
          setGuess(_ => ['', '', '', '', ''])
        }
      }
      else {
        alert(`${guess.join('')} is not a valid word! Try again`)
      }
    }
  }

  const simulateKeyPress = (char: string): boolean | void => {
    if(document.getElementById(`key-${char}`)!.style.backgroundColor === "rgb(58, 58, 60)") return false
    const e = new KeyboardEvent('keydown', {
      'key': char === "BACK" ? "BACKSPACE" : char
    })
    handleInput(e, parseInt(currentBox.at(-1)!))
  }

  return (
      <div id="main" onClick={() => stopClick()}>
        <h1>WORDLE</h1>
        <div id="board">
          { Array(6).fill(1).map((_, i) => <Row key={i} row={i} currentRow={currentRow} guess={guess} guesses={guesses} handleInput={handleInput} />) }
          <button id="play-again" onClick={() => window.location.reload()}>Play Again <AiOutlineReload id="play-again-icon" /></button>
        </div>
        <Keyboard simulateKeyPress={simulateKeyPress} />
      </div>
  );
}

export default App;
