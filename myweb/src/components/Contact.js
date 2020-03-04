import React,{useState,useEffect} from 'react'

const Contact = () => {
    const[contact,setContact] = useState({
        name:'',
        email:'',
        body:''
    })

    console.log(contact)
    return (

        <div className='row bg-warning'>
         <div className='col-md'>
           <h1 style={{justifyContent:'center'}}>Hellow</h1>
        </div>
        <div className=' col-md card my-2  text-dark' style={{padding:'5%'}}>
            <form >
            <div class="form-group">
                    <label >Username</label>
                    <input 
                    type="text" 
                    class="form-control" 
                    name='name'
                    value={contact.name}
                    onChange={(e)=>{setContact({...contact,name:e.target.value})}}
                    />
                </div>
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input 
                    type="email"
                    class="form-control" 
                    name='email'
                    value={contact.email}
                    onChange={(e)=>{setContact({...contact,email:e.target.value})}} 
                     />
                </div>
            
            
            <div className='form-group'>
                    <textarea rows='4'  
                    className='form-control' 
                    style={{width:'100%'}}
                    name='body'
                    value={contact.body}
                    onChange={(e)=>{setContact({...contact,body:e.target.value})}}
                    >

                    </textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
                    </div>
       
        
        </div>
    )
}

export default Contact
