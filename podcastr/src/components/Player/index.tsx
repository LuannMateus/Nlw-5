import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import styles from "./styles.module.scss";

type Props = {};
export const Player = (_props: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState,
  } = useContext(PlayerContext);

  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Playing now" />
        <strong>Playing now {episode?.title}</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Select a podcast to listen</strong>
        </div>
      )}

      {episode && (
        <audio
          src={episode.url}
          autoPlay
          ref={audioRef}
          onPlay={() => setPlayingState(true)}
          onPause={() => setPlayingState(false)}
        />
      )}

      <footer className={!episode ? styles.empty : ""}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04d361" }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>
        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Shuffle" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Play Previous" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Pause" />
            ) : (
              <img src="/play.svg" alt="Play" />
            )}
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Play Next" />
          </button>{" "}
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repeat" />
          </button>
        </div>
      </footer>
    </div>
  );
};
