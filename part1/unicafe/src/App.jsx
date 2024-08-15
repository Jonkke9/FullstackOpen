import { useState } from 'react'

const Header = () => 
  <h1>give feedback</h1>

const Button = (props) => 
  <button onClick={props.onClick}>{props.name}</button>

const StatsHeader = () => 
  <h1>statistics</h1>

const Stats = ({feedback}) => {
  const [good, neutral, bad] = feedback
  const sum = good.value + neutral.value + bad.value
  const average = (good.value + bad.value * -1) / sum 
  const ratio = good.value / sum * 100
  
  return (
    <div>
      <StatsHeader/>
      <StatDisplay name={good.name} value={good.value}/>
      <StatDisplay name={neutral.name} value={neutral.value}/>
      <StatDisplay name={bad.name} value={bad.value}/>
      <StatDisplay name="all" value={sum}/>
      <StatDisplay name="average" value={average}/>
      <StatDisplay name="Positive" value={ratio + "%"}/>
    </div>
  )
}

const StatDisplay = ({name, value}) => 
  <div>{name} {value}</div>


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedback = [
    {name: "good", value: good}, 
    {name: "neutral", value: neutral}, 
    {name: "bad", value: bad}
  ]


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
