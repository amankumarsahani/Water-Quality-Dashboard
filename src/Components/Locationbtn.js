import React from 'react'
import { Link } from 'react-router-dom';

export default function Locationbutton(props) {
    const {mode,location,code}=props;    //!props Destructuring

  return(
      <Link to={props.locUrl} data-theme={mode}>
          <button className='button_box' >
                <div>
                <img src='https://cdn-icons-png.flaticon.com/512/6790/6790307.png' height='80rem' width='70rem' alt='water detection' style={{paddingTop:'1rem'}}/>
                    <h2>{code}</h2>
                    <p>Location : {location}</p>
              </div>
          </button>
      </Link>
  )
}
