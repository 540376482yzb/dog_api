import {normalizeResponseErrors} from './utilis'
export const fetchDogBreeds = () => {
	return fetch('https://dog.ceo/api/breeds/list/all', {
		method: 'GET'
	})
		.then(normalizeResponseErrors)
		.then(res => res.json())
		.then(res => {
			if (res.status !== 'success') {
				const err = new Error(`${res.message}`)
				throw err
			}
			const allDogs = res.message
			const dogBreeds = {}
			for (let breed in res.message) {
				allDogs[breed].length !== 0 && (dogBreeds[breed] = res.message[breed])
			}
			return Promise.resolve(dogBreeds)
		})
		.catch(err => {
			return Promise.reject(err)
		})
}

export const fetchRandomDog = () => {
	return fetch('https://dog.ceo/api/breeds/image/random/50', {
		method: 'GET'
	})
		.then(normalizeResponseErrors)
		.then(res => res.json())
		.then(res => {
			if (res.status !== 'success') {
				const err = new Error(`${res.message}`)
				throw err
			}
			return Promise.resolve(res.message)
		})
		.catch(err => {
			return Promise.reject(err)
		})
}

export const fetchDogByBreed = dog => {
	const {breed, subBreed} = dog
	const option = subBreed && subBreed !== 'all' ? `/${subBreed}` : ''
	return fetch(`https://dog.ceo/api/breed/${breed}${option}/images`, {
		method: 'GET'
	})
		.then(normalizeResponseErrors)
		.then(res => res.json())
		.then(res => {
			if (res.status !== 'success') {
				const err = new Error(`${res.message}`)
				throw err
			}
			return Promise.resolve(res.message)
		})
		.catch(err => {
			return Promise.reject(err)
		})
}
