import Icons from '@/components/ui/icons';

export default function NavBar() {
  return <div className={'bg-text w-16 text-autumn2 gap-10 hidden lg:flex flex-col justify-center items-center'}>
    <div className={'cursor-pointer'}>
      <Icons.HeartFilled className={'w-6 h-6 fill-primary5 hover:fill-primary0'}/>
    </div>
    <div className={'cursor-pointer'}>
      <Icons.ImageFilled className={'w-6 h-6 fill-primary5 hover:fill-primary0'}/>
    </div>
    <div className={'cursor-pointer'}>
      <Icons.LocationFilled className={'w-6 h-6 fill-primary5 hover:fill-primary0'}/>
    </div>
  </div>
}
