import React,{useEffect, useState} from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, Modal } from "antd";
import axios from "axios";
import { json, useNavigate } from 'react-router-dom';
import ViewResponseData from './viewResponse';
import Navbarroutes from './navbarroutes';

function FormDataDisplay(props) {
    const [formData1,setFormData1]=useState([])
    const [editModal,setEditModal]=useState(false);
    const [delModal,setDelModal]=useState(false);
    const [editFormData,setEditFormData]=useState([]);
    const [delFormData,setDelFormData]=useState();
    const [editIndex,seteditIndex]=useState();
    const [delIndex,setDelIndex]=useState();
    const [editModalData,setEditModalData]=useState();
    const [editInsideModal,setEditInsideModal]=useState(false);
    const [userEditValue,setUserEditValue]=useState(
      {
        placeHolder:'',
        label:''
      }
    );
    const [agData,setAgData]=useState();
    const [viewData,setViewData]=useState();
    const [viewModal,setViewModal]=useState(false);
    const [submitResponseModal,setSubmitResponsemodal]=useState(false);
    const [submitResponseData,setSubmitResponseData]=useState();
    const [submitId,setSubmitId]=useState();
  
    useEffect((res)=>{
        axios.get("http://localhost:5000/get-userForm",{headers:{Authorization:`Bearer ${props.tokenData}`}})
        .then(res=>{
            const {data}=res?.data||{};
            if(data.length){
            
            setFormData1(data)}
        })
        .catch(err=>console.log(err))

    },[])


    const input = [
      { name: "text" },
      { name: "select" },
      { name: "checkbox" },
      { name: "radio" },
    ];
    const navigate=useNavigate();
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
    const editInModal=()=>{
      setEditInsideModal(true);
    }
    const editInModalclose=()=>{
      setEditInsideModal(false)
    }
    const editInModalOk=()=>{
      setEditInsideModal(false)
    }
    const viewModalOpen=()=>{
      setViewModal(true);
    }
    const viewModalCancel=()=>{
      setViewModal(false)
    }
    const submitOpen=()=>{
      setSubmitResponsemodal(true);
    }
    const submitCancel=()=>{
      setSubmitResponsemodal(false);
    }
   
    const deleteFormData=()=>{
      const Arr=[...formData1]
    
      const index=Arr.findIndex(x=>x._id===delFormData)
     
      if(index>-1)
      {
        Arr.splice(index,1);
        setFormData1(Arr);
        
      }
      
    }
   
    const deleteform=(data)=>{
      const id=data._id;
    
      axios.delete(`http://localhost:5000/delete-userForm/${id}`,{headers:{Authorization:`Bearer ${props.tokenData}`}})
      .then((res)=>{
        if (res?.data?.message) alert(res?.data?.message);
       
      })
      .catch(err=>{
        if (err?.response?.data?.message) alert(err?.response?.data?.message);
        
      })

    }
    const handleSubmit = (name) => {
  
    if (name === "text") {
      const outputArr = [...editFormData, { type: "text",label:"",placeHolder:"",value:""}];
      setEditFormData(outputArr);
      // setEditAddOption(outputArr);
    } else if (name === "select") {
      const outputArr = [...editFormData, { type: "select",label:"",value:"",option:["option1","option2"]}];
      setEditFormData(outputArr);
      // setEditAddOption(outputArr);
    } else if (name === "radio") {
      const outputArr = [...editFormData, { type: "radio",label:"",value:"",option:["male","female"]}];
      setEditFormData(outputArr);
      // setEditAddOption(outputArr);
    } else if (name === "checkbox") {
      const outputArr = [...editFormData, { type: "checkbox",label:"",value:"",option:["Yes","No"]}];
      setEditFormData(outputArr);
      // setEditAddOption(outputArr);
    }
  };
  const setView=(data)=>{
   
    if (typeof Storage !== 'undefined') {
      localStorage.setItem('id', data._id);
    } else {
      console.error('localStorage is not supported in this browser');
    }
  }

    const [columnDefs]=useState([
        {field:"formName"},
        {field:"formData"},
        {field:"createdBy"},
        {field:"createdAt"},
        { field: "ViewData",
        cellRenderer: ({ data }) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                
                setViewData(data.formData)
                viewModalOpen()
                
               
              }}
            >
            View
            </Button>
          );
        }
      },
        { field: "Edit",
      cellRenderer: ({ data }) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              
              setEditFormData(data.formData);
              editModalOpen();
              setAgData(data)
              
              
            }}
          >
            Edit
          </Button>
        );
      }
    },
    {
      field:"Submit Response",
      cellRenderer:({data})=>{
        return(
          <Button 
          type='submit'
          className='bg-green-500'
          onClick={()=>{
            submitOpen();
            setSubmitId(data)
            setSubmitResponseData(data.formData)
          }}>Submit Response</Button>
        )
      }
    },
    {field:"View Response",
    cellRenderer:({data})=>{
      return(
        <Button
        type="primary"
        onClick={()=>{setView(data);navigate("/viewResponse")}}>View Response</Button>
      )

    }
  },
    { field: "Delete",
    cellRenderer: ({ data }) => {
      return (
        <Button
          type="delete"
          className='bg-red-500 text-white'
          onClick={() => {
            setDelFormData(data._id);
            delModalOpen();
            deleteform(data);
          }}
        >
          Delete
        </Button>
      );
    }
  }
    ])
    const formAddData=(e)=>{
      const { name, value } = e.target;
    setUserEditValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    }
    const addOptions=()=>{
      const updatedOptions = [...editModalData.option, "New Option"];
  setEditModalData((prevType) => ({ ...prevType, option: updatedOptions }));

    }
    const upadateForm=()=>{
      editFormData[editIndex]={type:editModalData?.type,label:userEditValue.label,placeHolder:userEditValue.placeHolder,option:editModalData.option}
    setUserEditValue({
      label: "",
      placeHolder: "",
    });
    }
    
    const patchMethod=()=>{
      const id=agData._id;
      axios.patch(`http://localhost:5000/update-userForm/${id}`,{formName:agData.formName,formData:editFormData},{headers:{Authorization:`Bearer ${props.tokenData}`}})
      .then((res)=>{
        if (res?.data?.message) alert(res?.data?.message);
        setFormData1((prev)=>{
          const index=prev.findIndex(i=>i._id===res.data.data._id)
          if(index>-1)
          formData1[index]=res.data.data;
        return [...formData1];
        })
      })
      .catch(err=>{
        if (err?.response?.data?.message) alert(err?.response?.data?.message);
      })
    }
    const deleteData=()=>{
      const arr=[...editFormData]
      if (delIndex>-1)
      arr.splice(delIndex,1)
      setEditFormData([...arr])

    }
    const delteOptions=(i)=>{
      const arr=[...editModalData.option];
      arr.splice(i,1);
      setEditModalData((prevType) => ({ ...prevType, option: arr }));
      
    
    }
    const responseBackend=()=>{
      let time=new Date();
      const obj={
        createdBy:props.userId.firstName,
        submitedTime:time,
        submittedForm:submitResponseData
      }
      axios.patch(`http://localhost:5000/update-userFormResponse/${submitId._id}`,{submissions:[obj]},{headers:{Authorization:`Bearer ${props.tokenData}`}})
      .then((res)=>{
        if (res?.data?.message) alert(res?.data?.message);
     
      })
      .catch(err=>{
        if (err?.response?.data?.message) alert(err?.response?.data?.message);
       })
    }
    
  return (
    <div>
     <Navbarroutes setUserId={props}/>
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
          // ss()
          patchMethod();
          editModalCancel();
        }}>
          {
            input?.map((item, index) => {
              return (
                <div key={index}>
                  {item?.name}
                  <button
                    className="p-2 border border-black"
                    onClick={() => {handleSubmit(item.name);}}
                  >
                    Add
                  </button>
                </div>
              );
            })
          }
          {
            editFormData.map((item,index)=>{
              return(<div key={index} className='flex'>
                {
                  item.type==="text"?(
                    <div>
                       <label>{item?.label}</label>
                      <input className=" border border-black p-2"  placeholder={item?.placeHolder}/>
                    </div>
                  ):item.type==="select"?(
                    <div>
                       <label>{item?.label}</label><select className=" border border-black p-2" >
                {item.option?.map((values,i)=>{
                  return(<option key={i}>{values?values:null}</option>)
                })}
              </select>
                    </div>
                  ):item.type === "radio" ? (<div>
                    <label>{item?.label}</label>
                    {item.option?.map((values,i)=>{
                      return(
                        <div key={i} className="flex-row"><label>{values}</label><input type="radio" className=" border border-black p-2" /></div>
                      )
                    })}
                    </div>
                  ) : item.type === "checkbox" ? (<div>
      
                    <label>{item?.label}</label>
                    {item.option?.map((values,i)=>{
                return(
                  <div key={i} className="flex-row"><label>{values}</label><input type="checkbox" className=" border border-black p-2" /></div>
                )
              })}
                    </div>
                  ) : null

                }
                <Button type='primary' onClick={()=>{seteditIndex(index);setEditModalData(item);editInModal();setUserEditValue({label:item.label,placeHolder:item.placeHolder})}}>Edit</Button>
                <Button type="primary" onClick={()=>{setDelIndex(index);deleteData()}}>Delete</Button>
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
        <Modal 
        open={editInsideModal}
        onCancel={editInModalclose}
        onOk={()=>{
          editInModalOk();
          upadateForm();

        }}>
          {editModalData?.type === "text" ? (
          <div>
            
            Label
            <input
              name="label"
              value={userEditValue.label}
              onChange={formAddData}
              className="border border-black"
            />
            placeHolder
            <input
              name="placeHolder"
              value={userEditValue.placeHolder}
              onChange={formAddData}
              className="border border-black"
            />
          </div>
        ) : (
          <div>
            Label
            <input
              name="label"
              value={userEditValue.label}
              onChange={formAddData}
              className="border border-black"
            />
            {editModalData&&editModalData.option?.map((item,i)=>{
             
              return(<div key={i}><input type="text" value={item} onChange={(e)=>{
                const {value}=e.target;
                const arr=[...editModalData.option]
                arr[i]=value;
                setEditModalData((prevType) => ({ ...prevType, option: arr }));

              }}className=" border border-black p-2" /><Button onClick={()=>delteOptions(i)}>Delete</Button></div>)
            })}
            <Button type="primary" onClick={()=>addOptions()}>Add</Button>
          </div>
        )}
        </Modal>
      </div>
      <div>
        <Modal
        open={viewModal}
        onCancel={viewModalCancel}
        onOk={viewModalCancel}
        >
        {
            viewData?.map((item,index)=>{
              return(<div key={index} className='flex'>
                {
                  item.type==="text"?(
                    <div>
                       <label>{item?.label}</label>
                      <input className=" border border-black p-2"  placeholder={item?.placeHolder}/>
                    </div>
                  ):item.type==="select"?(
                    <div>
                       <label>{item?.label}</label><select className=" border border-black p-2" >
                {item.option?.map((values,i)=>{
                  return(<option key={i}>{values?values:null}</option>)
                })}
              </select>
                    </div>
                  ):item.type === "radio" ? (<div>
                    <label>{item?.label}</label>
                    {item.option?.map((values,i)=>{
                      return(
                        <div key={i} className="flex-row"><label>{values}</label><input type="radio" className=" border border-black p-2" /></div>
                      )
                    })}
                    </div>
                  ) : item.type === "checkbox" ? (<div>
      
                    <label>{item?.label}</label>
                    {item.option?.map((values,i)=>{
                return(
                  <div key={i} className="flex-row"><label>{values}</label><input type="checkbox" className=" border border-black p-2" /></div>
                )
              })}
                    </div>
                  ) : null

                }
                {/* <Button type='primary' onClick={()=>{seteditIndex(index);setEditModalData(item);editInModal()}}>Edit</Button> */}
              </div>)
            })
          }
          
        </Modal>
        <Modal
         open={submitResponseModal}
         onCancel={submitCancel}
         onOk={()=>{
          submitCancel();
         responseBackend();
         }}>
          
           {
            submitResponseData?.map((item,index)=>{
              return(<div key={index} className='flex'>
                {
                  item.type==="text"?(
                    <div>
                       <label>{item?.label}</label>
                      <input className=" border border-black p-2"  placeholder={item?.placeHolder} value={item?.value} onChange={(e)=>{
                        
                        setSubmitResponseData((prev) => { 
                          const arr=[...prev]
                          arr[index].value=e.target.value;
                          return arr
                         });
                        
                      }}/>
                    </div>
                  ):item.type==="select"?(
                    <div>
                       <label>{item?.label}</label><select className=" border border-black p-2"  value={item?.vale} onChange={(e)=>{
                        setSubmitResponseData((prev) => { 
                          const arr=[...prev]
                          arr[index].value=e.target.value;
                          return arr
                         });
                       }}>
                {item.option?.map((values,i)=>{
                  return(<option key={i}>{values?values:null}</option>)
                })}
              </select>
                    </div>
                  ):item.type === "radio" ? (<div>
                    <label>{item?.label}</label>
                    {item.option?.map((values,i)=>{
                      return(
                        <div key={i} className="flex-row"><label>{values}</label><input type="radio" className=" border border-black p-2" value={item?.value}onChange={(e)=>{
                          setSubmitResponseData((prev) => { 
                            const arr=[...prev]
                            arr[index].value=values;
                            return arr
                           });
                         }} checked={item.value===values}/></div>
                      )
                    })}
                    </div>
                  ) : item.type === "checkbox" ? (<div>
      
                    <label>{item?.label}</label>
                    {item.option?.map((values,i)=>{
                return(
                  <div key={i} className="flex-row"><label>{values}</label><input type="checkbox" className=" border border-black p-2" value={item?.value} onChange={(e)=>{
                    setSubmitResponseData((prev) => { 
                      const arr=[...prev]
                      arr[index].value=values;
                      return arr
                     });
                   }} checked={item.value===values}/></div>
                )
              })}
                    </div>
                  ) : null

                }
                {/* <Button type='primary' onClick={()=>{seteditIndex(index);setEditModalData(item);editInModal()}}>Edit</Button> */}
              </div>)
            })
          }



        </Modal>
      </div>

    </div>
  )
}

export default FormDataDisplay;