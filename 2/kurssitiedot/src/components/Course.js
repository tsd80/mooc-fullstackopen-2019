import React from 'react'

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
  const parts = () => props.parts.parts.map ((xx) => <Part key={xx.id} part={xx}/>);
  return (<div className="content">{parts()}</div>)
};

const Part = (props) => {
  return (
      <p key={props.part.id}>{props.part.name} {props.part.exercises}</p>
  )
};

const Total = (props) => {
  let x= props.total.parts.reduce((acc, cur) => acc+cur.exercises,0);
  return (
      <div className="total">yhteensä {x} tehtävää</div>
  )
};

export default Course
