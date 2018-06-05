class Clock extends React.Component {
	render () {
		return <div>Time: {this.state.currentTime}</div>
	}
}

ReactDOM.render(<Clock />,
		document.getElementById('content')
	       );
