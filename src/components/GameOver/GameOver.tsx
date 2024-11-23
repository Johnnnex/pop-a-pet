/* eslint-disable @next/next/no-img-element */
import { spaceGrotesk } from "@/app/page";
import React from "react";

const GameOver = ({
  time,
  highScore,
  score,
  handleStart,
}: {
  time: number;
  highScore: number;
  score: number;
  handleStart: () => void;
}) => {
  return (
    <main
      className={`text-center ${spaceGrotesk.className} flex flex-col bg-[url(/soil.png)] min-h-screen justify-center gap-[1rem] bg-cover bg-center`}
    >
      <figure className="w-fit mx-auto relative">
        <img
          src="/confetti.gif"
          alt=""
          className="w-fit absolute top-0 left-0"
        />
        <img
          src="/confetti.gif"
          alt=""
          className="w-fit absolute top-0 right-0"
        />
        <img src="/game-over.svg" alt="" />
      </figure>
      {[
        { name: "Your Score", value: score || 0 },
        { name: "High Score", value: highScore || 0 },
      ].map(({ name, value }, index) => (
        <div key={`metric__${name}__${index}`}>
          <p className="text-[1.25rem] font-[500] text-white">{name}</p>
          <p className="text-[4rem] font-[700] text-[#FBFF02]">{value}</p>
        </div>
      ))}
      <p className="text-[.875rem] font-[500] text-white">
        Your Time: {time} seconds
      </p>
      <button
        onClick={handleStart}
        className="bg-[#2262FF] hover:bg-blue-700 text-white font-bold py-4 px-6 w-[80%] mx-auto max-w-[21.4375rem] rounded-[.5rem]"
      >
        Restart
      </button>
    </main>
  );
};

export default GameOver;
