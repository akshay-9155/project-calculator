import React, { useReducer } from 'react'
import { LuDelete } from "react-icons/lu";
import DigitButtons from './DigitButtons';
import OperationButtons from './OperationButtons';
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}
const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const current = parseFloat(currentOperand)
  const previous = parseFloat(previousOperand)
  if (isNaN(current) || isNaN(previous)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = previous + current
      break;
    case "-":
      computation = previous - current
      break;
    case "*":
      computation = previous * current
      break;
    case "÷":
      computation = previous / current
      break;
  }
  return computation.toString();
}
const reducer = (state, { type, payLoad }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overWrite){
        return {
          ...state,
          currentOperand: payLoad.digit,
          overWrite: false
        }
      }
      if (payLoad.digit == "00" && (state.currentOperand == "0" || !state.currentOperand)) {
        return state
      }
      if (payLoad.digit == "0" && state.currentOperand == "0") {
        return state
      }
      if (payLoad.digit === "." && (state.currentOperand && state.currentOperand.includes("."))) {
        return state
      } else {
        return { ...state, currentOperand: `${state.currentOperand || ""}${payLoad.digit}` }
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if (state.previousOperand == null) {
        return { ...state, operation: payLoad.operation, previousOperand: state.currentOperand, currentOperand: null }
      }
      if (state.currentOperand === null) {
        return { ...state, operation: payLoad.operation }
      }
      else {
        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payLoad.operation,
          currentOperand: null
        }
      }
    case ACTIONS.EVALUATE:
      if(state.operation === null || state.currentOperand === null || state.previousOperand === null){
        return state
      }
      return {
        ...state,
        overWrite: true,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null
      }
    case ACTIONS.DELETE_DIGIT:
      if(state.currentOperand === null){
        return state
      }if(state.currentOperand.length === 1){
        return {
          ...state,
          currentOperand: null
        }
      }
      else{
        return {
          ...state,
          currentOperand: state.currentOperand && state.currentOperand.slice(0,-1)
        }
      }
  }
}


const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0
}) 
const formatNumber = operand => {
  if (operand === null || operand === undefined) return ;
  const [integer, decimal] = operand.split(".");
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal || ""}`;
};


const App = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})
  return (
    <div className=' bg-gradient-to-r h-[100dvh] sm:h-screen flex items-center justify-center from-teal-300 to-indigo-500'>
      <div className="calculator grid grid-cols-4 gap-2">
        <div className="output min-h-32 max-h-44 w-96 rounded-2xl cursor-pointer col-span-4 flex flex-col justify-around break-all items-end p-2 bg-zinc-900 text-zinc-50">
          <span className='text-3xl'>{formatNumber(previousOperand)} {operation}</span>
          <span className='text-5xl'>{formatNumber(currentOperand)}</span>
        </div>
        <button onClick={() => dispatch({ type: ACTIONS.CLEAR })} className=' select-none text-3xl p-6 rounded-full col-span-2 bg-zinc-50 bg-opacity-10 hover:bg-opacity-50'>AC</button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })} className=' select-none text-3xl p-6 rounded-full bg-zinc-50 bg-opacity-10 hover:bg-opacity-50'><LuDelete /></button>
        <OperationButtons operation="÷" dispatch={dispatch} />
        <DigitButtons digit="7" dispatch={dispatch} />
        <DigitButtons digit="8" dispatch={dispatch} />
        <DigitButtons digit="9" dispatch={dispatch} />
        <OperationButtons operation="*" dispatch={dispatch} />
        <DigitButtons digit="4" dispatch={dispatch} />
        <DigitButtons digit="5" dispatch={dispatch} />
        <DigitButtons digit="6" dispatch={dispatch} />
        <OperationButtons operation="-" dispatch={dispatch} />
        <DigitButtons digit="1" dispatch={dispatch} />
        <DigitButtons digit="2" dispatch={dispatch} />
        <DigitButtons digit="3" dispatch={dispatch} />
        <OperationButtons operation="+" dispatch={dispatch} />
        <DigitButtons digit="0" dispatch={dispatch} />
        <DigitButtons digit="." dispatch={dispatch} />
        <DigitButtons digit="00" dispatch={dispatch} />
        <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })} className=' select-none text-3xl p-6 rounded-full bg-zinc-50 bg-opacity-10 hover:bg-opacity-50'>=</button>
      </div>
    </div>
  )
}

export default App