"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import { Space_Grotesk } from "next/font/google";
import GameOver from "@/components/GameOver";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

const Home = () => {
  const numberOfPots = 9;
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [molePosition, setMolePosition] = useState<number | null>(null);
  const [plantPosition, setPlantPosition] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [highScore, setHighScore] = useState<number | null>(null);
  const boardRef = useRef<(HTMLDivElement | null)[]>([]);
  const [difficulty, setDifficulty] = useState<{
    name: string | null;
    moleTime: number | null;
    plantTime: number | null;
  }>({
    name: "Easy",
    moleTime: 1000,
    plantTime: 2000,
  });

  const objectsRef = useRef<{ mole: number | null; plant: number | null }>({
    mole: null,
    plant: null,
  });

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moleInterval = setInterval(() => {
      setMole();
    }, difficulty.moleTime as number);

    const plantInterval = setInterval(() => {
      setPlant();
    }, difficulty.plantTime as number);

    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 29) {
          handleEnd();
          return 30;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(moleInterval);
      clearInterval(plantInterval);
      clearInterval(timerInterval);
    };
  }, [gameStarted, gameOver, difficulty]);

  useEffect(() => {}, [timer]);

  const getRandomPosition = () => Math.floor(Math.random() * numberOfPots);

  const setMole = () => {
    let randomPosition = getRandomPosition();
    if (randomPosition === objectsRef.current.plant) {
      randomPosition = getRandomPosition();
    }
    setMolePosition(randomPosition);
    objectsRef.current.mole = randomPosition;
  };

  const setPlant = () => {
    let randomPosition = getRandomPosition();
    if (randomPosition === objectsRef.current.mole) {
      randomPosition = getRandomPosition();
    }
    setPlantPosition(randomPosition);
    objectsRef.current.plant = randomPosition;
  };

  const handleTileClick = (index: number) => {
    if (!gameStarted || gameOver) return;

    if (index === molePosition) {
      setScore(score + 10);
      setMolePosition(null); // Immediately set mole position to null after click
    } else if (index === plantPosition) {
      handleEnd();
    }
  };

  const handleEnd = () => {
    setGameOver(true);
    setGameStarted(false);
    if (score > (highScore || 0)) {
      setHighScore(score);
    }
    setPlantPosition(null);
  };

  const handleStart = () => {
    setScore(0);
    setTimer(0);
    setGameOver(false);
    setGameStarted(true);
  };

  if (gameOver)
    return (
      <GameOver
        handleStart={handleStart}
        time={timer}
        highScore={highScore as number}
        score={score}
      />
    );
  return (
    <main
      className={`text-center ${spaceGrotesk.className} bg-[url(/soil.png)] min-h-screen pb-[2rem] bg-cover bg-center`}
    >
      <img src="/logo.svg" className="w-fit mx-auto" alt="" />
      <section className="flex justify-between items-start md:items-center mt-[1rem] md:mt-0 w-[90%] mx-auto">
        <div className="flex flex-col items-start md:gap-[.75rem]">
          <h2 className="text-[2rem] text-yellow-300 font-[700]">
            Your Score: {score}
          </h2>
          {highScore !== null && (
            <h2 className="text-xl text-white font-medium">
              High Score: {highScore}
            </h2>
          )}
          <h2 className="text-[1rem] italic text-white font-medium">
            Time: {timer}s
          </h2>
        </div>
        {!gameStarted && (
          <button
            onClick={handleStart}
            className="bg-[#2262FF] hidden md:block hover:bg-blue-700 text-black font-bold py-4 px-6 h-fit mx-auto min-w-[10.25rem] rounded-[.5rem]"
          >
            {gameOver ? "Replay" : "Start"}
          </button>
        )}
        <div className="md:gap-[1rem] gap-[.5rem] flex flex-col items-end">
          <p className="text-xl text-white font-medium">Level</p>
          <div className="flex md:flex-row flex-col gap-[.25rem] md:gap-[1rem]">
            {[
              { name: "Easy", moleTime: 2000, plantTime: 3000 },
              { name: "Medium", moleTime: 1000, plantTime: 2000 },
              { name: "Hard", moleTime: 500, plantTime: 1000 },
            ].map(({ name, moleTime, plantTime }, index) => (
              <button
                onClick={() => {
                  setDifficulty({ name, plantTime, moleTime });
                }}
                className="w-fit ml-auto"
                key={`button__${index}`}
              >
                <p
                  className={`text-xl transition-all duration-[.4s] ${
                    difficulty.name === name ? "text-[#FBFF02]" : "text-white"
                  } font-medium`}
                >
                  {name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
      <div className="flex flex-wrap gap-x-[2rem] md:gap-x-[4rem] w-[100%] md:w-[70%] xl:w-[50%] justify-between mx-auto">
        {Array.from({ length: numberOfPots }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              boardRef.current[index] = el;
            }}
            className="aspect-square basis-[25%] relative cursor-pointer"
            onClick={() => handleTileClick(index)}
          >
            {/* Plant or Mole */}
            {molePosition === index && (
              <img
                src="/monty-mole.png"
                alt=""
                className="w-[60%] h-[60%] absolute inset-0 m-auto pointer-events-none z-[1]"
                style={{
                  animation: "popUp 0.5s ease forwards",
                }}
              />
            )}
            {plantPosition === index && (
              <img
                src="/plant.png"
                alt=""
                className="w-[60%] h-[60%] absolute inset-0 m-auto pointer-events-none z-[1]"
                style={{
                  animation: "popUp 0.5s ease forwards",
                }}
              />
            )}

            {/* Pipe Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-no-repeat pointer-events-none"
              style={{ backgroundImage: 'url("/pipe.png")' }}
            />
          </div>
        ))}
      </div>
      {!gameStarted && (
        <button
          onClick={handleStart}
          className="bg-[#2262FF] md:hidden hover:bg-blue-700 text-white font-bold py-2 mt-[2rem] px-4 w-[90%] mx-auto max-w-[21.4375rem] rounded-[.5rem]"
        >
          Start
        </button>
      )}
    </main>
  );
};

export default Home;
