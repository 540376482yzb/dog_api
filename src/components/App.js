import React, {Component} from 'react'
import './App.css'
import NavBar from './NavBar'
import ImagesList from './ImagesList'
import {fetchDogBreeds} from '../actions/dog'
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			breeds: null,
			error: null,
			targetBreed: {
				breed: 'random',
				subBreed: null
			}
		}
	}
	componentDidMount() {
		fetchDogBreeds()
			.then(breeds => this.setState({breeds, error: null}))
			.catch(error => this.setState({error}))
	}

	handleSelectedBreed = data => {
		if (data === 'random')
			return this.setState({targetBreed: {...this.state.targetBreed, breed: 'random'}})
		const {breed, subBreed} = data
		this.setState({
			targetBreed: {
				breed,
				subBreed
			}
		})
	}

	render() {
		const {error, breeds, targetBreed} = this.state
		console.log(targetBreed)
		return (
			<div className="App">
				<NavBar breeds={breeds} selected={this.handleSelectedBreed} />
				{error && <p>{error}</p>}
				<ImagesList targetBreed={targetBreed} />
			</div>
		)
	}
}

export default App
