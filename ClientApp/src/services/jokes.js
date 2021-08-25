import axios from 'axios'
import db from '../db.json';
const baseUrl = 'https://localhost:44392'

const getRandomJoke = async () => {
    const response = await axios.get(`${baseUrl}/Jokes`)
    return response.data
}

const getFromJson = () => {
    return db;
}

const createNew = async (content) => {
    const object =
    {
        content,
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (id) => {
    const response = await axios.put(`${baseUrl}`)
    return response.data
  }

export default {
    getRandomJoke,
    getFromJson,
    createNew,
    update
}