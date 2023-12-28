import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, Modal } from 'antd';
import Item from 'antd/es/list/Item';
import Navbarroutes from './navbarroutes';

function ViewResponseData(props) {
    const[viewResData,setViewResData]=useState();
    const[viewValueModal,setViewValueModal]=useState(false);
    const[submittedData,setSubmitData]=useState();
    console.log(props,"props")
    useEffect(()=>{
        axios.get("http://localhost:5000/get-userForm",{headers:{Authorization:`Bearer ${props.tokenData}`}})
        .then((res)=>{
            
            const {data}=res?.data||{};
            if(data.length)setViewResData(data)
        
        })
        .catch(err=>console.log(err))
    },[])
    const view=localStorage.getItem('id');
    // const data=localStorage.getItem('myData');
//  const viewId=JSON.parse(view);

const openModal=()=>{
  setViewValueModal(true);
}
const closeModal=()=>{
  setViewValueModal(false);

}
    const arr=viewResData?.filter(x=>x._id===view)
    
    const [columnDefs]=useState([
        {field:"submitedTime"},
        {field:"createdBy"},
        {field:"View",cellRenderer:({data})=>{
          return(<div><Button onClick={()=>{openModal();setSubmitData(data.submittedForm
            )}}>View</Button></div>)

        }}
      
    ])
  return (
    <div>
      <Navbarroutes setUserId={props}/>
        <div>
        <div
        className="ag-theme-alpine"
        style={{ height: "600px", width: "100%" }}
      >
       
       
       
       
       {arr&& <AgGridReact rowData={arr[0].submissions} columnDefs={columnDefs}></AgGridReact>}
      </div>
        </div>
        <Modal
        open={viewValueModal}
        onCancel={closeModal}
        onOk={closeModal}>
          {submittedData&&submittedData.map((value,index)=>{
            return(<div key={index} className='flex flex-col'><p>{value.label}::{value.value}</p>
            </div>)
          })}
        </Modal>
    </div>
  )
}

export default ViewResponseData