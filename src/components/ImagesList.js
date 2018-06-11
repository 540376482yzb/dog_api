import React from 'react'
import {fetchRandomDog, fetchDogByBreed} from '../actions/dog'
import './ImagesList.css'
export default class ImagesList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dogs: []
		}
	}
	componentDidMount() {
		const {targetBreed} = this.props

		//fetch random dog
		if (targetBreed.breed === 'random') {
			return fetchRandomDog()
				.then(dogs => this.setState({dogs}))
				.catch(err => console.log('error', err))
		}
	}
	generateDogList = (src, index) => {
		return (
			<li key={index} className="dog-image">
				<img src={src} alt={index} className="img" />
			</li>
		)
	}
	componentWillReceiveProps(nextProps) {
		const curr = this.props.targetBreed
		const next = nextProps.targetBreed
		if (curr && next) {
			if (next.breed !== curr.breed || next.subBreed !== curr.subBreed) {
				fetchDogByBreed(next)
					.then(dogs => this.setState({dogs}))
					.catch(err => console.log(err))
			}
		}
	}
	render() {
		const {dogs} = this.state
		return (
			<main>
				<ul className="dogs-container">{dogs.length > 0 && dogs.map(this.generateDogList)}</ul>
			</main>
		)
	}
}
