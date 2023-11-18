// import logo from './logo.svg';
// import './App.css';
// import React,{useState} from 'react';

// function App() {
//   const [stdetail,stdinfo]=useState([
//     {
//       stdname:'',
//       stdage:''
      
//     },
//     {
//       stroll:'',
//       stadd:''

//     }

//   ])
//   console.log(typeof(stdetail));
//   const stddetail=(e)=>{
//     const {name,value}=e.target;
//     stdinfo((p)=>(
//       {
//         ...p,
//         [name]:value
//       }
//     ))
//   }
 
//   function stinformation(){
    
//     Object.entries(stdetail).map((x)=>console.log(x));
    
//   }

//   return (
//     <div className="App">
//       <input name='stdname' value={stdetail[1].stdname} onChange={stddetail}/>
//       <input name='stdage' value={stdetail[1].stdage} onChange={stddetail}/>
//       <input name='stroll' value={stdetail[1].stdname} onChange={stddetail}/>
//       <input name='stadd' value={stdetail[1].stdage} onChange={stddetail}/>
//       <button onClick={stinformation}>click</button>

      
//     </div>
//   );
// }
import React,{useRef,useEffect} from 'react';

const MyComponent = () => {
  const data = ['virat', 'msd', 'jaddu','faf','abd'];
  const nums=[100,200,300,400,500]
  const pushedarr=[]
  data.push('ashwin');


  const items = data.map((item, index) => (
    <li>{index}{item}</li>
  ));
data.forEach((v,i)=>
  { pushedarr.push(
    
      <div>{(i+1)*100}{"-"}{v}</div>)
    });
    const flitereddata=nums.filter(x=>x>200);
    const flitereddata1=data.filter(x=>x.includes('i'));
    nums.unshift(600,700);
    nums.shift();
    const splicedData=nums.splice(1,3,800);
    const slicedData=nums.slice(0,2);
    const changeBackground=useRef();
    const color=['red','green','lightgreen','purple','blue']
  useEffect(() => {
    // const e=document.getElementById("bg");
    const element=changeBackground.current;
    if(element){
    const randNum=rand();
    element.style.backgroundColor=color[randNum];
    }

  },[]);
  function rand(){
    return 2;
  }
  

  return (
    <div id="#bg">
      <h1>Map Method</h1>
      <ul>{items}</ul>
      <h1>forEach</h1>
      <ul>{pushedarr}</ul>
      <h1>filter</h1>
      <ul>{flitereddata}</ul>
      <h1>filter</h1>
      <ul>{flitereddata1}</ul>
      <h1>unshift</h1>
      <ul>{nums}</ul>
      <h1>Splices</h1>
      <div>{splicedData}</div>
      <h1>slice</h1>
      <div>{slicedData}</div>
      <button onClick={changeBackground}>Click For Background color</button>

    </div>
  );
};

export default MyComponent;

// export default App;
