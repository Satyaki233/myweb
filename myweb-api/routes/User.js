const Joi= require('@hapi/joi')



const handelContactsPost =(req,res,knex)=>{
    // const {name,email,body} = req.body;
    const schema = Joi.object().keys({
        name:Joi.string().min(4).required(),
        email:Joi.string().min(6).required().email(),
        body:Joi.string()
      
    });
   
    console.log(req.body)
    const {error}=schema.validate(req.body)

    if(error) return( 
      
        res.status(400).json(error))
    else{
        knex('contact')
        .insert({
             name: req.body.name,
             email:req.body.email,
             body:req.body.body
        })
        .returning('*')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
}
    
    const handelContactsGet =(req,res,knex)=>{
        knex.raw('select * from contact')
        
        .then(data=>{
            res.status(200).json(data.rows)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
   
  


module.exports = {
    handelContactsPost: handelContactsPost,
    handelContactsGet:handelContactsGet
}