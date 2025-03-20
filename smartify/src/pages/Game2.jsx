import React, { useState } from 'react';

const CarbonFootprintQuiz = () => {
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const questions = [
        {
            question: 'What transportation method has the lowest carbon footprint?',
            options: [
                { text: 'Car', isCorrect: false },
                { text: 'Bike', isCorrect: true },
                { text: 'Bus', isCorrect: false }
            ]
        },
        {
            question: 'Which energy source is most eco-friendly?',
            options: [
                { text: 'Coal', isCorrect: false },
                { text: 'Solar', isCorrect: true },
                { text: 'Natural Gas', isCorrect: false }
            ]
        },
        {
            question: 'What activity contributes most to carbon emissions?',
            options: [
                { text: 'Flying', isCorrect: true },
                { text: 'Walking', isCorrect: false },
                { text: 'Biking', isCorrect: false }
            ]
        }
    ];

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResult(true);
        }
    };

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            {showResult ? (
                <div>
                    <h2>Your Score: {score} / {questions.length}</h2>
                </div>
            ) : (
                <div>
                    <h2>{questions[currentQuestion].question}</h2>
                    {questions[currentQuestion].options.map((option, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleAnswer(option.isCorrect)}
                            style={{ display: 'block', margin: '1rem auto', padding: '0.5rem 1rem', backgroundColor: '#00FFFF', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CarbonFootprintQuiz;
