import axios from "axios"

export class ContactServices{
    static serverURL="http://localhost:9000"
    
    static getAllContacts(){
        let dataURL =`${this.serverURL}/contacts`
        return axios.get(dataURL)
    }
    static getContact(contactId){
        let dataURL=`${this.serverURL}/contacts/${contactId}`
        return axios.get(dataURL)
    }
    static getGroups(){
        let dataURl=`${this.serverURL}/groups`
        return axios.get(dataURl);
    }
    static createContact(contact){
        let dataURl=`${this.serverURL}/contacts`
        return axios.post(dataURl,contact)
    }
    static updateContact(contact,contactId){
        let dataURL=`${this.serverURL}/contacts/${contactId}`
        return axios.put(dataURL,contact)
    }
    static deleteContact(contactId){
        let dataURL=`${this.serverURL}/contacts/${contactId}`
        return axios.delete(dataURL)
    }
}
