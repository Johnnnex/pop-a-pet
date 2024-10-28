"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";

const Home = () => {
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

  const getRandomPosition = () => Math.floor(Math.random() * 9);

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
    } else if (index === plantPosition) {
      setGameOver(true);
      alert(`GAME OVER! Your score is: ${score}`);
    }
  };

  return (
    <div className="text-center bg-[url(/mario-bg.jpg)] h-screen">
      <h1 className="text-2xl font-bold mb-4">Pop A Pet</h1>
      <h2 className="text-xl font-semibold mb-4">{score}</h2>
      <div
        className="md:w-[60%] md:h-[60%] p-16 mx-auto justify-between flex gap-[20%] flex-wrap bg-cover rounded-xl border-4 border-white"
        style={{ backgroundImage: 'url("/soil.png")' }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              boardRef.current[index] = el;
            }}
            className="max-w-24 basis-[25%] h-24 bg-cover relative cursor-pointer"
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
