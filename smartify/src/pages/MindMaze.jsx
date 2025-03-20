import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MindMaze = () => {
    const [gridSize, setGridSize] = useState(4);
    const [grid, setGrid] = useState([]);
    const [revealed, setRevealed] = useState({});
    const [matched, setMatched] = useState({});
    const [firstChoice, setFirstChoice] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [bestScore, setBestScore] = useState(() => {
        const savedScore = localStorage.getItem('bestScore');
        return savedScore ? parseFloat(savedScore) : null;
    });

    useEffect(() => {
        generateGrid();
    }, [gridSize]);

    const generateGrid = () => {
        const totalCells = gridSize * gridSize;
        const numbers = Array.from({ length: totalCells / 2 }, (_, i) => i + 1);
        const doubledNumbers = [...numbers, ...numbers];
        const shuffled = doubledNumbers.sort(() => Math.random() - 0.5);
        setGrid(shuffled);
        setRevealed({});
        setMatched({});
        setFirstChoice(null);
        setStartTime(Date.now());
        setEndTime(null);
    };

    const handleClick = (index) => {
        if (revealed[index] || matched[index] || endTime) return;

        setRevealed((prev) => ({ ...prev, [index]: true }));

        if (firstChoice === null) {
            setFirstChoice(index);
        } else {
            const firstValue = grid[firstChoice];
            const secondValue = grid[index];

            if (firstValue === secondValue) {
                setMatched((prev) => ({ ...prev, [firstChoice]: true, [index]: true }));

                if (Object.keys(matched).length + 2 === grid.length) {
                    const finishTime = Date.now();
                    setEndTime(finishTime);
                    const newTimeTaken = ((finishTime - startTime) / 1000).toFixed(2);

                    if (!bestScore || newTimeTaken < bestScore) {
                        setBestScore(newTimeTaken);
                        localStorage.setItem('bestScore', newTimeTaken);
                    }
                }
            }

            setTimeout(() => {
                setRevealed({});
                setFirstChoice(null);
            }, 1500);
        }
    };

    const playAgain = () => {
        generateGrid();
    };

    const timeTaken = endTime ? ((endTime - startTime) / 1000).toFixed(2) : null;

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-b from-blue-900 to-black min-h-screen">
            <label className="text-cyan-200 mb-4 text-xl font-semibold">Choose Grid Size:
                <select value={gridSize} onChange={(e) => setGridSize(Number(e.target.value))} className="ml-2 p-1 border border-gray-300 rounded">
                    {[2, 4, 6].map(size => (
                        <option key={size} value={size}>{size}x{size}</option>
                    ))}
                </select>
            </label>

            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${gridSize}, 80px)` }}>
                {grid.map((value, index) => (
                    <motion.div
                        key={index}
                        onClick={() => handleClick(index)}
                        whileTap={{ scale: 0.9 }}
                        className={`w-20 h-20 flex items-center justify-center text-2xl cursor-pointer rounded-lg shadow-lg transition-all duration-300 
                        ${matched[index] ? 'bg-green-500' : 'bg-blue-500 text-white'}`}
                    >
                        {revealed[index] || matched[index] ? value : ''}
                    </motion.div>
                ))}
            </div>

            {timeTaken && (
                <div className="text-center mt-6 text-white">
                    <motion.h3 className="text-2xl font-bold"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}>
                        {bestScore && timeTaken < bestScore ? '🎉 Yay! New High Score!' : '🎉 Congratulations!'}
                    </motion.h3>
                    <p className="text-lg mt-2">You completed the game in {timeTaken} seconds.</p>
                    {bestScore && <p className="text-lg">Best score: {bestScore} seconds</p>}
                    <button 
                        onClick={playAgain} 
                        className="mt-4 py-2 px-6 border border-cyan-300 rounded-full text-cyan-300 hover:bg-cyan-700 hover:text-white transition"
                    >
                        Wanna beat your score? Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default MindMaze;
