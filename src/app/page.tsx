import MusicPlayer from '@/components/app/MusicPlayer';
import NavBar from '@/components/app/NavBar';
import Bg from "@/assets/bg-01.jpg";
import {AudioQueueProvider} from '@/components/providers/AudioQueueContext';

export default function Home() {
  return (
    <div
      className="w-full h-full flex flex-col lg:flex-row bg-cover bg-center"
      style={{
        backgroundImage: `url(${Bg.src})`,
      }}
    >
      <NavBar/>

      <AudioQueueProvider>
        <MusicPlayer/>
      </AudioQueueProvider>
      <div className={'flex-1 flex flex-col'}>
      </div>
    </div>
  );
}
