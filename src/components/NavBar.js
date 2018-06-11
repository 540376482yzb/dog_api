import React from 'react'

export default class NavBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			subBreed: null
		}
	}
	handleSelectBreed = e => {
		const {breeds} = this.props
		e.preventDefault()
		this.targetBreed = e.target.value
		this.setState({subBreed: breeds[this.targetBreed]})
	}
	handleSelectSubBreed = e => {
		this.targetSubBeeed = e.target.value
	}
	generateBreedOptions = breeds => {
		const mainBreeds = Object.keys(breeds)
		return mainBreeds.map((breed, index) => {
			return (
				<option value={breed} key={index}>
					{breed}
				</option>
			)
		})
	}
	generateSubOptions = () => {
		const {subBreed} = this.state
		if (subBreed) {
			return subBreed.map((sub, index) => {
				return (
					<option key={index} value={sub}>
						{sub}
					</option>
				)
			})
		}
	}

	handleSubmit = e => {
		e.preventDefault()
		const {selected} = this.props
		if (this.selectedRandom) return selected('random')
		selected({
			breed: this.targetBreed,
			subBreed: this.targetSubBeeed
		})
	}

	render() {
		const {breeds} = this.props
		const {subBreed} = this.state
		if (!breeds) return <div>...</div>

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<section>
						<label htmlFor="main-breed">main breed</label>
						<select name="main-breed" id="main-breed" onChange={this.handleSelectBreed}>
							<option>select a breed</option>
							{this.generateBreedOptions(breeds)}
						</select>
					</section>
					<section>
						<label htmlFor="sub-breed">sub breed</label>
						<select name="sub-breed" id="sub-breed" onChange={this.handleSelectSubBreed}>
							<option>all</option>
							{this.generateSubOptions()}
						</select>
					</section>

					<button type="submit">Search</button>
				</form>
			</div>
		)
	}
}
