import { useAppContext } from '@/context/Context';
import { Button } from 'flowbite-react';
import React from 'react'

const OnlineTeamName = (props:{name:string;members:string[]}) => {

  const { userData, setUserData } = useAppContext();

  
  return (


    <div className=' justify-between whitespace-nowrap items-center space-y-5 w-[350px] text-center'>
      <h1 className='underline text-dblue font-Roboto text-4xl text-center'>{props.name}</h1>
      {
        props.members.map((member,idx) => {
          return(
            <h1 key={idx} className=' text-dblue font-Roboto text-4xl text-center'>{member}</h1>
          )
        })
      }
    </div>







        // Team Names
    //  <div className="container">
    //   <div className="row">
    //     <div className="col-12">

    //     <h1 className='underline text-dblue font-Roboto text-4xl'>Team Cave</h1>

    //     </div>
    //     <div className="col-12">

    //     <h1 className='underline text-dblue font-Roboto text-4xl'></h1>


    //     </div>
    //   </div>
    //  </div>

/* <div className=' pt-5'>
<div className='flex flex-row '>
<h1 className='underline text-dblue font-Roboto text-4xl'>Team Cave</h1>
</div>
</div> */

  )
}

export default OnlineTeamName

