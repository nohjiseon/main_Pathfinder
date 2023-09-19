import { useState, useEffect } from "react";
import styled from "styled-components";

const Rain = () => {
  const [drops, setDrops] = useState<
    Array<{
      left: string;
      bottom: string;
      animationDelay: string;
      animationDuration: string;
      stemAnimationDelay: string;
      stemAnimationDuration: string;
      splatAnimationDelay: string;
      splatAnimationDuration: string;
    }>
  >([]);

  useEffect(() => {
    const createDrops = () => {
      const newDrops = [];
      let increment = 7;

      while (increment < 85) {
        const randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
        const randoFiver = Math.floor(Math.random() * (4 - 2 + 1) + 5);
        increment += randoFiver;

        newDrops.push({
          left: `${increment}%`,
          bottom: `${randoFiver + randoFiver - 1 + 100}%`,
          animationDelay: `0.${randoHundo}s`,
          animationDuration: `0.7${randoHundo}s`,
          stemAnimationDelay: `0.${randoHundo}s`,
          stemAnimationDuration: `0.7${randoHundo}s`,
          splatAnimationDelay: `0.${randoHundo}s`,
          splatAnimationDuration: `0.7${randoHundo}s`,
        });
      }

      setDrops(newDrops);
    };

    createDrops();
  }, []);

  return (
    <RainBox>
      {drops.map((drop, index) => (
        <div
          key={index}
          className="drop"
          style={{
            left: drop.left,
            bottom: drop.bottom,
            animationDelay: drop.animationDelay,
            animationDuration: drop.animationDuration,
          }}
        >
          <div
            className="stem"
            style={{
              animationDelay: drop.stemAnimationDelay,
              animationDuration: drop.stemAnimationDuration,
            }}
          ></div>
          <div
            className="splat"
            style={{
              animationDelay: drop.splatAnimationDelay,
              animationDuration: drop.splatAnimationDuration,
            }}
          ></div>
        </div>
      ))}
    </RainBox>
  );
};
export default Rain;

const RainBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  .drop {
    position: absolute;
    bottom: 100%;
    width: 10px;
    height: 120px;
    pointer-events: none;
    animation: drop 0.5s linear infinite;
  }

  @keyframes drop {
    0% {
      transform: translateY(0vh);
    }
    75% {
      transform: translateY(90vh);
    }
    100% {
      transform: translateY(90vh);
    }
  }

  .stem {
    width: 2px;
    height: 60%;
    margin-left: 7px;
    background: linear-gradient(to bottom, rgba(65, 109, 201, 0), rgba(65, 109, 201, 0.25));
    animation: stem 0.5s linear infinite;
  }

  @keyframes stem {
    0% {
      opacity: 1;
    }
    65% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  .splat {
    width: 15px;
    height: 10px;
    border-top: 2px dotted rgba(65, 109, 201, 0.7);
    border-radius: 50%;
    opacity: 1;
    transform: scale(0);
    animation: splat 0.5s linear infinite;
    display: none;
  }

  .splat {
    display: block;
  }

  @keyframes splat {
    0% {
      opacity: 1;
      transform: scale(0);
    }
    80% {
      opacity: 1;
      transform: scale(0);
    }
    90% {
      opacity: 0.5;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.5);
    }
  }
`;
