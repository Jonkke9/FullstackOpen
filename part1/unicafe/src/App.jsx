import { useState } from 'react'

const Header = () => 
  <h1>give feedback</h1>

const Button = (props) => 
  <button onClick={props.onClick}>{props.name}</button>

const StatsHeader = () => 
  <h1>statistics</h1>

const StatisticLine = ({name, value}) => 
  <div>{name} {value}</div>


const Stats = ({feedback}) => {
  const [good, neutral, bad] = feedback
  const sum = good + neutral + bad

  if (sum === 0) {
    return (
      <div>
        <StatsHeader/>
        <div>No feedback given</div>
      </div>
    )
  }
  
  const average = (good + bad * -1) / sum 
  const ratio = good / sum * 100
  
  return (
    <div>
      <StatsHeader/>
      <StatisticLine name="good" value={good}/>
      <StatisticLine name="neutral" value={neutral}/>
      <StatisticLine name="bad" value={bad}/>
      <StatisticLine name="all" value={sum}/>
      <StatisticLine name="average" value={average}/>
      <StatisticLine name="Positive" value={ratio + "%"}/>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedback = [good, neutral, bad]


  return (
    <div>
      <Header/>
      <Button onClick = {() => setGood(good + 1)} name = "good"/>
      <Button onClick = {() => setNeutral(neutral + 1)} name = "neutral"/>
      <Button onClick = {() => setBad(bad + 1)} name = "bad"/>
      <Stats feedback = {feedback}/>
    </div>
  )
}
export default App
