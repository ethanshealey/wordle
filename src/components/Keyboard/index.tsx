import { useState } from 'react'
import Key from '../Key'

const Keyboard = ({ simulateKeyPress }: { simulateKeyPress: any }) => {

  const [ keys, _ ] = useState([
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
  ])

  return (
    <div id="keyboard">
      { 
        keys.map((row) => 
          (
            <div key={`row-${row}`} className="keyboard-row">
              {
                row.map((key) => (
                  <Key key={`key-${key}`} char={key} simulateKeyPress={simulateKeyPress} />
                ))
              }
            </div>
          )
        )
      }
    </div>
  )
}

export default Keyboard