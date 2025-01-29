import {createContext, useContext, useEffect, useReducer} from "react";
import Error from "../components/Error";

const QuizContext = createContext(null);

const initialState = {
    questions: [],
    //loading, error, ready, active, finished
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    remainingSeconds: 0
}

const SECS_PER_QUESTION = 15;

const reducer = function (state, action) {
    switch (action.type) {
        case "dataReceived":
            return {...state, questions: action.payload, status: "ready"};
        case "dataFailed":
            return {...state, status: "error"};
        case "started":
            return {...state, status: "active", remainingSeconds: state.questions.length * SECS_PER_QUESTION};
        case "answered" :
            const currQuestion = state.questions[state.index];
            const correctAnswer = currQuestion.correctOption === action.payload;
            return {
                ...state,
                answer: action.payload,
                points: correctAnswer ? state.points + currQuestion.points : state.points
            };
        case "nextQuestion" :
            return {
                ...state,
                index: state.index + 1,
                answer: null
            };
        case "finished" :
            return {
                ...state,
                status: 'finished',
                highscore: state.points > state.highscore ? state.points : state.highscore
            };
        case "restart" :
            return {
                ...state,
                status: "ready",
                index: 0,
                answer: null,
                points: 0
            };
        case "tick" :
            return {
                ...state,
                remainingSeconds: state.remainingSeconds - 1,
                status: state.remainingSeconds === 0 ? 'finished' : state.status,
                highscore:
                    state.secondsRemaining === 0
                        ? Math.max(state.points, state.highscore)
                        : state.highscore
            }
        default :
            throw new Error("Incorrect action type detected!");
    }
}

function QuizProvider({children}) {
    const [{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        remainingSeconds
    }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then(res => res.json())
            .then(data => handleDataReceived(data))
            .catch(() => handleDataFailed());
    }, []);

    const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

    const handleStart = function () {
        console.log("started");
        dispatch({type: "started"});
    }

    const handleAnswer = function (index) {
        dispatch({type: "answered", payload: index});
    }

    const handleTick = function () {
        dispatch({type: "tick"});
    }

    const handleNextQuestion = function () {
        dispatch({type: "nextQuestion"})
    }

    const handleFinish = function () {
        dispatch({type: "finished"})
    }

    const handleRestart = function () {
        dispatch({type: "restart"});
    }

    const handleDataReceived = function (data) {
        dispatch({type: "dataReceived", payload: data});
    }

    const handleDataFailed = function () {
        dispatch({type: "dataFailed"});
    }

    return <QuizContext.Provider
        value={{
            questions,
            status,
            index,
            answer,
            points,
            highscore,
            remainingSeconds,
            handleStart,
            handleAnswer,
            handleTick,
            handleNextQuestion,
            handleFinish,
            handleRestart,
            handleDataReceived,
            handleDataFailed,
            maxPoints
        }}>
        {children}
    </QuizContext.Provider>
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined)
        throw new Error("Question context was used outside of provider");
    return context;
}

export {QuizProvider, useQuiz};