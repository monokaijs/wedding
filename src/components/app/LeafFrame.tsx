import LeafFrameOuter from "@/assets/leaf-frame-01.png";
import {cn} from '@/utils';
import Trang01 from '@/assets/photos/trang-01.png';

interface LeafFrameProps {
  className?: string;
}

export default function LeafFrame({className}: LeafFrameProps) {
  return <div
    className={cn(
      'bg-cover bg-center aspect-square flex relative',
      className,
    )}
  >
    <div
      className={'w-2/3 aspect-square rounded-full bg-cover bg-center m-auto z-0'}
      style={{
        backgroundImage: `url(${Trang01.src})`
      }}
    />
    <img
      src={LeafFrameOuter.src}
      className={'w-full h-full absolute left-0 right-0 top-0 bottom-0 z-10'}
      alt={'frame'}
    />
  </div>
}
