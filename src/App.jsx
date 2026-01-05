import { useState } from 'react'
import './App.css'

const initialMembers = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    points: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    points: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    points: 0,
  },
];

function App() {
  return (
    <>
     <div>
         <h1 className='font-bold text-3xl'>Classroom Group Project Contribution Tracker</h1>
       
        <div>
           <div>
            <GroupMembers/>
           </div>
           <div></div>

        </div>

     </div>

    </>
  )
}

export default App


function GroupMembers() {
  return <>
   <h1 className='font-bold text-2xl'>Group Members</h1>
   <hr />
   {
    initialMembers.map((member) => <Members member={member} key={member.id}/>)
   }
  </>
}


function Members({member}) {
  return <>
   <div>
     <img src={member.image} alt={member.name} />
     <div>
      <h1>{member.name}</h1>
      {
        member.points > 0 && <p>`${member.points} Contribution Points`</p>
      }
      {
        member.points < 0 && <p>`You owes ${member.name} ${member.points} Points`</p>
      }
      {
        member.points === 0 && <p></p>
      }
     </div>
   </div>
  </>
}