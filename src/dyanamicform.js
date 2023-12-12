import React, { useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";

function Dyanamicform(props) {
  const [inputType, setInputType] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [typeData, setTypeData] = useState();
  const [formName,setFormName]=useState({
    name:""
  });
  const [formIndex,setFormIndex]=useState(0)
  const [editAddOption,setEditAddOption]=useState();
  const [editDataIndex,setEditDataIndex]=useState();
  const [delDataIndex,setDelDataIndex]=useState();
  // const [formIndex, setFormIndex] = useState({
  //   editDataIndex: 0,
  //   delDataIndex: "",
  // });
  const [formData, setFormData] = useState({
    label: "",
    placeHolder: "",
  });
  const [updateData,setUpdateData]=useState()
  const input = [
    { name: "text" },
    { name: "select" },
    { name: "checkbox" },
    { name: "radio" },
  ];
  const modelOpen = () => {
    setEditModal(true);
    // console.log(editModal,"aaassssaasss")
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
    console.log(name, "id");
    if (name === "text") {
      const outputArr = [...inputType, { type: "text",label:"",placeHolder:""}];
      setInputType(outputArr);
      // setEditAddOption(outputArr);
    } else if (name === "select") {
      const outputArr = [...inputType, { type: "select",label:"",arr:["option1","option2"]}];
      setInputType(outputArr);
      // setEditAddOption(outputArr);
    } else if (name === "radio") {
      const outputArr = [...inputType, { type: "radio",label:"",arr:["male","female"]}];
      setInputType(outputArr);
      // setEditAddOption(outputArr);
    } else if (name === "checkbox") {
      const outputArr = [...inputType, { type: "checkbox",label:"",arr:["Yes","No"]}];
      setInputType(outputArr);
      // setEditAddOption(outputArr);
    }
  };
  console.log(props.userId.firstName,"props")
  // console.log(editModal, "qwedsa");
  console.log(editAddOption, "modal");
  const formAddData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  let Data=[];
  
  const addOptions=()=>{
    console.log(editAddOption,"first")
    // setEditAddOption([inputType[formIndex.editDataIndex]])
    // console.log(editAddOption[0].arr,"qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
    // console.log(inputType,editDataIndex,"qwerty")
    // Data=[...inputType]
    // console.log(Data[editDataIndex],"1")
    // Data[editDataIndex]=[Data[editDataIndex],Data[editDataIndex].arr.push("new option")]
    // console.log(data)
    // console.log(Data,"Data")
    // setEditAddOption(Data);
    // editAddOption[0].arr=[...Data]
   // editAddOption[editDataIndex]=Data
    
    // setEditAddOption(Data);
    // console.log(editAddOption,"DataEdited")
    const updatedOptions = [...editAddOption.arr, "New Option"];
  setEditAddOption((prevType) => ({ ...prevType, arr: updatedOptions }));
  console.log(editAddOption,"addoptions")


    
     
    // inputType[formIndex.editDataIndex].arr=[...Data];
    // console.log(inputType[formIndex.editDataIndex]?.arr,"dddddddddddddddaaaaaaa")
    // console.log(inputType,"qwertyuio")
    // 

  }
  console.log(Data,"mmmmmmmmmm")
  // console.log(Data,"zzzzzzssssss")
  // console.log(updateData,"zxcvvbnm,mnbvcxcvbnbvcx")
 
  const updateFormData = () => {
    // console.log(Data, "hole data");
    // inputType[formIndex.editDataIndex].arr=[...Data];
    // console.log(inputType[formIndex.editDataIndex].arr,"aaaaaaaaaaaaaaaaaaaaaa")
    // console.log(editAddOption,"editaddoptions")
    // setUpdateData(editAddOption[editDataIndex]?.arr)

    // console.log(editAddOption[0]?.arr,"vengatesan")
    inputType[editDataIndex]={type:typeData,label:formData.label,placeHolder:formData.placeHolder,arr:editAddOption.arr}
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
    // console.log(formIndex?.delDataIndex,"index of del")
    // inputType[formIndex.editDataIndex]=inputType.splice(formIndex.editDataIndex,1);
    if (!delDataIndex.length)
      DeletArr.splice(delDataIndex, 1);

    // console.log("jiii",DeletArr)
    setInputType([...DeletArr]);
  };
 
  console.log(delDataIndex, "modal1111");
  // console.log(inputType[editDataIndex]?.arr,"llllllllllllllllllll")
  console.log(inputType[editDataIndex],'senthilkumar')
// const setEditData=()=>{
//   // console.log(formIndex,'kk')
//   console.log(inputType[editDataIndex],"madhuuu")
//   // setEditAddOption([inputType[editDataIndex]])
//   console.log(editAddOption,"abina")
//   console.log(inputType[editDataIndex],'senthilkumar')
// }
const handleFormname=(e)=>{
  const{name,value}=e.target;
  setFormName(value);
}
console.log(formName,"formName");
const formBackend=()=>{
  let time=new Date();
  setFormIndex(formIndex+1);
  console.log(formIndex,"indexesss")
  const user=props.userId.firstName;
  console.log(user,"123456")
  axios.post("http://localhost:5000/form-post",{index:formIndex,formName:formName,formData:inputType,formUserName:user,formTime:time})
  .then((res)=>{
    console.log(res,"data get succesfully");
  })
  .catch((err)=>console.log(err,"err"))
  
// console.log(time.getDate())

}

  return (
    <div className="flex justify-between">
      <div>
      {input?.map((item, index) => {
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
                {item.arr?.map((values,i)=>{
                  return(<option key={i}>{values?values:null}</option>)
                })}
              </select>
              </div>
            ) : item.type === "radio" ? (<div>
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
            ) : null}
            <Button
              type="primary"
              onClick={() => {
                modelOpen();
                // console.log(index,"indexes")
                setEditDataIndex(index);
                // console.log(editDataIndex,'senthilkumar')
                // console.log(item,"sivaprakash")
                setTypeData(item.type)
                // setOptions(item);
                setEditAddOption(item);
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
      >{console.log(typeData,editAddOption,editDataIndex,"nnnnnnn")}
        {typeData === "text" ? (
          <div>
            {console.log('llkkk')}
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
          <div>{ console.log(editAddOption,'ll')}
            Label
            <input
              name="label"
              value={formData.label}
              onChange={formAddData}
              className="border border-black"
            />
            {editAddOption&&editAddOption.arr.map((item,i)=>{
             
              return(<div key={i}>{item}</div>)
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
      </Modal></div>
      <div>
       FormName <input name="name" value={formName.name} onChange={handleFormname} className="border border-black"/><Button type="primary" onClick={formBackend}>Add Form</Button>
      </div>
    </div>
  );
}

export default Dyanamicform;
