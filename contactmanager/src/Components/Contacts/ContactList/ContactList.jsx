import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import Spinner from '../../Spinner/Spinner'

const ContactList = () => {
  let [state, setState] = useState({
    loading: false,
    contacts: [],
    errorMessage: ""
  })

  useEffect(() => {
    let prom1 = new Promise((res, rej) => {
      setState({ ...state, loading: true, contacts: [] })
      let response = ContactServices.getAllContacts()
      res(response)
      // rej(alert("ERROR!!!"))
    })
    prom1.then((res1) => {
      setState({ ...state, loading: false, contacts: res1.data })
      console.log(res1.data);
    }).catch((error) => {
      setState({ ...state, loading: false, errorMessage: error.message })
      alert("data is not found!!!")
    })
  }, [])

  let clickDelete=(contactId)=>{
    let prom2=new Promise((res1,rej1)=>{
      let deleteResponse=ContactServices.deleteContact(contactId)
      res1(deleteResponse)
      rej1()
    })
    prom2.then((resp2)=>{
      if (resp2) {
        let prom1=new Promise((res, rej) => {
          setState({...state,loading:true,contacts:[]})
          let response=ContactServices.getAllContacts()
          res(response)
          rej()
        })
        prom1.then((resp1)=>{
          setState({...state,loading:false,contacts:resp1.data})
          console.log(resp1.data);
        }).catch((error)=>{
          setState({...state,loading:false,errorMessage:error.Message})
          alert('Data Not Found')
        })
      }
    })
  }

  let { loading, contacts, errorMessage } = state
  return (
    <div>
      <React.Fragment>
        {/* <pre>{JSON.stringify(contacts)}</pre> */}
        <section className="contact-search p-3 ">
          <div className="container">
            <div className="grid">
              <div className="row">
                <div className="col">
                  <p className='h3'>Contact Manager <Link className='btn btn-primary ms-2'
                    to={'/contacts/add'}> <i className='fa fa-plus-circle'></i> Add</Link></p>
                  <p className='fst-italic'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Aliquam dolor aut laudantium repellat impedit, quam facilis libero reiciendis itaque,
                    voluptates eius nihil eveniet error nostrum aperiam, dolorem cupiditate mollitia provident?</p>
                </div>
              </div>
            </div>
          </div>

          {/* row-2 */}
          <div className="row">
            <div className="col-md-6 ms-5  ">  {/*md->medium */}
              <form action="" className='row'>
                <div className="col-md-8">
                  <div className="mb-2">
                    <input type="text" className='form-control' placeholder='Search' />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-2">
                    <input type="submit" className='btn btn-outline-secondary  ' value={'Search'} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {
          loading ? <Spinner /> :
            <React.Fragment>
              <section className="contact-list">
                <div className="container">
                  <div className="row">

                    {
                      contacts.length > 0 &&
                      contacts.map((contact) => {
                        return (
                          <div className="col-md-6 mb-2" key={contact.id}>
                            <div className="card">
                              <div className="card-body">
                                <div className="row align-items-center ">
                                  <div className="col-md-4">
                                    <img src={contact.photo} className='imgPro' alt="" />
                                  </div>
                                  <div className="col-md-7">
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
                                    </ul>
                                  </div>
                                  <div className="col-md-1 d-flex flex-column align-items-center ">
                                    <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning'><i className='fa fa-eye'></i></Link>
                                    <Link to={`/contacts/edit/${contact.id}`} className='btn btn-primary my-2 '><i className='fa fa-pen'></i></Link>
                                    <button onClick={()=>{clickDelete(contact.id)}} className='btn btn-danger'> <i className='fa fa-trash '></i> </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </section>
            </React.Fragment>
        }
      </React.Fragment>

    </div>
  )
}

export default ContactList