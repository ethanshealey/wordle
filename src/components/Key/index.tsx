import React from 'react'

const Key = ({ char, simulateKeyPress }: {char: string, simulateKeyPress: any }) => {
  return (
    <div id={`key-${char}`} onClick={() => simulateKeyPress(char)}>{ char }</div>
  )
}

export default Key