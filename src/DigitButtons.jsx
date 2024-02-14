import React from 'react'
import { ACTIONS } from './App'
const DigitButtons = ({ dispatch, digit }) => {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payLoad: { digit } })} className=' select-none text-3xl p-6 rounded-full bg-zinc-50 bg-opacity-10 hover:bg-opacity-50'>{digit}</button>
    )
}

export default DigitButtons