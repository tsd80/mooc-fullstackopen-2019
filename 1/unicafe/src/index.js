import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (<button onClick={props.handleClick}>{props.text}</button>);

const Statistic = ({text, value}) => {
  return (
      <div>{text} {value}</div>
  )
};

const Statistics = ({good, neutral, bad}) => {
  const sum = good+neutral+bad;
  const avg = (good + bad*-1)/sum;
  const positive = good/sum*100;

  if (sum) {
  return (
      <div>
        <h2>statistiikka</h2>
        <Statistic text="hyvä" value={good}/>
        <Statistic text="neutraali" value={neutral}/>
        <Statistic text="huono" value={bad}/>
        <Statistic text="yhteensä" value={sum}/>
        <Statistic text="keskiarvo" value={avg}/>
        <div>positiivisia {positive} %</div>
      </div>
  )}
  else {
    return (
        <div>Ei yhtään palautetta annettu</div>
    )
  }
};

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
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));