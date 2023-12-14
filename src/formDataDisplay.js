import React,{useEffect, useState} from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, Modal } from "antd";
import axios from "axios";

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
        axios.get("http://localhost:5000/form-get")
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
    console.log(props.userId.firstName,"props")
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
    const deleteform=(data)=>{
      const id=data._id;
      axios.delete(`http://localhost:5000/form-delete/${id}`)
      .then((res)=>{
        console.log(res,"delete Data")
      })
      .catch(err=>{
        console.log(err,"error message")
      })

    }
    const handleSubmit = (name) => {
    console.log(name, "id");
    if (name === "text") {
      const outputArr = [...editFormData, { type: "text",label:"",placeHolder:"",value:""}];
      setEditFormData(outputArr);
      // setEditAddOption(outputArr);
    } else if (name === "select") {
      const outputArr = [...editFormData, { type: "select",label:"",value:"",arr:["option1","option2"]}];
      setEditFormData(outputArr);
      // setEditAddOption(outputArr);
    } else if (name === "radio") {
      const outputArr = [...editFormData, { type: "radio",label:"",value:"",arr:["male","female"]}];
      setEditFormData(outputArr);
      // setEditAddOption(outputArr);
    } else if (name === "checkbox") {
      const outputArr = [...editFormData, { type: "checkbox",label:"",value:"",arr:["Yes","No"]}];
      setEditFormData(outputArr);
      // setEditAddOption(outputArr);
    }
  };

    const [columnDefs]=useState([
        {field:"formName"},
        {field:"formData"},
        {field:"formUserName"},
        {field:"formTime"},
        { field: "ViewData",
        cellRenderer: ({ data }) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                // findIndex()
                setViewData(data.formData)
                viewModalOpen()
                
                // setData(data);
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
              // findIndex();
              console.log(data.formData,"hiiiii")
              setEditFormData(data.formData);
              editModalOpen();
              setAgData(data)
              
              // setData(data);
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
    { field: "Delete",
    cellRenderer: ({ data }) => {
      return (
        <Button
          type="delete"
          className='bg-red-500 text-white'
          onClick={() => {
            // findIndex();
            console.log(data._id,"hiiiii")
            setDelFormData(data._id);
            delModalOpen();
            deleteform(data);
           
            // setData(data);
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
      const updatedOptions = [...editModalData.arr, "New Option"];
  setEditModalData((prevType) => ({ ...prevType, arr: updatedOptions }));

    }
    const upadateForm=()=>{
      editFormData[editIndex]={type:editModalData?.type,label:userEditValue.label,placeHolder:userEditValue.placeHolder,arr:editModalData.arr}
    setUserEditValue({
      label: "",
      placeHolder: "",
    });
    }
    console.log(agData,"lkjhgffdsaa");
    const patchMethod=()=>{
      const id=agData._id;
      axios.patch(`http://localhost:5000/form-patch/${id}`,{formName:agData.formName,formData:editFormData,formTime:agData.formTime,formUserName:agData.formUserName})
      .then((res)=>{
        console.log(res,"Updated Data")
      })
      .catch(err=>{
        console.log(err,"error message")
      })
    }
    const ss=()=>{
      patchMethod();
      console.log('aaaaa',editFormData)
      // setFormData1((prev)=>({...prev,editFormData}))
      console.log('fffffff',formData1)
      editModalCancel();
    }
    const deleteData=()=>{
      const arr=[...editFormData]
      console.log(delIndex,"deleteddddddd")
      if (!delIndex.length)
      arr.splice(delIndex,1)
      setEditFormData([...arr])

    }
    const delteOptions=(i)=>{
      const arr=[...editModalData.arr];
      arr.splice(i,1);
      setEditModalData((prevType) => ({ ...prevType, arr: arr }));
      
    
    }
    // console.log(submitId?.submitResponse,"zzzzzzzzzz")
    const responseBackend=()=>{
      // console.log(submitResponseData,"siva")
      // console.log(submitId,"sivaprakash")
      // const arr=[...submitId.submitResponse,...submitResponseData]
      // console.log(arr,"vimalooo")
      

      // setSubmitId((prev)=>({...prev,}))
      let time=new Date();
      const obj={
        userName:props.userId.firstName,
        submitedTime:time,
        value:{...submitResponseData}
      }
      console.log(obj,"abi")
      axios.patch(`http://localhost:5000/submitFormResponse-patch/${submitId._id}`,{submitResponse:[obj]})
      .then((res)=>{
        console.log("data posted",res)
      })
      .catch(err=>console.log("Error occur",err))
    }
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
          ss()
        }}>
          {
            input?.map((item, index) => {
              return (
                <div key={index}>
                  {item?.name}
                  <button
                    className="p-2 border border-black"
                    onClick={() => {console.log(item,"krishana");handleSubmit(item.name);}}
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
      
                    <label>{item?.label}</label>
                    {item.arr?.map((values,i)=>{
                return(
                  <div key={i} className="flex-row"><label>{values}</label><input type="checkbox" className=" border border-black p-2" /></div>
                )
              })}
                    </div>
                  ) : null

                }
                <Button type='primary' onClick={()=>{seteditIndex(index);setEditModalData(item);editInModal()}}>Edit</Button>
                <Button type="primary" onClick={()=>{setDelIndex(index);deleteData();console.log(index,"sathisshhhhhhhhhhh")}}>Delete</Button>
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
            {console.log('llkkk')}
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
          <div>{ console.log(editModalData,'ll')}
            Label
            <input
              name="label"
              value={userEditValue.label}
              onChange={formAddData}
              className="border border-black"
            />
            {editModalData&&editModalData.arr.map((item,i)=>{
             
              return(<div key={i}><input type="text" value={item} onChange={(e)=>{
                const {value}=e.target;
                const arr=[...editModalData.arr]
                arr[i]=value;
                setEditModalData((prevType) => ({ ...prevType, arr: arr }));

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
      
                    <label>{item?.label}</label>
                    {item.arr?.map((values,i)=>{
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
          {console.log(submitResponseData,"ushhuuuuuuuuuuuuu")}
           {
            submitResponseData?.map((item,index)=>{
              return(<div key={index} className='flex'>
                {
                  item.type==="text"?(
                    <div>
                       <label>{item?.label}</label>
                      <input className=" border border-black p-2"  placeholder={item?.placeHolder} value={item?.value} onChange={(e)=>{
                        // const {value}=e.target;
                        // console.log(value,"valaueeeeee")
                        setSubmitResponseData((prev) => { 
                          const arr=[...prev]
                          arr[index].value=e.target.value;
                          return arr
                         });
                        // console.log(setSubmitData,"zzzzzzzzzzzzzzzz")
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
                {item.arr?.map((values,i)=>{
                  return(<option key={i}>{values?values:null}</option>)
                })}
              </select>
                    </div>
                  ):item.type === "radio" ? (<div>
                    <label>{item?.label}</label>
                    {item.arr?.map((values,i)=>{
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
                    {item.arr?.map((values,i)=>{
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