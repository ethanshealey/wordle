import { useState } from 'react';

const Keyboard = (props) => {

  const [row1, setRow1] = useState(['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'])
  const [row2, setRow2] = useState(['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'])
  const [row3, setRow3] = useState(['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'])

  return (
    <div id="keyboard">
        <div className="keyboard-row">
            {row1.map((key, i) => (
                <div key={i} className={`key`} id={`keyboard-${key}`} onClick={() => { props.simulateKeyPress({key: key, keyCode: key.charCodeAt(0)}) }}>{key}</div>
            ))}
        </div>
        <div className="keyboard-row">
            {row2.map((key, i) => (
                <div key={i} className={`key`} id={`keyboard-${key}`} onClick={() => { props.simulateKeyPress({key: key, keyCode: key.charCodeAt(0)}) }}>{key}</div>
            ))}
        </div>
        <div className="keyboard-row">
            {row3.map((key, i) => (
                <div key={i} className={`key ${(key === 'ENTER' || key ==='BACK') && 'spec'}`} id={`keyboard-${key}`} onClick={() => { props.simulateKeyPress({key: key, keyCode: key.charCodeAt(0)}) }}>{key}</div>
            ))}
        </div>
    </div>
)
};

export default Keyboard;
