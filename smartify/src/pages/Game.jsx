import React, { useState } from 'react';

const CarbonFreeJourney = () => {
    const [score, setScore] = useState(100);
    const [stage, setStage] = useState(0);

    const stages = [
        {
            question: "You need to travel 10 km. Which option do you choose?",
            options: [
                { text: "Walk", impact: 0 },
                { text: "Bike", impact: 2 },
                { text: "Car", impact: 10 }
            ]
        },
        {
            question: "You're building a new facility. What energy source do you use?",
            options: [
                { text: "Solar", impact: 1 },
                { text: "Coal", impact: 15 },
                { text: "Natural Gas", impact: 8 }
            ]
        },
        {
            question: "You need to travel between cities. What do you choose?",
            options: [
                { text: "Electric Train", impact: 4 },
                { text: "Bus", impact: 6 },
                { text: "Flight", impact: 20 }
            ]
        }
    ];

    const handleChoice = (impact) => {
        setScore(score - impact);
        if (stage < stages.length - 1) {
            setStage(stage + 1);
        } else {
            alert(`Journey Completed! Your Score: ${score} (Higher is better!)`);
            setScore(100); 
            setStage(0);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
            <div style={{ width: '80%', padding: '1rem', border: '1px solid #00FFFF', borderRadius: '8px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{stages[stage].question}</h2>
                {stages[stage].options.map((option, index) => (
                    <button
                        key={index}
                        style={{ marginBottom: '0.5rem', padding: '0.5rem 1rem', border: '1px solid #00FFFF', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'transparent', color: '#00FFFF' }}
                        onClick={() => handleChoice(option.impact)}
                    >
                        {option.text}
                    </button>
                ))}
                <p style={{ marginTop: '1rem', textAlign: 'right' }}>Current Score: {score}</p>
            </div>
        </div>
    );
};

export default CarbonFreeJourney;
