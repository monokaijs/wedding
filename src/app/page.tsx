import MusicPlayer from '@/components/app/MusicPlayer';
import NavBar from '@/components/app/NavBar';
import Bg from "@/assets/bg-01.jpg";
import {AudioQueueProvider} from '@/components/providers/AudioQueueContext';
import {cn} from '@/utils';

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
      <div className={'flex-1 flex-col'}>
        <div className={cn(
          'flex-1 flex flex-col font-moncheri w-[300px] lg:w-[600px] uppercase mx-auto lg:py-8',
          'text-3xl sm:text-4xl lg:text-[72px]',
          'leading-[48px] sm:leading-[60px] lg:leading-[100px]'
        )}>
          <div className={'self-center lg:self-start'}>
            Anh Nhân
          </div>
          <div className={'self-center lg:self-end'}>
            Hà Trang
          </div>
        </div>
        <div className={'text-center'}>
          Oct. 12th, 2024
        </div>
      </div>
    </div>
  );
}
