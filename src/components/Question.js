import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    // Create timeout that runs every second
    const timerId = setTimeout(() => {
      if (timeRemaining > 1) {
        // If time is still remaining, decrement by 1
        setTimeRemaining(timeRemaining - 1);
      } else {
        // When timer hits 0
        setTimeRemaining(10); // Reset timer for next question
        onAnswered(false); // Call onAnswered with false - time ran out
      }
    }, 1000);

    // Cleanup function to prevent memory leaks
    return () => {
      clearTimeout(timerId);
    };
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
