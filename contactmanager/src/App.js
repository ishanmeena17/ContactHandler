import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import ContactList from './Components/Contacts/ContactList/ContactList';
import EditContact from './Components/Contacts/EditContact/EditContact';
import ViewContact from './Components/Contacts/ViewContact/ViewContact';
import AddContact from './Components/Contacts/AddContact/AddContact';
import NavBar from './Components/NavComponent/NavBar';
import Spinner from './Components/Spinner/Spinner';

function App() {
  return (
    <div className="App">
      {/* <button className='btn btn-primary'><i className='fa fa-home me-2'></i>HOME</button> <br/>
      <button className='btn btn-danger my-2 '><i className='fa fa-close me-2 '></i> CLOSE</button> <br/>
      <button className='btn btn-secondary'><i className='fa fa-eye me-2 '></i> VIEW</button> <br/>
      <button className='btn btn-secondary my-2 '><i className='fa fa-plus-circle  me-2 '></i> ADD</button>  */}
      {/* <Spinner/> */}
  <NavBar/>
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Navigate to={'contacts/list'} />} />
          <Route path='/contacts/list' element={<ContactList/>} />
          <Route path='/contacts/edit/:contactId' element={<EditContact/>} />
          <Route path='/contacts/view/:contactId' element={<ViewContact/>} />
          <Route path='/contacts/add' element={<AddContact/>} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
