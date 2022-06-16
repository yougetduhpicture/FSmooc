import { useState } from 'react'

//BUTTON
const Button = (props) => {
  return(
    <div>
      <button onClick={() => props.set(props.option + 1)}>{props.text}</button>
    </div>
  )
}

//STATISTICLINE
const StatisticLine = (props) => {
  return(
 
      <tr>
        <td>{props.text}:</td>
        <td>{props.stat}</td>
      </tr>

  )
}

//STATS
const Statistics = (props) => {

  if (props.good + props.bad + props.neutral > 0) {
    return(
      <div>
        <h1>Stats</h1>
        <table>
          <tbody>
            <StatisticLine text="Good" stat={props.good}/>
            <StatisticLine text="Neutral" stat={props.neutral}/>
            <StatisticLine text="Bad" stat={props.bad}/>
            <StatisticLine text="Total" stat={props.good + props.bad + props.neutral}/>
            <StatisticLine text="Average" stat={(props.good - props.bad) / (props.good + props.bad + props.neutral)}/>
            <StatisticLine text="Positive" stat={props.good / (props.good + props.bad + props.neutral) * 100 + " %"}/>
          </tbody>
        </table>
      </div>
      )
  } 
  else {
      return(
       <div>
          <h1>Stats</h1>
           <p>No feedback given yet :/</p>
       </div>
       )
  }
}

//APP
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
        <h1>can i have a feedback plz （´ －｀）ノ</h1>
          <Button text="good" set={setGood} option={good}/>
          <Button text="neutral" set={setNeutral} option={neutral}/>
          <Button text="bad" set={setBad} option={bad}/>
        
        <Statistics good={good} neutral={neutral} bad={bad}/>

      </div>
  )
}

export default App