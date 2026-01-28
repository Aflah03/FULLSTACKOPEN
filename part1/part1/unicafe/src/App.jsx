import { useState } from "react"
const StatisticLine = (props) => {
	return (
		<>
			<p>{props.statistic} {props.value}</p>
		</>
	)
}
const Statisctics = (props) => {
	console.log(props);

	if (props.all > 0) {

		return (
			<>
				<table>
					<tr>
						<td>
							<StatisticLine statistic={"good"} value={props.good}></StatisticLine>
						</td>
					</tr>
					<tr>
						<td>
							<StatisticLine statistic={"nuetral"} value={props.neutral}></StatisticLine>
						</td>
					</tr>
					<tr>
						<td>
							<StatisticLine statistic={"bad"} value={props.bad}></StatisticLine>
						</td>
					</tr>
					<tr>
						<td>
							<StatisticLine statistic={"all"} value={props.all}></StatisticLine>
						</td>
					</tr>
					<tr>
						<td>
							<StatisticLine statistic={"average"} value={((props.good - props.bad) / props.all).toFixed(2)}></StatisticLine>
						</td>
					</tr>
					<tr>
						<td>
							<StatisticLine statistic={"positive"} value={((props.good / props.all) * 100).toFixed(2)}></StatisticLine>
						</td>
					</tr>

				</table>
			</>
		)
	}
	return (
		<>
			<p>No feedback given</p>
		</>
	)
}
const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const handleGood = () => {
		setGood(good + 1)
	}
	const handleNuetral = () => {
		setNeutral(neutral + 1)
	}
	const handleBad = () => {
		setBad(bad + 1)
	}

	const all = good + bad + neutral;
	return (
		<>
			<h1>Give feedback</h1>
			<button onClick={handleGood}>good</button>
			<button onClick={handleNuetral}>nuetral</button>
			<button onClick={handleBad}>bad</button>
			<h2>statistics</h2>
			<Statisctics all={all} good={good} bad={bad} neutral={neutral} />
		</>
	)
}
export default App
