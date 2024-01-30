import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import Spinner from '../../Spinner/Spinner'

const ViewContact = () => {
  let{contactId}=useParams()
  let[state,setState]=useState({
    loading:false,
    contact:{},
    errorMessage:""
  })

  useEffect(()=>{
      setState({...state,loading:true})
      let prom=new Promise((resolve, reject) => {
        let response=ContactServices.getContact(contactId)
        resolve(response)
        // reject("Data not available")
      })
      prom.then((res)=>{
        setState({...state,loading:false,contact:res.data})
        console.log(res.data);
      }).catch((error)=>{
          setState({...state,loading:false,errorMessage:error.message})
          alert("Not Found")
      })
  },[contactId])
  
  let{loading,contact,errorMessage}=state
  return (
    <div>
        {/* <h1>ViewContact</h1> */}
        <section className="view-contact-intro p-3 ">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className='h4 fw-bold text-warning '>View Contact</p>
                  <p className='fst-italic '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum, hic? Earum fugiat ex mollitia deleniti et, magnam quibusdam rerum cum eius, molestiae doloremque modi blanditiis asperiores nostrum praesentium a id!</p>
                </div>
              </div>
            </div>
        </section>

        {/* Section2 */}

        {
          loading?<Spinner/> :<React.Fragment>

            {
              Object.keys(contact).length>0 &&    //we can use conditonal operator  if false then we can use some animation
                                                    //as 'oops data not found'

              <section className="view-contact-data">
          <div className="container">
            {/* ROW-1 */}
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center ">
              <img src={contact.photo} alt="" className='col-md-2 ms-2' />
              </div>
            </div>
            {/* ROW-2 */}
            <div className="row my-2 d-flex justify-content-center ">
              <div className="col-md-6">

              <ul className='list-group'>
                            <li className='list-group-item list-list-group-item-action'>
                              Name: <span className='fw-bold'>{contact.name}</span>
                            </li>
                            <li className='list-group-item list-list-group-item-action'>
                              Contact: <span className='fw-bold'>{contact.contact}</span>
                            </li>
                            <li className='list-group-item list-list-group-item-action'>
                              Email: <span className='fw-bold'>{contact.email}</span>
                            </li>
                            <li className='list-group-item list-list-group-item-action'>
                              Title: <span className='fw-bold'>{contact.title}</span>
                            </li>
                            <li className='list-group-item list-list-group-item-action'>
                              Compnay: <span className='fw-bold'>{contact.company}</span>
                            </li>
                            <li className='list-group-item list-list-group-item-action'>
                              Group: <span className='fw-bold'>{contact.group}</span>
                              {/* Group: <span className='fw-bold'>{ContactServices.getGroup(contact)}</span> */}

                            </li>
                        </ul>
              </div>
            </div>

            {/* ROW-3 */}
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center ">
                <Link className='btn btn-warning ' to={'/'}>Back</Link>
              </div>
            </div>
          </div>
        </section>
            }
          </React.Fragment>
        }
        
        
    </div>
  )
}

export default ViewContact