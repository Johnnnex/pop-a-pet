"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

const Home = () => {
  const numberOfPots = 9;
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [molePosition, setMolePosition] = useState<number | null>(null);
  const [plantPosition, setPlantPosition] = useState<number | null>(null);
  const boardRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (gameOver) return;

    const moleInterval = setInterval(() => {
      setMole();
    }, 1000);

    const plantInterval = setInterval(() => {
      setPlant();
    }, 2000);

    return () => {
      clearInterval(moleInterval);
      clearInterval(plantInterval);
    };
  }, [gameOver]);

  const getRandomPosition = () => Math.floor(Math.random() * numberOfPots);

  const setMole = () => {
    const randomPosition = getRandomPosition();
    if (randomPosition !== plantPosition) {
      setMolePosition(randomPosition);
    }
  };

  const setPlant = () => {
    const randomPosition = getRandomPosition();
    if (randomPosition !== molePosition) {
      setPlantPosition(randomPosition);
    }
  };

  const handleTileClick = (index: number) => {
    if (gameOver) return;

    if (index === molePosition) {
      setScore(score + 10);
      setMolePosition(null); // Immediately set mole position to null after click
    } else if (index === plantPosition) {
      setGameOver(true);
      alert(`GAME OVER! Your score is: ${score}`);
      setPlantPosition(null); // Immediately set plant position to null after click
    }
  };

  const handleReplay = () => {
    setScore(0);
    setGameOver(false);
  };

  return (
    <div
      className={`text-center ${spaceGrotesk.className} bg-[url(/soil.png)] h-screen bg-cover bg-center overflow-hidden`}
    >
      <h1 className="text-3xl text-white font-bold mb-6">Pop A Pet</h1>
      <h2 className="text-2xl text-white font-semibold mb-6">
        Your Score: {score}
      </h2>
      {gameOver && (
        <button
          onClick={handleReplay}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Replay
        </button>
      )}
      <div className="flex flex-wrap gap-[2rem] md:gap-[4rem] w-[100%] md:w-[70%] xl:w-[30%] justify-between mt-[5rem] border mx-auto">
        {Array.from({ length: numberOfPots }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              boardRef.current[index] = el;
            }}
            className="w-24 h-24 bg-cover relative cursor-pointer"
            style={{ backgroundImage: 'url("/pipe.png")' }}
            onClick={() => handleTileClick(index)}
          >
            {molePosition === index && (
              <img
                src="/monty-mole.png"
                alt="Mole"
                className="w-16 h-16 absolute inset-0 m-auto pointer-events-none"
              />
            )}
            {plantPosition === index && (
              <img
                src="/piranha-plant.png"
                alt="Plant"
                className="w-16 h-16 absolute inset-0 m-auto pointer-events-none"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
