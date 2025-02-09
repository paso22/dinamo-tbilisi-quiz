import {useReducer, useState} from "react";

const reducer = function (state, action) {
    switch (action.type) {
        case "inc" :
            return {...state, count: state.count + state.step};
        case "dec" :
            return {...state, count: state.count - state.step};
        case "setCount" :
            return {...state, count: action.payload};
        case "setStep" :
            return {...state, step: action.payload};
        case "reset" :
            return {count: 0, step: 1};
        default :
            throw new Error("type is not correct")
    }
}

function DateCounter() {
    const initialState = {step: 1, count: 0};
    const [state, dispatch] = useReducer(reducer, initialState);
    const {step, count} = state;

    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    const dec = function () {
        // setCount((count) => count - 1);
        // setCount((count) => count - step);
        dispatch({type: "dec"});
    };

    const inc = function () {
        // setCount((count) => count + 1);
        // setCount((count) => count + step);
        dispatch({type: "inc"});
    };

    const defineCount = function (e) {
        // setCount(Number(e.target.value));
        dispatch({type: "setCount", payload: Number(e.target.value)});
    };

    const defineStep = function (e) {
        // setStep(Number(e.target.value));
        dispatch({type: "setStep", payload: Number(e.target.value)});
    };

    const reset = function () {
        // setCount(0);
        // setStep(1);
        dispatch({type: "reset"});
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount}/>
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default DateCounter;