import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

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

function App() {
    const [{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        remainingSeconds
    }, dispatch] = useReducer(reducer, initialState);

    const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then(res => res.json())
            .then(data => dispatch({type: "dataReceived", payload: data}))
            .catch(err => dispatch({type: "dataFailed"}));
    }, []);

    return (
        <div className="app">
            <Header/>
            <Main>
                {status === 'loading' && <Loader/>}
                {status === 'error' && <Error/>}
                {status === 'ready' && <StartScreen dispatch={dispatch} numOfQuestions={questions.length}/>}
                {status === 'active' && (
                    <>
                        <Progress
                            numOfQuestions={questions.length}
                            index={index}
                            point={points}
                            maxPoints={maxPoints}
                            answer={answer}
                        />
                        <Question question={questions[index]} answer={answer} dispatch={dispatch}/>
                        <Footer>
                            <Timer remainingSeconds={remainingSeconds} dispatch={dispatch}/>
                            <NextButton dispatch={dispatch} answer={answer} index={index}
                                        numOfQuestions={questions.length}/>
                        </Footer>
                    </>)}
                {status === 'finished' && <FinishScreen points={points}
                                                        maxPoints={maxPoints}
                                                        highscore={highscore}
                                                        dispatch={dispatch}
                />}
            </Main>
        </div>
    );
}

export default App;
