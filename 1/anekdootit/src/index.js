import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (<button onClick={props.handleClick}>{props.text}</button>);

const GetTop = ({score, text}) => {
  const maxIndex = score.indexOf(Math.max(...score));
  return (
      <div>
        <h2>Anecdote with most votes</h2>
        <div>{text[maxIndex]}</div>
        <div>has {score[maxIndex]} points</div>
      </div>
  );
};

const App = (props) => {

  const [selected, setSelected] = useState(0);
  const [score, setScore] = useState(Array.from(Array(props.anecdotes.length), ()=>0));

  const handleScore = (point) => {
    const newScore = [...score];
    newScore[point] +=1;
    setScore(newScore);
  };

  return (
      <div>
        <div>{props.anecdotes[selected]}</div>
        <div>has {score[selected]} points</div>
        <Button handleClick={() => setSelected(Math.floor(Math.random()*props.anecdotes.length))} text="next anecdote"/>
        <Button handleClick={() => handleScore(selected)} text="Vote it!"/>
        <GetTop score={score} text={props.anecdotes}/>
      </div>
  )
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));