'use client';
import React, {createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode} from 'react';

interface Track {
  url: string;
  image: string;
  duration: number;
  title: string;
  artist: string;
}

interface AudioQueueContextProps {
  queue: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  skipForward: () => void;
  skipBackward: () => void;
  setQueue: (queue: Track[]) => void;
}

const AudioQueueContext = createContext<AudioQueueContextProps | undefined>(undefined);

export const AudioQueueProvider = ({ children }: {children: ReactNode}) => {
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false); // Flag to track user interaction

  const loadTrack = useCallback(() => {
    if (queue.length > 0 && queue[currentTrackIndex]) {
      if (audioRef.current) {
        audioRef.current.src = queue[currentTrackIndex].url;
        audioRef.current.volume = .1;
        audioRef.current.load();
      }
    }
  }, [currentTrackIndex, queue]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      });

      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      });

      audioRef.current.addEventListener('ended', () => {
        skipForward();
      });

      audioRef.current.addEventListener('playing', () => {
        setIsPlaying(true);
      });

      audioRef.current.addEventListener('pause', () => {
        setIsPlaying(false);
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }

    loadTrack();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [loadTrack]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log('Error playing the audio:', error);
      });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const skipForward = () => {
    if (currentTrackIndex < queue.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setTimeout(() => {
        play();
      }, 100);
    }
  };

  const skipBackward = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setTimeout(() => {
        play();
      }, 100);
    }
  };

  // Add global click listener
  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        play();
        document.removeEventListener('click', handleFirstClick); // Remove the listener after the first click
      }
    };

    document.addEventListener('click', handleFirstClick);

    return () => {
      document.removeEventListener('click', handleFirstClick);
    };
  }, [play]);

  return (
    <AudioQueueContext.Provider
      value={{
        queue,
        currentTrackIndex,
        isPlaying,
        currentTime,
        duration,
        play,
        pause,
        seek,
        skipForward,
        skipBackward,
        setQueue,
      }}
    >
      {children}
      {/* Audio element used across the app */}
      <audio ref={audioRef} />
    </AudioQueueContext.Provider>
  );
};

export const useAudioQueue = (): AudioQueueContextProps => {
  const context = useContext(AudioQueueContext);
  if (!context) {
    throw new Error('useAudioQueue must be used within an AudioQueueProvider');
  }
  return context;
};
