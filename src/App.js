import { useState, useEffect } from 'react'
import Row from './components/Row'
import Keyboard from './components/Keyboard'
import words from './words/word-list.json'
import answers from './words/answer-list.json'

function App() {
  
  const [input, setInput] = useState('')
  const [row, setRow] = useState(0)
  const [currentBlock, setCurrentBlock] = useState('00')
  const [isLoading, setIsLoading] = useState(true)
  const [guesses, setGuesses] = useState(new Set())

  const [word, setWord] = useState('')
  const [allWords, setAllWords] = useState([])

  const [values, setValues] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ])

  useEffect(() => {
    setIsLoading(true)
    setAllWords(words.words)
    setWord(answers.words[Math.floor(Math.random() * answers.words.length)].toUpperCase())
    setIsLoading(false)
  }, [])

  const validWord = (w) => {
    return allWords.includes(w.toLowerCase())
  }

  const stopClick = () => {
    setTimeout(() => document.getElementById(currentBlock).focus(), 20)
  }

  const handleAnswer = (ans) => {
    setGuesses(prev => new Set([...prev, ...ans]))
    ans.forEach((ele, ind) => {
      if(word[ind].toUpperCase() === ele) {
        const block = document.getElementById(`${row}${ind}`)
        block.style.backgroundColor = '#538d4e'
        block.style.borderColor = '#538d4e'
        const key = document.getElementById(`keyboard-${ele}`).style.backgroundColor = '#538d4e'

      }
      else if(word.toUpperCase().includes(ele)) {
        const block = document.getElementById(`${row}${ind}`)
        block.style.backgroundColor = '#b59f3b'
        block.style.borderColor = '#b59f3b'
        const key = document.getElementById(`keyboard-${ele}`).style.backgroundColor = '#b59f3b'
      }
      else {
        const block = document.getElementById(`${row}${ind}`)
        block.style.backgroundColor = '#3a3a3c'
        block.style.borderColor = '#3a3a3c'
        const key = document.getElementById(`keyboard-${ele}`).style.backgroundColor = '#3a3a3c'
      }
    })
    if(ans.join('') === word.toUpperCase()) {
      alert('you won!')
      const inputs = [].slice.call(document.getElementsByTagName('input')).forEach(ele => ele.disabled = true)
    } 
    else if(document.getElementById('54').value !== "") {
      alert(`Game over! The word was ${word}`)
    }
  }

  const updateValues = (n, i, j) => {
    setValues(v => {
      v[i][j] = n
      return [...v]
    })
  }

  useEffect(() => {
    if(document.getElementById(currentBlock))
      document.getElementById(currentBlock).focus()
  }, [currentBlock])

  const simulateKeyPress = (key) => {
    stopClick()
    if(key.key === 'BACK') {
      updateValues('', currentBlock[0], currentBlock[1])
      if(currentBlock[1] != 0 && values[currentBlock[0]][currentBlock[1]] === '') {
        updateValues('', currentBlock[0], parseInt(currentBlock[1])-1)
        setCurrentBlock(`${currentBlock[0]}${parseInt(currentBlock[1])-1}`)
      }
    }
    else if(key.key === 'ENTER') {
      if(!values[currentBlock[0]].includes('')) {
        if(!validWord(values[currentBlock[0]].join(''))) {
          alert('Word not in word list!')
        }
        else {
          if(currentBlock[0] != 5) setRow(r => r + 1)
          handleAnswer(values[currentBlock[0]])
        }
      }
    }
    else if(key.keyCode >= 65 && key.keyCode <= 90 && document.getElementById(currentBlock).value === '') {
      updateValues(key.key, currentBlock[0], currentBlock[1])
      document.getElementById(currentBlock).value = key.key
      if(currentBlock[1] < 4) {
        setCurrentBlock(`${currentBlock[0]}${parseInt(currentBlock[1])+1}`)
      }
    }
  }

  return (
    <>
        
          <div id="main" onClick={() => stopClick()}>
            <Keyboard 
              simulateKeyPress={simulateKeyPress} 
              guesses={guesses} 
            />
          </div>
          { !isLoading ? (
          <div className='wordle-wrapper'>
            <h1 onClick={stopClick}>W O R D L E</h1>
            <hr />
            <br />
            {
              Array(6).fill(0).map((_, i) => {
                return (
                  <Row
                    key={i}
                    row={row}
                    index={i}
                    input={input}
                    setInput={setInput}
                    setRow={setRow}
                    setCurrentBlock={setCurrentBlock}
                    handleAnswer={handleAnswer}
                    validWord={validWord}
                    values={values[i]}
                    updateValues={updateValues}
                  />
                )})
              }
          </div>
        ) : (
          <div className='wordle-wrapper'><h1>Loading...</h1></div>
        )}
      </>
  );
}

export default App;
