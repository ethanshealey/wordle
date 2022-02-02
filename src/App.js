import { useState, useEffect } from 'react'
import Row from './components/Row'
import words from './words/word-list.json'
import answers from './words/answer-list.json'

function App() {
  
  const [input, setInput] = useState('')
  const [row, setRow] = useState(0)
  const [currentBlock, setCurrentBlock] = useState('00')
  const [isLoading, setIsLoading] = useState(true)

  const [word, setWord] = useState('')
  const [allWords, setAllWords] = useState([])

  useEffect(() => {
    setIsLoading(true)
    setAllWords(words.words)
    setWord(answers.words[Math.floor(Math.random() * answers.words.length)].toUpperCase())
    setIsLoading(false)
  }, [])

  const stopClick = () => {
    setTimeout(() => document.getElementById(currentBlock).focus(), 20)
  }

  const handleAnswer = (ans) => {
    ans.forEach((ele, ind) => {
      if(word[ind].toUpperCase() === ele) {
        const block = document.getElementById(`${row}${ind}`)
        block.style.backgroundColor = '#538d4e'
        block.style.borderColor = '#538d4e'
      }
      else if(word.toUpperCase().includes(ele)) {
        const block = document.getElementById(`${row}${ind}`)
        block.style.backgroundColor = '#b59f3b'
        block.style.borderColor = '#b59f3b'
      }
      else {
        const block = document.getElementById(`${row}${ind}`)
        block.style.backgroundColor = '#3a3a3c'
        block.style.borderColor = '#3a3a3c'
      }
    })
    if(ans.join('') === word.toUpperCase()) {
      alert('you won!')
      const inputs = [].slice.call(document.getElementsByTagName('input')).forEach(ele => ele.disabled = true)
    } 
  }

  return (
    <>
      <div id="main" onClick={() => stopClick()}></div>
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
