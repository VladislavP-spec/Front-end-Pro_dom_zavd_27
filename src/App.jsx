// App.js
import React, { useState, useEffect } from 'react';
import Emoji from './components/Emoji.jsx';
import ButtonTemplate from './components/ButtonTemplate.jsx';

const App = () => {
    const [votes, setVotes] = useState(() => JSON.parse(localStorage.getItem('votes')) || Array(5).fill(0));
    const [showResults, setShowResults] = useState(false);
    const [winnerIndex, setWinnerIndex] = useState(null);

    useEffect(() => {
        if (showResults) {
            calculateWinner();
        }
        localStorage.setItem('votes', JSON.stringify(votes));
    }, [showResults, votes]);

    const vote = (index) => {
        setVotes((prevVotes) => {
            const newVotes = [...prevVotes];
            newVotes[index]++;
            return newVotes;
        });
    };

    const showResultsHandler = () => {
        setShowResults(true);
    };

    const clearResults = () => {
        localStorage.removeItem('votes');
        setVotes(Array(5).fill(0));
        setShowResults(false);
        setWinnerIndex(null);
    };

    const calculateWinner = () => {
        const maxVotesIndex = votes.indexOf(Math.max(...votes));
        setWinnerIndex(maxVotesIndex);
    };

    const totalVotes = votes.reduce((sum, count) => sum + count, 0);
    const isResultsButtonVisible = totalVotes > 0;

    return (
        <div>
            <h1>Голосування за смайли</h1>
            <div id="emoji-list">
                {votes.map((_, index) => (
                    <Emoji
                        key={index}
                        index={index}
                        vote={vote}
                        votes={votes}
                        showResults={showResults}
                    />
                ))}
            </div>
            <ButtonTemplate
                buttonText="Показати результати"
                onClick={showResultsHandler}
                disabled={!isResultsButtonVisible}
            />
            <ButtonTemplate
                buttonText="Очистити результати"
                onClick={clearResults}
            />
            {showResults && (
                <>
                    <h2>Результати голосування:</h2>
                    <h3>Переможець:</h3>
                    {winnerIndex !== null && (
                        <>
                            <img
                                className="emoji"
                                src={`./src/images/${winnerIndex + 1}.jpg`}
                                alt={`emoji${winnerIndex + 1}`}
                            />
                            <p>Голосів: {votes[winnerIndex]}</p>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default App;