import jokeService from '../services/jokes'

const jokeReducer = (state = [
    {
      "joke": "lol",
      "id": 1
    },
    {
      "joke": "xd",
      "id": 2
    },
    {
      "joke": "123",
      "id": 3
    },
    {
      "joke": "lorem",
      "id": 4
    },
    {
      "joke": "ipsum",
      "id": 5
    },    
], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SAVE':
      return [...state, action.data]
   // case 'INIT':
   //   return [...state, action.data]
    case 'GET':
      return [...state, action.data[0]]
    default:
      return state
  }
}

export const saveJoke = (joke) => {
  return async dispatch => {
    dispatch({
      type: 'SAVE',
      data: joke,
    })
  }

}

/**export const initializeJokes = () => {
  return dispatch => {
    const jokes = jokeService.getFromJson()
    dispatch({
      type: 'INIT',
      data: jokes,
    })
  }
}**/

export const getRandomJoke = () => {
  return async dispatch => {
    const randomJoke = await jokeService.getRandomJoke();
    console.log(randomJoke)
    dispatch({
      type: 'GET',
      data: randomJoke,
    })
  }
}
export default jokeReducer