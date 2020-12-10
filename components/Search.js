import { useRef} from 'react';

export default function Search({submbitEvent}){
  let inputref = useRef();
  return (
    <div className='h-72px w-545px border-2 flex justify-between p-2 rounded-md font-karla hover:border-portal1'>
      <input type='text' placeholder='Search for dataset by keyword..' size='50' className='focus:outline-none' ref={inputref}/>
      <button className='focus:outline-none' onClick={()=> { submbitEvent(inputref.current.value)}}><img src="/search2.svg" /></button>
    </div>
  );
}