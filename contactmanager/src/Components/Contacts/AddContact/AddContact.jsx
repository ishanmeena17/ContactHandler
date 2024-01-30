import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'

const AddContact = () => {
  let navigate=useNavigate()

  let[state,setState]=useState({
    loading:false,
    contact:{
      name:"",
      photo:"",
      contact:"",
      email:"",
      title:"",
      company:"",
      group:''
    },
    groups:[],
    errorMessage:''
  })
  useEffect(()=>{
    let prom=new Promise((res,rej)=>{
      setState({...state,loading:true})
      let groupResonse=ContactServices.getGroups()
      res(groupResonse)
      rej()
    })
    prom.then((resp1)=>{

      setState({...state,loading:false,groups:resp1.data})
      console.log(resp1.data);
    }).catch((error)=>{
      // setState({...state,loading:false,errorMessage:error})
      alert("Data not found")
    })
  },[])

  let updateInput=(event)=>{
    setState({
      ...state,contact:{
        ...state.contact,
        [event.target.name]:event.target.value            //name is attribute of input field
      }
    })
  }
  
let submitForm=(event)=>{
    event.preventDefault();
    let prom1=new Promise((res,rej)=>{
      let postContact=ContactServices.createContact(state.contact)
      res(postContact)
    })
    prom1.then((resp1)=>{
      if (resp1) {
        setState({...state,contact:resp1.data})
        navigate('/contacts/list',{replace:true})
      } else {
        navigate('/contacts/add',{replace:false})
      }
    }).catch(()=>{
      alert("Data not submitted")
    })
}

  let{loading,contact,groups,errorMessage}=state
  return (
    <div>
      <pre>{JSON.stringify(contact)}</pre>
      <pre>{JSON.stringify(groups)}</pre>
        {/* <h1>AddContact</h1> */}
        <section className='create-contact p-3'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">CREATE CONTACT</p>
              <p className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut voluptatem sit eveniet illo nihil sunt corrupti repellat laboriosam est id culpa soluta similique laudantium doloremque veniam, officiis optio magnam odit!</p>
            </div>
          </div>
           {/* --row-2-- */}
           <div className="row">
            <div className="col-md-4">
              
              <form action="" onSubmit={submitForm}>
                <div className="mb-2">
                  <input type="text" className='form-control' onChange={updateInput} placeholder='Name' name="name" value={contact.name} required={true}/>
                </div>
                <div className="mb-2">
                  <input type="text" className='form-control' onChange={updateInput} placeholder='Photo Url' name='photo' value={contact.photo}/>
                </div>
                <div className="mb-2">
                  <input type="tel" className='form-control' onChange={updateInput} placeholder='Mobile Number' 
                  name='contact' value={contact.contact} required={true} pattern='{0-9]{10}'/>
                  </div>
                <div className="mb-2">
                  <input type="email" className='form-control' onChange={updateInput} placeholder='Email' name='email' value={contact.email}/>
                </div>
                <div className="mb-2">
                  <input type="text" className='form-control' onChange={updateInput} placeholder='Title' name='title' value={contact.title} />
                </div>
                <div className="mb-2">
                  <input type="text" className='form-control' onChange={updateInput} placeholder='Company' name='company' value={contact.company}/>
                </div>
                <div className="mb-2">
                  <select name="" id="" className='form-control' required={true}>
                    <option value="">Select A Group</option>
                    {
                      groups.length>0 &&
                      groups.map((group)=>{
                        return(
                          <option key={group.id} value={group.id} >{group.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="mb-2">
                  <input type="submit" value="Create" className='btn btn-success'/>
                  <Link to={'/'} className='btn btn-danger ms-2'>Cancel</Link>
                </div>  
              </form>
              </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AddContact