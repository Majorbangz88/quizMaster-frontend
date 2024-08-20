import React, {useEffect, useRef, useState} from 'react';
import FilledButton from "../Buttons/FilledButton";
import styles from './index.module.css';
import {useNavigate} from "react-router-dom";

function Quiz() {
    const [preferences, setPreferences] = useState({
        category: '',
        difficulty: ''
    });
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [isPreferenceSelected, setIsPreferenceSelected] = useState(false);
    const [difficulty, setDifficulty] = useState("");
    const [timer, setTimer] = useState(30);
    // const timerRef = useRef({});
    const navigate = useNavigate();

    const handlePreferenceChange = (e) => {
        const {name, value} = e.target;
        setPreferences({
            ...preferences,
            [name]: value
        });
    };

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);

            // if (timer <= 10) {
            //     timerRef.current.style.color = 'red';
            // } else {
            //     timerRef.current.style.color = 'black';
            // }

            return () => clearInterval(countdown);
        } else {
            handleAnswer(currentQuestion + 1);
        }
    }, [timer]);

    let username = null;

    const handleStartQuiz = async () => {
        console.log(preferences)
        if (preferences.category && difficulty) {
            setIsPreferenceSelected(true);
            try {
                const detail = JSON.parse(localStorage.getItem('detail'));

                const response = await fetch("http://localhost:5000/api/questions/getquestions", {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${detail.token}`
                    },
                    body: {
                        amount: 20,
                        category: preferences.category,
                        difficulty: difficulty,
                        type: 'multiple',
                    }
                }).then(resObj => resObj.json());
                console.log(response)
                setQuestions(response);
                setTimer(30);

            } catch (err) {
                console.error(err);
            }
        } else {
            alert('Please select both category and difficulty level.');
        }

        const userDetail = JSON.parse(localStorage.getItem('detail'));
        username = userDetail.username;
    };

    const handleAnswer = (question) => {
        console.log(score);
        console.log("this is the question", question)

        console.log('Correct answer:', question.correct_answer);
        console.log('Selected Answer:', selectedAnswer);

        if(question.correct_answer === selectedAnswer){
            setScore(score + 1);
        } else if (selectedAnswer === null) {
            setScore(score - 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setTimer(30);
        }
        else {
            setIsQuizFinished(true);
        }
    };

    const handleAnswerSelection = (e) => {
        setSelectedAnswer(e.target.value);
    };

    const calculatePercentage = () => {
        return ((score / questions.length) * 100).toFixed(2);
    };

    const handleRetakeQuiz = () => {
        setIsQuizFinished(false);
        setIsPreferenceSelected(false);
        setQuestions([]);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setPreferences({
            category: '',
            difficulty: ''
        });
        navigate('/quiz');
    }

    if (isQuizFinished) {
        return (
            <div className={styles.answerContainer}>
                <div className={styles.innerDiv}>
                    <h2 className={styles.finished}>Quiz Finished!</h2>
                    <p className={styles.correctScore}>You got:
                        <span className={styles.span}> {score}/{questions.length} </span>
                        questions correct
                    </p>
                    <p className={styles.percent}>Your percentage score is:<br/>
                        <span>{calculatePercentage()}%</span>
                    </p>
                    <FilledButton
                        text={'Retake Quiz'}
                        fontSize={'18px'}
                        fontWeight={'bold'}
                        padding={'15px 30px'}
                        color={'white'}
                        background={'rgb(82, 125, 198)'}
                        width={'300px'}
                        border={'none'}
                        cursor={'pointer'}
                        onclick={handleRetakeQuiz}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.mainContainer}>
            {!isPreferenceSelected ? (
                <div className={styles.preferences}>
                    <h2>Hello {username}</h2>
                    <h2 className={styles.select}>Select Your Preferences</h2>
                    <div className={styles.category}>
                        <label className={styles.labelName}>Category:</label>
                        <select
                            name="category"
                            value={preferences.category}
                            onChange={handlePreferenceChange}
                            className={styles.options}
                        >
                            <option value="" disabled>Select a Category</option>
                            <option value="9">General Knowledge</option>
                            <option value="10">Entertainment Books</option>
                            <option value="11">Entertainment Film</option>
                            <option value="12">Entertainment Music</option>
                            <option value="17">Science & Nature</option>
                            <option value="18">Science Computers</option>
                            <option value="19">Science Mathematics</option>
                            <option value="21">Sports</option>
                            <option value="24">Politics</option>
                            <option value="30">Science Gadgets</option>
                        </select>
                    </div>
                    <div className={styles.category}>
                        <label className={styles.labelName}>Difficulty Level:</label>
                        <select
                            name="difficulty"
                            value={preferences.difficulty}
                            onChange={setDifficulty}
                            className={styles.options}
                        >
                            <option value="" disabled>Difficulty Level</option>
                            <option value="medium">Medium</option>
                        </select>
                    </div>

                    <button onClick={handleStartQuiz} className={styles.prefBtn}>
                        Lets get Started
                    </button>
                </div>
            ) : (
                <div className={styles.questionDiv}>
                    {questions.length > 0 && (
                        <>
                            <h2 className={styles.question}>
                                Question {currentQuestion + 1}/{questions.length}
                            </h2>
                            <p className={styles.theQuestions}>{questions[currentQuestion].question}</p>
                            <div className={styles.timer}>
                                <p style={{fontSize: '23px', fontWeight: 'bold'}}>Time left: 00:{timer} seconds</p>
                            </div>
                            <div>
                                {questions[currentQuestion].incorrect_answers.concat(
                                    questions[currentQuestion].correct_answer
                                ).sort().map((answer, index) => (
                                    <div key={index} className={styles.answerOption}>
                                        <input
                                            type="radio"
                                            id={`answer-${index}`}
                                            name="answer"
                                            value={answer}
                                            onChange={handleAnswerSelection}
                                        />
                                        <label htmlFor={`answer-${index}`}>
                                            {answer}
                                        </label>
                                    </div>
                                ))}
                                <FilledButton
                                    text={'Next Question'}
                                    type="submit"
                                    padding={'10px 20px'}
                                    background={'rgb(82, 125, 198)'}
                                    color={'white'}
                                    cursor={'pointer'}
                                    fontSize={'15px'}
                                    fontWeight={'bolder'}
                                    onclick={() => handleAnswer(questions[currentQuestion])}
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Quiz;
