import React, { useState,useEffect } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import Navbarroutes from "./navbarroutes";

function Dyanamicform(props) {
  const [inputType, setInputType] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [typeData, setTypeData] = useState();
  const [formName,setFormName]=useState({
    name:""
  });
  const [editAddOption,setEditAddOption]=useState();
  const [editDataIndex,setEditDataIndex]=useState();
  const [delDataIndex,setDelDataIndex]=useState();
 
  const [formData, setFormData] = useState({
    label: "",
    placeHolder: "",
  });
  
  const input = [
    { name: "text" },
    { name: "select" },
    { name: "checkbox" },
    { name: "radio" },
  ];
  const modelOpen = () => {
    setEditModal(true);
    
  };
  const modelClose = () => {
    setEditModal(false);
  };
  const delModalOpen = () => {
    setDelModal(true);
  };
  const delModalClose = () => {
    setDelModal(false);
  };
  

  const handleSubmit = (name) => {
   
    if (name === "text") {
      const outputArr = [...inputType, { type: "text",label:"",placeHolder:"",value:""}];
      setInputType(outputArr);
      // setEditAddOption(outputArr);
    } else if (name === "select") {
      const outputArr = [...inputType, { type: "select",label:"",value:"",option:["option1","option2"]}];
      setInputType(outputArr);
      // setEditAddOption(outputArr);
    } else if (name === "radio") {
      const outputArr = [...inputType, { type: "radio",label:"",value:"",option:["male","female"]}];
      setInputType(outputArr);
      // setEditAddOption(outputArr);
    } else if (name === "checkbox") {
      const outputArr = [...inputType, { type: "checkbox",label:"",value:"",option:["Yes","No"]}];
      setInputType(outputArr);
      // setEditAddOption(outputArr);
    }
  };
  
  const formAddData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  let Data=[];
  
  const addOptions=()=>{
    const updatedOptions = [...editAddOption.option, "New Option"];
  setEditAddOption((prevType) => ({ ...prevType, option: updatedOptions }));
    // inputType[formIndex.editDataIndex].arr=[...Data]; 
  }
 
 
  const updateFormData = () => {
    inputType[editDataIndex]={type:typeData,label:formData.label,placeHolder:formData.placeHolder,option:editAddOption.option}
    setFormData({
      label: "",
      placeHolder: "",
    });
    // inputType[formIndex.editDataIndex].arr=editAddOption[formIndex.editDataIndex].arr;
    // setDisplay({formData});
    // console.log(display,"nnnnnnnnnnnnnnnnnnnnnnnnnnnn")

    //     // console.log(type,"typeee")
    //     // console.log(formData,"label")
    //     if(type==="text"){
    //     inputType[formIndex.editDataIndex]=<span  key={"text"}>{formData.label}<input placeholder={formData.placeHolder} className='border border-black p-2 m-2'></input></span>
    //     console.log(type,"ffffffffffffffffff")
    //     setFormData({
    //         label:"",
    //         placeHolder:" "
    //     })
    //     }
    //     else if(type==="select")
    //     {
    //         inputType[formIndex.editDataIndex]=<span key={"select"}>{formData.label}<select  className='w-32 border border-black'>
    //             <option>first</option>
    //             </select></span>
    //              setFormData({
    //                 label:" ",
    //                 placeHolder:" "
    //             })
    //     }

    //     else if(type==="radio")
    //     {
    //         inputType[formIndex.editDataIndex]=<span key={"radio"} >{formData.label}<input type="radio"/></span>
    //         // setType("radio");
    //         console.log(formData.label,"zzzzzzzzzzzz")
    //         setFormData({
    //             label:" ",
    //             placeHolder:" "
    //         })
    //     }
    //     else if(type==="checkbox")
    //     {
    //         inputType[formIndex.editDataIndex]=<span key={"checkbox"}>{formData.label}<input  type="checkbox"/></span>
    //         setFormData({
    //             label:" ",
    //             placeHolder:" "
    //         })

    //     }
    //     // else if(type==="radio")

    //     // setFormData({
    //     //     label:formData.label,
    //     //     placeHolder:formData.placeHolder
    //     // })
    //     // inputType[editDataIndex]=<input placeholder={formData.placeHolder} className='border border-black p-2'></input>

    //     // const updatedData=
  };
  const deleteFormData = () => {
    const DeletArr = [...inputType];
    if (!delDataIndex.length)
      DeletArr.splice(delDataIndex, 1);
    setInputType([...DeletArr]);
  };
 
  
  
  
// const setEditData=()=>{
//   // console.log(formIndex,'kk')
//   console.log(inputType[editDataIndex],"madhuuu")
//   // setEditAddOption([inputType[editDataIndex]])
//   console.log(editAddOption,"abina")
//   console.log(inputType[editDataIndex],'senthilkumar')
// }
const handleFormname=(e)=>{
  const{value}=e.target;
  setFormName(value);
}

const formBackend=()=>{
  axios.post("http://localhost:5000/create-userForm",{formName:formName,formData:inputType},{headers:{Authorization:`Bearer ${props.tokenData}`}})
  .then((res)=>{
   
    if (res?.data?.message) alert(res?.data?.message);
  
  })
  .catch((err)=>{if (err?.response?.data?.message) alert(err?.response?.data?.message);})
  

setFormName({name:""})
setInputType([]);
}
const delteOptions=(i)=>{
  const arr=[...editAddOption.option];
  arr.splice(i,1);
  setEditAddOption((prevType) => ({ ...prevType, option: arr }));
  

}


  return (
    <div>
     <Navbarroutes setUserId={props}/>
     <div className="flex justify-between">
      <div>
      {input?.map((item, index) => {
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
      })}
      {inputType.map((item, index) => {
        return (
          <div key={index} className="flex">
            {item.type === "text" ? (
            <div>
                <label>{item?.label}</label>
              <input className=" border border-black p-2"  placeholder={item?.placeHolder}/>
            </div>
            ) : item.type === "select" ? (<div>
              <label>{item?.label}</label><select className=" border border-black p-2" >
                {item.option?.map((values,i)=>{
                  return(<option key={i}>{values?values:null}</option>)
                })}
              </select>
              </div>
            ) : item.type === "radio" ? (<div>
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
            ) : null}
            <Button
              type="primary"
              onClick={() => {
                modelOpen();
                setEditDataIndex(index);
                setTypeData(item.type)
                // setOptions(item);
                setEditAddOption(item);
                setFormData({label:item.label,placeHolder:item.placeHolder})
              }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setDelDataIndex(index);
                delModalOpen();
              }}
            >
              Delete
            </Button>
          </div>
        );
      })}
      <Modal
        open={editModal}
        onCancel={modelClose}
        onOk={() => {
          modelClose();
          updateFormData()
        }}
      >
        {typeData === "text" ? (
          <div>
            
            Label
            <input
              name="label"
              value={formData.label}
              onChange={formAddData}
              className="border border-black"
            />
            placeHolder
            <input
              name="placeHolder"
              value={formData.placeHolder}
              onChange={formAddData}
              className="border border-black"
            />
          </div>
        ) : (
          <div>
            Label
            <input
              name="label"
              value={formData.label}
              onChange={formAddData}
              className="border border-black"
            />
            {editAddOption&&editAddOption.option.map((item,i)=>{
             
              return(<div key={i} className="flex"><input type="text" value={item} onChange={(e)=>{
                const {value}=e.target;
                const arr=[...editAddOption.option]
                arr[i]=value;
                setEditAddOption((prevType) => ({ ...prevType, option: arr }));

              }}/><Button onClick={()=>delteOptions(i)}>Delete</Button> </div>)
            })}
            <Button type="primary" onClick={()=>addOptions()}>Add</Button>
          </div>
        )}
        {/* Label<input name="label" value={formData.label} onChange={formAddData} className='border border-black'/>
            placeHolder<input name="placeHolder" value={formData.placeHolder} onChange={formAddData} className='border border-black'/> */}
      </Modal>
      <Modal
        open={delModal}
        onCancel={delModalClose}
        onOk={() => {
          deleteFormData();
          delModalClose();
        }}
      >
        Data Deleted Successfully
      </Modal>
      </div>
      <div>
       FormName <input name="name" value={formName.name} onChange={handleFormname} className="border border-black"/><Button type="primary" onClick={formBackend}>Add Form</Button>
      </div>
    </div>
    </div>
  );
}

export default Dyanamicform;
