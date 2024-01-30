import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import Spinner from '../../Spinner/Spinner'
const EditContact = () => {
  let navigate=useNavigate()
    let {contactId}=useParams()
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
      let prom1=new Promise((res1,rej1)=>{
        setState({...state,loading:true})
        let response=ContactServices.getContact(contactId)
        res1(response)

      })
      prom1.then((resp1)=>{
        console.log(resp1.data);
          setState({...state,loading:false,contact:resp1.data})
          return new Promise((res2,rej2)=>{
              let groupResponse=ContactServices.getGroups()
                res2(groupResponse)
          }).then((resp2)=>{
            setState({...state,loading:false,contact:resp1.data,groups:resp2.data})
            console.log(resp2.data);
          })
      })
    },[contactId])
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
        let postContact=ContactServices.updateContact(state.contact,contactId)
        res(postContact)
      })
      prom1.then((resp1)=>{
        if (resp1) {
          // setState({...state,contact:resp1.data})
          navigate('/contacts/list',{replace:true})
        } 
      }).catch(()=>{
        
          navigate(`/contacts/edit/${contactId}`,{replace:false})
        
        alert("Data not submitted")
      })
  }
    let{loading,contact,groups,errorMessage}=state
   return (
    <div>
    <pre>{JSON.stringify(contact)}</pre>
    <pre>{JSON.stringify(groups)}</pre>
        {/* <h1>EditContact</h1> */}
        {
          loading?<Spinner/>:<React.Fragment>
                 <section className='create-contact p-3'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">EDIT CONTACT</p>
              <p className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut voluptatem sit eveniet illo nihil sunt corrupti repellat laboriosam est id culpa soluta similique laudantium doloremque veniam, officiis optio magnam odit!</p>
            </div>
          </div>
       {/* --row-2-- */}

       
        
        <div className="row">
            <div className="col-md-4">
              <form action=""  onSubmit={submitForm}>
                <div className="mb-2">
                  <input type="text"  className='form-control' name="name" value={contact.name} onChange={updateInput} placeholder='Name' />
                </div>
                <div className="mb-2">
                  <input type="text"  className='form-control' name="photo" value={contact.phot} onChange={updateInput} placeholder='Photo Url' />
                </div>
                <div className="mb-2">
                  <input type="number" className='form-control' name="contact" value={contact.contact} required={true} onChange={updateInput} placeholder='Mobile Number'/>
                  </div>
                <div className="mb-2">
                  <input type="email"  className='form-control' name="email" value={contact.email} onChange={updateInput} placeholder='Email' />
                </div>
                <div className="mb-2">
                  <input type="text"  className='form-control' name="title" value={contact.title} onChange={updateInput} placeholder='Title' />
                </div>
                <div className="mb-2">
                  <input type="text" className='form-control' name="company" value={contact.company} onChange={updateInput} placeholder='Company' />
                </div>
                <div className="mb-2">
                  <select  id="" className='form-control' name="groups" value={groups.id}>
                    <option value="">Select A Group</option>
                      {
                        groups.length>0 &&
                        groups.map((group)=>{
                            return(
                              <option key={group.id} value={group.id}>{group.name}</option>
                            )
                        })
                      }
                  </select>
                </div>
                <div className="mb-2">
                  <input type="submit" value="Edit" className='btn btn-primary'/>
                  <Link to={'/'} className='btn btn-danger ms-2'>Cancel</Link>
                </div>  
              </form>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <img src={contact.photo} alt="" id='imgPro' className='col-md-5 ms-5' />
              </div>
           </div>
       
         {/*upto */}
        </div>
      </section>

          </React.Fragment>
        }
       
    </div>
  )
}

export default EditContact