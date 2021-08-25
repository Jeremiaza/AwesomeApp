
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { saveJoke, getRandomJoke } from '../reducers/jokeReducer'
const NewJoke = (props) => {
    /**const saveJoke = async (event) => {
        event.preventDefault()
        const content = event.target.value;
        props.saveJoke();
    }**/

    return (
        <button 
        style={{
            width: 100,
            background: 'aliceblue',
            margin:10,
            color: 'black',
            float:"center",
            fontWeight: 'bold',
        }}
        type="submit" onClick={() => props.getRandomJoke()}>Add a joke</button>
    )
}

export default connect(
    null,
    { saveJoke, getRandomJoke }
)(NewJoke)