import React, { useState } from "react";
import "./BuckshotRoulette.css";

const BuckshotRoulette = ({ onGameEnd, showModal }) => {
  const [fullBullets, setFullBullets] = useState(0);
  const [blankBullets, setBlankBullets] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [remainingFull, setRemainingFull] = useState(0);
  const [remainingBlank, setRemainingBlank] = useState(0);
  const [guess, setGuess] = useState("");
  const [clickCount, setClickCount] = useState(0);

  const calculateProbability = () => {
    const totalRemaining = remainingFull + remainingBlank;
    return totalRemaining > 0
      ? ((remainingFull / totalRemaining) * 100).toFixed(2)
      : 0;
  };

  const startGame = () => {
    if (fullBullets + blankBullets === 0) {
      showModal("You must enter at least one shell (live or blank)!");
      return;
    }
    if (fullBullets + blankBullets > 8) {
      showModal("The total number of live and blank shells cannot exceed 8!");
      return;
    }
    setRemainingFull(fullBullets);
    setRemainingBlank(blankBullets);
    setClickCount(0);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setFullBullets(0);
    setBlankBullets(0);
    setRemainingFull(0);
    setRemainingBlank(0);
    setGuess("");
    setClickCount(0);
  };

  const endRound = () => {
    if (!guess) {
      showModal("Please select a shell type!");
      return;
    }

    if (guess === "full" && remainingFull > 0) {
      setRemainingFull(remainingFull - 1);
    } else if (guess === "blank" && remainingBlank > 0) {
      setRemainingBlank(remainingBlank - 1);
    } else {
      showModal("No remaining shells of that type!");
      return;
    }

    setClickCount(clickCount + 1);

    if (clickCount + 1 >= fullBullets + blankBullets) {
      showModal("Round Finished! Better luck next time!");
      onGameEnd();
      resetGame();
    }

    setGuess("");
  };

  const renderBullets = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <span key={index} className="bullet-bar">
        |
      </span>
    ));
  };

  const handleBack = () => {
    resetGame();
  };

  return (
    <div className="container">
      {!gameStarted ? (
        <div className="setup">
          <label>Number of Live Shells:</label>
          <div className="number-input">
            <button
              onClick={() => setFullBullets(Math.max(0, fullBullets - 1))}
              className="number-button"
            >
              -
            </button>
            <input
              type="text"
              value={fullBullets}
              readOnly
              className="input-field"
            />
            <button
              onClick={() => setFullBullets(Math.min(8, fullBullets + 1))}
              className="number-button"
            >
              +
            </button>
          </div>

          <label>Number of Blank Shells:</label>
          <div className="number-input">
            <button
              onClick={() => setBlankBullets(Math.max(0, blankBullets - 1))}
              className="number-button"
            >
              -
            </button>
            <input
              type="text"
              value={blankBullets}
              readOnly
              className="input-field"
            />
            <button
              onClick={() => setBlankBullets(Math.min(8, blankBullets + 1))}
              className="number-button"
            >
              +
            </button>
          </div>

          <button onClick={startGame} className="start-button">
            Start Game
          </button>
        </div>
      ) : (
        <div className="game">
          <button onClick={handleBack} className="back-button">
            {"<- Back"}
          </button>
          <div className="bullet-display">
            <div className="full-bullets">
              <strong>Live:</strong>
              <div>{renderBullets(remainingFull)}</div>
            </div>
            <div className="blank-bullets">
              <strong>Blank:</strong>
              <div>{renderBullets(remainingBlank)}</div>
            </div>
          </div>

          <div className="guess-section">
            <strong>Select Shell Type:</strong>
            <div>
              <label>
                <input
                  type="radio"
                  name="guess"
                  value="full"
                  onChange={(e) => setGuess(e.target.value)}
                  checked={guess === "full"}
                />
                <span className="custom-radio"></span>
                Live
              </label>

              <label>
                <input
                  type="radio"
                  name="guess"
                  value="blank"
                  onChange={(e) => setGuess(e.target.value)}
                  checked={guess === "blank"}
                />
                <span className="custom-radio"></span>
                Blank
              </label>
            </div>
          </div>

          <div className="probability">
            <strong>Probability of Live Shell:</strong> {calculateProbability()}
            %
          </div>

          <button onClick={endRound} className="action-button">
            Confirm Choice
          </button>
        </div>
      )}
    </div>
  );
};

export default BuckshotRoulette;
