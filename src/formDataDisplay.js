import React,{useEffect, useState} from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, Modal } from "antd";
import axios from "axios";

function FormDataDisplay() {
    const [formData1,setFormData1]=useState([])
    const [editModal,setEditModal]=useState(false);
    const [delModal,setDelModal]=useState(false);
    const [editFormData,setEditFormData]=useState([]);
    const [delFormData,setDelFormData]=useState();
    useEffect((res)=>{
        axios.get("http://localhost:5000/form-get")
        .then(res=>{
            const {data}=res?.data||{};
            if(data.length){
            
            setFormData1(data)}
        })
        .catch(err=>console.log(err))

    },[])
    const editModalOpen=()=>{
      setEditModal(true);
    }
    const editModalCancel=()=>{
      setEditModal(false);
    }
    const editModalOk=()=>{
      setEditModal(false);
    }
    const delModalOpen=()=>{
      setDelModal(true);
    }
    const delModalCancel=()=>{
      setDelModal(false);
    }
    const delModalOk=()=>{
      setDelModal(false);
    }
    const deleteFormData=()=>{
      const Arr=[...formData1]
      console.log(Arr,"qwerty")
      const index=Arr.findIndex(x=>x._id===delFormData)
      console.log(index,"kkkk")
      if(index>-1)
      {
        Arr.splice(index,1);
        setFormData1(Arr);
        
      }
      console.log(Arr,"llllll")
    }
    console.log(formData1,"vimal123")
    const [columnDefs]=useState([
        {field:"formName"},
        {field:"formData"},
        {field:"formUserName"},
        {field:"formTime"},
        { field: "Edit",
      cellRenderer: ({ data }) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              // findIndex();
              console.log(data.formData,"hiiiii")
              setEditFormData(data.formData);
              editModalOpen();
              // setData(data);
            }}
          >
            Edit
          </Button>
        );
      }
    },
    { field: "Delete",
    cellRenderer: ({ data }) => {
      return (
        <Button
          type="primary"
          onClick={() => {
            // findIndex();
            console.log(data._id,"hiiiii")
            setDelFormData(data._id);
            delModalOpen();
           
            // setData(data);
          }}
        >
          Delete
        </Button>
      );
    }
  }
    ])
    
  return (
    <div>
        <div
        className="ag-theme-alpine"
        style={{ height: "600px", width: "100%" }}
      >
        <AgGridReact rowData={formData1} columnDefs={columnDefs}></AgGridReact>
      </div>
      <div>
        <Modal
        open={editModal}
        onCancel={editModalCancel}
        onOk={() => {
          // deleteFormData();
          editModalCancel();
        }}>
          {
            editFormData.map((item,index)=>{
              return(<div key={index}>
                {
                  item.type==="text"?(
                    <div>
                       <label>{item?.label}</label>
                      <input className=" border border-black p-2"  placeholder={item?.placeHolder}/>
                    </div>
                  ):item.type==="select"?(
                    <div>
                       <label>{item?.label}</label><select className=" border border-black p-2" >
                {item.arr?.map((values,i)=>{
                  return(<option key={i}>{values?values:null}</option>)
                })}
              </select>
                    </div>
                  ):item.type === "radio" ? (<div>
                    <label>{item?.label}</label>
                    {item.arr?.map((values,i)=>{
                      return(
                        <div key={i} className="flex-row"><label>{values}</label><input type="radio" className=" border border-black p-2" /></div>
                      )
                    })}
                    </div>
                  ) : item.type === "checkbox" ? (<div>
      
                    <label>{item?.label}</label><input type="checkbox" className=" border border-black p-2" />
                    </div>
                  ) : null
                }
              </div>)
            })
          }


        </Modal>
        <Modal
        open={delModal}
        onCancel={delModalCancel}
        onOk={() => {
          // deleteFormData();
          delModalOk();
          deleteFormData();
          
        }}>
          Delete Data 

        </Modal>
      </div>
    </div>
  )
}

export default FormDataDisplay;