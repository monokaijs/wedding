'use client';
import Icons from '@/components/ui/icons';
import LeafFrame from '@/components/app/LeafFrame';
import {useEffect} from 'react';
import {useAudioQueue} from '@/components/providers/AudioQueueContext';
import {formatTime} from '@/utils';
import PinkFrog from '@/assets/pink-frog.png';

export default function MusicPlayer() {
  const {queue, setQueue, play, pause, isPlaying, duration, currentTime, currentTrackIndex, skipBackward, skipForward} = useAudioQueue();

  useEffect(() => {
    setQueue([{
      title: 'Sớm Trưa',
      url: '/assets/audio/Som_Trua.mp3',
      image: '',
      artist: 'Pink Frog',
      duration: 127,
    }, {
      title: 'Người Ơi',
      url: '/assets/audio/Nguoi_Oi.mp3',
      image: '',
      artist: 'Pink Frog',
      duration: 268,
    }]);
    play();
  }, []);

  return <div className={'flex flex-col px-8'}>
    <div>
      <LeafFrame
        className={'w-[80vw] md:w-[500px] lg:w-[400px] mx-auto'}
      />
    </div>
    <div className={'hidden lg:flex flex-col items-center gap-1'}>
      <div className={'font-semibold'}>
        {queue[currentTrackIndex] && <>
          {queue[currentTrackIndex]?.title} - {queue[currentTrackIndex]?.artist}
        </>}
      </div>
      <div className={'px-12 w-full flex flex-row items-center'}>
        <div className={'w-14 text-center'}>{formatTime(currentTime)}</div>
        <div className={'h-[4px] bg-autumn4 flex-1'}>
          <div
            className={'h-full bg-autumn2'}
            style={{
              width: `${currentTime/duration * 100}%`
            }}
          />
        </div>
        <div className={'w-14 text-center'}>{formatTime(duration)}</div>
      </div>
      <div className={'flex flex-row items-center gap-2'}>
        <div className={'cursor-pointer p-2'} onClick={() => skipBackward()}>
          <Icons.NextFilled className={'fill-text w-4 h-4 mx-auto rotate-180 hover:fill-primary0'}/>
        </div>
        <div className={'cursor-pointer p-2'} onClick={() => isPlaying ? pause() : play()}>
          {isPlaying ? (
            <Icons.PauseFilled className={'fill-text w-5 h-5 mx-auto hover:fill-primary0'}/>
          ): (
            <Icons.PlayFilled className={'fill-text w-5 h-5 mx-auto hover:fill-primary0'}/>
          )}
        </div>
        <div className={'cursor-pointer p-2'} onClick={() => skipForward()}>
          <Icons.NextFilled className={'fill-text w-4 h-4 mx-auto hover:fill-primary0'}/>
        </div>
      </div>
    </div>
    <div className={'fixed lg:hidden left-0 right-0 bottom-0 bg-text flex flex-col pb-safe'}>
      <div className={'h-[4px] bg-autumn4'}>
        <div
          className={'h-full bg-autumn2'}
          style={{
            width: `${currentTime / duration * 100}%`
          }}
        />
      </div>
      <div className={'flex flex-row p-2 gap-2'}>
        <div
          className={'w-10 h-10 bg-cover bg-center rounded-lg'}
          style={{
            backgroundImage: `url(${PinkFrog.src})`
          }}
        />
        <div className={'flex-1 flex flex-row justify-between'}>
          <div className={'flex flex-col text-autumn4'}>
            <div className={'font-semibold text-sm'}>
              {queue[currentTrackIndex]?.title}
            </div>
            <div className={'text-xs line-clamp-1'}>
              {queue[currentTrackIndex]?.artist}

              <span className={'pl-4'}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
          <div className={'flex flex-row items-center gap-2'}>
            <div className={'cursor-pointer p-2'} onClick={() => skipBackward()}>
              <Icons.NextFilled className={'fill-autumn1 w-4 h-4 mx-auto rotate-180 hover:fill-primary0'}/>
            </div>
            <div className={'cursor-pointer p-2'} onClick={() => isPlaying ? pause() : play()}>
              {isPlaying ? (
                <Icons.PauseFilled className={'fill-autumn1 w-5 h-5 mx-auto hover:fill-primary0'}/>
              ) : (
                <Icons.PlayFilled className={'fill-autumn1 w-5 h-5 mx-auto hover:fill-primary0'}/>
              )}
            </div>
            <div className={'cursor-pointer p-2'} onClick={() => skipForward()}>
              <Icons.NextFilled className={'fill-autumn1 w-4 h-4 mx-auto hover:fill-primary0'}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
