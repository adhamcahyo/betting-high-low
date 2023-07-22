import React, { useState, useEffect } from 'react';
import { FaPlane } from 'react-icons/fa';
import './Game.css';

const Game = ({ initialBalance }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [currentIcon, setCurrentIcon] = useState('');
  const [betAmount, setBetAmount] = useState(0);
  const [balance, setBalance] = useState(initialBalance);
  const [message, setMessage] = useState('');
  const [isFlying, setIsFlying] = useState(false);

  const ICONS = ['🛩️', '✈️'];

  useEffect(() => {
    setCurrentIcon(getRandomIcon());
  }, []);

  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * ICONS.length);
    return ICONS[randomIndex];
  };

  const startGame = () => {
    if (balance >= betAmount) {
      setIsFlying(true);
      setTimeout(() => {
        setIsFlying(false);
        const newValue = Math.floor(Math.random() * 100) + 1;
        setCurrentValue(newValue);
        setCurrentIcon(getRandomIcon());
        setMessage('');
      }, 2000);
    } else {
      setMessage('Insufficient balance to place the bet.');
    }
  };

  const handleBetAmountChange = (event) => {
    setBetAmount(Number(event.target.value));
  };

  const guessHighOrLow = (guess) => {
    if (betAmount > 0) {
      const isHigh = currentValue > 50;
      const isCorrect = (isHigh && guess === 'high') || (!isHigh && guess === 'low');

      const winAmount = betAmount * 2;
      const newBalance = isCorrect ? balance + winAmount : balance - betAmount;

      setBalance(newBalance);
      setMessage(isCorrect ? `You Win! ${currentIcon}` : `You Lose! ${currentIcon}`);
    } else {
      setMessage('Please place a bet before guessing.');
    }
  };

  return (
    <div className="game-container">
      <h1>High or Low Game</h1>
      <p>Current Value: {currentValue}</p>
      <p className={`game-icon ${isFlying ? 'flying' : ''}`}>
        <FaPlane />
      </p>
      <p>Balance: Rp {balance.toLocaleString()}</p>
      <input type="number" value={betAmount} onChange={handleBetAmountChange} min="100.000" />
      <button onClick={startGame}>Start Game</button>
      <button onClick={() => guessHighOrLow('high')}>High</button>
      <button onClick={() => guessHighOrLow('low')}>Low</button>
      <p>{message}</p>
    </div>
  );
};

export default Game;
