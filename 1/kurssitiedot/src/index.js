import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const [first,second,third] = props.parts.parts
  return (
      <div>
        <Part part={first}/>
        <Part part={second}/>
        <Part part={third}/>
      </div>
  )
}

const Part = (props) => {
  return (
      <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  let x=0
  props.total.parts.map (xx => x += xx.exercises)
  return (
      <p>yhteensä {x} tehtävää</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  return (
      <div>
        <Header course={course.name}/>
        <Content parts={course}/>
        <Total total={course}/>
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))