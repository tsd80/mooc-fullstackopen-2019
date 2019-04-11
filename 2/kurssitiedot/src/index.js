import React from 'react'
import ReactDOM from 'react-dom'


const Course = (props) => {
  return (
      <div className="course">
        <Header course={props.course.name}/>
        <Content parts={props.course}/>
        <Total total={props.course}/>
      </div>
  )
};

const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
};

const Content = (props) => {
  const parts = () => props.parts.parts.map ((xx) =>
      <Part key={xx.id} part={xx}/>
  );
  return (
      <div className="content">{parts()}</div>
  )
};

const Part = (props) => {
  return (
      <p key={props.part.id}>{props.part.name} {props.part.exercises}</p>
  )
};

const Total = (props) => {
  let x=0;
  props.total.parts.map (xx => x += xx.exercises);
  return (
      <div className="total"> yhteensä {x} tehtävää</div>
  )
};


const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10,
        id: 1
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
        id: 2
      },
      {
        name: 'Komponenttien tila',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 7,
        id: 4
      }
    ]
  };

  return (
      <div className="app">
        <Course course={course} />
      </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));