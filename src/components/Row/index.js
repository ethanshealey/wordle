import { useState, useEffect } from 'react';

const Row = (props) => {

    const [isDisabled, setIsDisabled] = useState(false)
    const [values, setValues] = useState([
        '', '', '' , '', ''
    ])

    useEffect(() => {
        if(!values.includes('')) {
            document.getElementById(`${props.index+1}0`).focus()  
            props.setCurrentBlock(`${props.index+1}0`)
        }      
    }, [props.row])

    const handleInput = (e, index) => {
        if(e.key === "Backspace") { 
            setValues(v => v.map((ele, ind) => { return ind === index ? '' : ele }))
            if(index !== 0 && values[index] === '') {
                document.getElementById(`${props.index}${index-1}`).focus()
                setValues(v => v.map((ele, ind) => { return ind === index-1 ? '' : ele }))
                props.setCurrentBlock(`${props.index}${index-1}`)
            }
        }
        else if(e.key === "Enter") {
            
            if(!values.includes('')) {
                if(!props.validWord(values.join(''))) {
                    alert('Word not in word list')
                }
                else {
                    if(props.index !== 5) props.setRow(r => r+1)
                    setIsDisabled(true)
                    props.handleAnswer(values)
                }
            }
        }
        else if(e.keyCode >= 65 && e.keyCode <= 90 && values[index] === '') {
            setValues(v => v.map((ele, ind) => { return ind === index ? e.key.toUpperCase() : ele }))
            index !== 4 && document.getElementById(`${props.index}${index+1}`).focus()
            if(index !== 4) props.setCurrentBlock(`${props.index}${index+1}`)
        }
    }

    return (
        <>
            {
                Array(5).fill(1).map((_, i) => {
                    return (
                        <input id={props.index + '' + i} value={values[i]} className={`input-block ${values[i] === '' ? '' : 'bordered'}`} disabled={props.row !== props.index || isDisabled} maxLength={1} autoFocus={props.index + '' + i === `${props.index}0`} onMouseDown={(e) => e.preventDefault()} onKeyDown={(e) => handleInput(e, i)}/>
                    )
                })
            }
        </>
    );
};

export default Row;
