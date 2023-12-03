import React, { useState } from "react";
import { Button, Modal } from "antd";

function Dyanamicform() {
  const [inputType, setInputType] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [typeData, setTypeData] = useState();
  const [editAddOption,setEditAddOption]=useState();
  const [formIndex, setFormIndex] = useState({
    editDataIndex: "",
    delDataIndex: "",
  });
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
    } else if (name === "select") {
      const outputArr = [...inputType, { type: "select",label:"",arr:["option1","option2"]}];
      setInputType(outputArr);
    } else if (name === "radio") {
      const outputArr = [...inputType, { type: "radio",label:"",arr:["male","female"]}];
      setInputType(outputArr);
    } else if (name === "checkbox") {
      const outputArr = [...inputType, { type: "checkbox",label:"",arr:["Yes","No"]}];
      setInputType(outputArr);
    }
    // console.log("sathish")
  };
  console.log(editModal, "qwedsa");
  const formAddData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  let Data=[];
  
  const addOptions=()=>{
    // console.log(inputType[formIndex.editDataIndex],"first")
    // setEditAddOption([inputType[formIndex.editDataIndex]])
    console.log(editAddOption[0]?.arr,"qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
    Data=[...editAddOption[0]?.arr,"new option"]
    console.log(Data,"Data")
    setEditAddOption([Data]);
    console.log(editAddOption[0].arr,"DataEdited")
    

    
     
    // inputType[formIndex.editDataIndex].arr=[...Data];
    // console.log(inputType[formIndex.editDataIndex]?.arr,"dddddddddddddddaaaaaaa")
    // console.log(inputType,"qwertyuio")
    // setUpdateData(editAddOption?.arr)

  }
  // console.log(Data,"zzzzzzssssss")
  // console.log(updateData,"zxcvvbnm,mnbvcxcvbnbvcx")
  const updateFormData = () => {
    // console.log(Data, "hole data");
    // inputType[formIndex.editDataIndex].arr=[...Data];
    // console.log(inputType[formIndex.editDataIndex].arr,"aaaaaaaaaaaaaaaaaaaaaa")
    console.log(editAddOption,"editaddoptions")
    inputType[formIndex.editDataIndex]={type:typeData,label:formData.label,placeHolder:formData.placeHolder,arr:updateData}
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
    if (!formIndex.delDataIndex.length)
      DeletArr.splice(formIndex.delDataIndex, 1);

    // console.log("jiii",DeletArr)
    setInputType([...DeletArr]);
  };
  console.log(formIndex.editDataIndex, "modal");
  console.log(formIndex.delDataIndex, "modal1111");
  console.log(inputType[formIndex.editDataIndex]?.arr,"llllllllllllllllllll")
const setEditData=()=>{
  // console.log(formIndex,'kk')
  // console.log(inputType[formIndex.editDataIndex],"mbvcxzasdfghjk")
  setEditAddOption([inputType[formIndex.editDataIndex]])
  // console.log(editAddOption,"qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
}
  return (
    <div>
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
            {inputType[formIndex.editDataIndex]?.arr.map((item,i)=>{
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
      </Modal>
      {input?.map((item, index) => {
        return (
          <div key={index}>
            {item?.name}
            <button
              className="p-2 border border-black"
              onClick={() => handleSubmit(item.name)}
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
                console.log(index)
                setFormIndex({ ...formIndex,editDataIndex: index });
                setTypeData(item.type)
                // setEditAddOption([inputType[formIndex?.editDataIndex]])
                setEditData()
                console.log(item, "7777777777777");
              }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setFormIndex({ delDataIndex: index });
                delModalOpen();
              }}
            >
              Delete
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default Dyanamicform;
