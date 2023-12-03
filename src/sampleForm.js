import React, { useState } from 'react'
import { Button, Modal } from "antd";

function Dyanamicform() {
    const [inputType,setInputType]=useState([])
    const [editModal,setEditModal]=useState(false)
    const [delModal,setDelModal]=useState(false)
    const[type,setType]=useState()
    const [formIndex,setFormIndex]=useState({
        editDataIndex:'',
        delDataIndex:''

    })
    const [formData,setFormData]=useState(
        {
            label:"",
            placeHolder:""
        }
    )
    const input=[
        {name:"text"},
        {name:"select"},
        {name:"checkbox"},
        {name:"radio"}

    ]
    const modelOpen=()=>{
        setEditModal(true);
        // console.log(editModal,"aaassssaasss")
    }
    const modelClose=()=>{
        setEditModal(false);
    }
    const delModalOpen=()=>{
        setDelModal(true);
    }
    const delModalClose=()=>{
        setDelModal(false);
    }
   
    const handleSubmit=(name)=>{
        console.log(name,"id")
        if(name==="text")
        {
            const outputArr=[...inputType,{type:"text"}]
            setInputType(outputArr)
        }
        else if(name==="select")
        {
            const outputArr=[...inputType,{type:"select"}]
            setInputType(outputArr)

        }
        else if(name==="radio")
        {
            const outputArr=[...inputType,{type:"radio"}]
            setInputType(outputArr)

        }
        else if(name==="checkbox")
        {
            const outputArr=[...inputType,<input key={"checkbox"} type="checkbox" className='border border-black w-16'/>]
            setInputType(outputArr)

        }
        // console.log("sathish")

    }
    console.log(editModal,"qwedsa")
    const formAddData=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value

        }))

    }
    const updateFormData=()=>{
        console.log(type,"typeee")
        // console.log(formData,"label")
        if(type==="text"){
        inputType[formIndex.editDataIndex]=<span  key={"text"}>{formData.label}<input placeholder={formData.placeHolder} className='border border-black p-2 m-2'></input></span>
        console.log(type,"ffffffffffffffffff")
        setFormData({
            label:"",
            placeHolder:" "
        })
        }
        else if(type==="select")
        {
            inputType[formIndex.editDataIndex]=<span key={"select"}>{formData.label}<select  className='w-32 border border-black'>
                <option>first</option>
                </select></span>
                 setFormData({
                    label:" ",
                    placeHolder:" "
                })
        }

        else if(type==="radio")
        {
            inputType[formIndex.editDataIndex]=<span key={"radio"} >{formData.label}<input type="radio"/></span>
            // setType("radio");
            console.log(formData.label,"zzzzzzzzzzzz")
            setFormData({
                label:" ",
                placeHolder:" "
            })
        }
        else if(type==="checkbox")
        {
            inputType[formIndex.editDataIndex]=<span key={"checkbox"}>{formData.label}<input  type="checkbox"/></span>
            setFormData({
                label:" ",
                placeHolder:" "
            })

        }
        // else if(type==="radio")
       
        // setFormData({
        //     label:formData.label,
        //     placeHolder:formData.placeHolder
        // })
        // inputType[editDataIndex]=<input placeholder={formData.placeHolder} className='border border-black p-2'></input>
        
        


        // const updatedData=
    }
    const deleteFormData=()=>{
        const DeletArr=[...inputType]
        // console.log(formIndex?.delDataIndex,"index of del")
        // inputType[formIndex.editDataIndex]=inputType.splice(formIndex.editDataIndex,1);
        if(!formIndex.delDataIndex.length)
            DeletArr.splice(formIndex.delDataIndex,1);
        
        // console.log("jiii",DeletArr)
        setInputType([...DeletArr])
    }
    console.log(formIndex.editDataIndex,"modal")
    console.log(formIndex.delDataIndex,"modal1111")

  return (
    <div>
        <Modal open={editModal} onCancel={modelClose} onOk={()=>{modelClose();updateFormData()}}>{console.log(type,"12")}
        {type==="text"?(<div>
            Label<input name="label" value={formData.label} onChange={formAddData} className='border border-black'/>
            placeHolder<input name="placeHolder" value={formData.placeHolder} onChange={formAddData} className='border border-black'/></div>):(
            <div>Label<input name="label" value={formData.label} onChange={formAddData} className='border border-black'/></div>)}
            {/* Label<input name="label" value={formData.label} onChange={formAddData} className='border border-black'/>
            placeHolder<input name="placeHolder" value={formData.placeHolder} onChange={formAddData} className='border border-black'/> */}

            


        </Modal>
        <Modal open={delModal} onCancel={delModalClose} onOk={()=>{deleteFormData();delModalClose()}}>
            Data Deleted Successfully
        </Modal>
        {
        input.map((item,index)=>{
            return(
            <div key={index}>{item?.name}<button className='p-2 border border-black' onClick={()=>handleSubmit(item.name)}>Add</button></div>
        )
        })
        }
        {
            
            inputType.map((item,index)=>{
                return(<div key={index}>{item}<Button type="primary" onClick={()=>{modelOpen();setFormIndex({editDataIndex:index});setType(item.key);console.log(item,"7777777777777")}}>Edit</Button><Button type="primary" onClick={()=>{setFormIndex({delDataIndex:index});delModalOpen()}}>Delete</Button>
                </div>)
            })
            
        }
    </div>
  )
}

export default Dyanamicform;