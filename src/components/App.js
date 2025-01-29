import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import {useQuiz} from "../contexts/QuizContext";

function App() {
    const {
        maxPoints,
        status
    } = useQuiz();

    return (
        <div className="app">
            <Header/>
            <Main>
                {status === 'loading' && <Loader/>}
                {status === 'error' && <Error/>}
                {status === 'ready' && <StartScreen/>}
                {status === 'active' && (
                    <>
                        <Progress
                            maxPoints={maxPoints}
                        />
                        <Question/>
                        <Footer>
                            <Timer/>
                            <NextButton/>
                        </Footer>
                    </>
                )}
                {status === 'finished' && <FinishScreen maxPoints={maxPoints}
                />}
            </Main>
        </div>
    );
}

export default App;
