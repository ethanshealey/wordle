import { useState, useEffect } from 'react';

const Row = (props) => {

    const [isDisabled, setIsDisabled] = useState(false)
    //const [values, setValues] = useState([
    //    '', '', '' , '', ''
    //])

    useEffect(() => {
        if(!props.values.includes('')) {
            document.getElementById(`${props.index+1}0`).focus()  
            props.setCurrentBlock(`${props.index+1}0`)
        }      
    }, [props.row])

    const handleInput = (e, index) => {
        if(e.key === "Backspace") { 
            props.updateValues('', props.index, index)
            if(index !== 0 && props.values[index] === '') {
                document.getElementById(`${props.index}${index-1}`).focus()
                props.updateValues('', props.index, index-1)
                props.setCurrentBlock(`${props.index}${index-1}`)
            }
        }
        else if(e.key === "Enter") {
            
            if(!props.values.includes('')) {
                if(!props.validWord(props.values.join(''))) {
                    alert('Word not in word list')
                }
                else {
                    if(props.index !== 5) props.setRow(r => r+1)
                    setIsDisabled(true)
                    props.handleAnswer(props.values)
                }
            }
        }
        else if(e.keyCode >= 65 && e.keyCode <= 90 && props.values[index] === '') {
            props.updateValues(e.key.toUpperCase(), props.index, index)
            index !== 4 && document.getElementById(`${props.index}${index+1}`).focus()
            if(index !== 4) props.setCurrentBlock(`${props.index}${index+1}`)
        }
    }

    return (
        <>
            {
                Array(5).fill(1).map((_, i) => {
                    return (
                        <input key={i} id={props.index + '' + i} value={props.values[i]} className={`input-block ${props.values[i] === '' ? '' : 'bordered'}`} readOnly disabled={props.row !== props.index || isDisabled} maxLength={1} autoFocus={props.index + '' + i === `${props.index}0`} onMouseDown={(e) => e.preventDefault()} onKeyDown={(e) => handleInput(e, i)}/>
                    )
                })
            }
        </>
    );
};

export default Row;
