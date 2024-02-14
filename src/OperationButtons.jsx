import React from 'react'
import { ACTIONS } from './App'
const OperationButtons = ({dispatch, operation}) => {
  return (
    <button onClick={()=>dispatch({type: ACTIONS.CHOOSE_OPERATION, payLoad: {operation: operation}})} className=' select-none text-3xl p-6 rounded-full bg-zinc-50 bg-opacity-10 hover:bg-opacity-50'>{operation}</button>
  )
}

export default OperationButtons