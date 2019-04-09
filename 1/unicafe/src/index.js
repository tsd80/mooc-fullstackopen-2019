import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (<button onClick={props.handleClick}>{props.text}</button>);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
      <div>
        <h2>Anna palautetta</h2>
        <Button handleClick={() => setGood(good+1)} text="Good"/>
        <Button handleClick={() => setNeutral(neutral+1)} text="Neutral"/>
        <Button handleClick={() => setBad(bad+1)} text="Bad"/>
        <h2>statistiikka</h2>
        <div>hyvä {good}</div>
        <div>neutraali {neutral}</div>
        <div>huono {bad}</div>
        <div>yhteensä {good+neutral+bad}</div>
        <div>keskiarvo {((good*1)+(neutral*0)+(bad*-1))/(good+neutral+bad)}</div>
        <div>positiivisia {good/(good+neutral+bad)*100} %</div>
      </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));