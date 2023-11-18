import React, { useState } from 'react'

function Dyanamicform() {
    const [inputType,setInputType]=useState([])
    const input=[
        {name:"text"},
        {name:"select"},
        {name:"checkbox"},
        {name:"radio"}

    ]
    const handleSubmit=(name)=>{
        if(name==="text")
        {
            setInputType(<input/>);
        }

    }
  return (
    <div>
        {
        input.map((item,index)=>{
            return(
            <div>{item?.name}<button className='p-2 border border-black' onClick={()=>handleSubmit}>Add</button></div>
        )
        })
        }
        {
            inputType.map((item,index)=>{
                return(<div>{item}{console.log(item)}
                </div>)
            })
        }
    </div>
  )
}

export default Dyanamicform;