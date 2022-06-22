import React from 'react'
import Locationbutton from './Locationbtn'

export default function Location(props) {
  const location = [{place:'Amritsar',id:'WQ101',locurl:'/amritsar'},{place:'Rupnagar',id:'WQ102',locurl:'/rupnagar'},{place:'Ludhiana',id:'WQ103',locurl:'/rupnagar'},{place:'Patiala',id:'WQ104',locurl:'/rupnagar'},{place:'Mohali',id:'WQ105',locurl:'/rupnagar'},{place:'Jalandhar',id:'WQ106',locurl:'/rupnagar'}]

  return (
    
      <div className='wrapper container'>
        {location.map((loc)=>{return(<div className='box justify-content-center' key={loc.id}><Locationbutton mode={props.mode} location={loc.place} code={loc.id} locUrl={loc.locurl}/></div>)})}
      
      </div>
  )
}
