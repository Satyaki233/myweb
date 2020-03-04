const Joi= require('@hapi/joi')
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');



/// S3 setup.........................
const s3 = new aws.S3({
    accessKeyId: process.env.KeyId,
    secretAccessKey: process.env.AccessKey,
    Bucket:process.env.Bucket
   });
/// Image Upload function...............

const ImageUpload = multer({
    storage:multerS3({
        s3:s3,
        bucket:process.env.Bucket,
        acl:'public-read',
        key:function(req,file,cb){
            cb(null, 'satyaki/'+ path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
        }
    }),
    limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
}).single('image')


function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    // Check mime
    const mimetype = filetypes.test( file.mimetype );if( mimetype && extname ){
     return cb( null, true );
    } else {
     cb( 'Error: Images Only!' );
    }
   }

const handelArticalPost = (req,res,knex)=>{
    const {title,intro,pg_one,pg_two,pg_three}= req.body
    
    
   

    ImageUpload( req, res, ( error ) => {
        console.log( 'requestOkokok', req.file );
        const {title,intro,pg_one,pg_two,pg_three}= req.body
		console.log( 'error', error );
		if( error ){
			// console.log( 'errors', error );
			res.json( { error: error } );
		} else {
			// If File not found
			if( req.file === undefined ){
				// console.log( 'Error: No File Selected!' );
				res.json( 'Error: No File Selected' );
			} else {
				// If Success
				const imageName = req.file.key;
				const imageLocation = req.file.location;
// Save the file name into database into profile model
                knex('artical')
                .insert({
                    title:title,
                    intro:intro,
                    imagelocation:imageLocation,
                    imagename:imageName,
                    pg_one:pg_one,
                    pg_two:pg_two,
                    pg_three:pg_three
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
	});
    
   
}

/////////////////////Multiple uploads....................

const uploadsBusinessGallery = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.Bucket,
		acl: 'public-read',
		key: function (req, file, cb) {
			cb( null, 'satyaki/'+ path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
		}
	}),
	limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
	fileFilter: function( req, file, cb ){
		checkFileType( file, cb );
	}
}).array( 'galleryImage', 4 );


const handelMultiPost= ( req, res, knex  ) => {
	uploadsBusinessGallery( req, res, ( error ) => {
        const {title,intro,pg_one,pg_two,pg_three}= req.body
		console.log( 'files', req.files );
		if( error ){
			console.log( 'errors', error );
			res.json( { error: error } );
		} else {
			// If File not found
			if( req.files === undefined ){
				console.log( 'Error: No File Selected!' );
				res.json( 'Error: No File Selected' );
			} else {
				// If Success
				let fileArray = req.files,
					fileLocation;
                const galleryImgLocationArray = [];
                const galleryImageNmae = [];
				for ( let i = 0; i < fileArray.length; i++ ) {
                    fileLocation = fileArray[ i ].location;
                    fileName = fileArray[i].key;
					console.log( 'filenm', fileLocation );
                    galleryImgLocationArray.push( fileLocation )
                    galleryImageNmae.push(fileName)
				}
				// Save the file name into database
				// res.json( {
                //     filesArray: fileArray,
                 
				// 	locationArray: galleryImgLocationArray
                // } );
                knex('multiple')
                .insert({
                    title:title,
                    intro:intro,
                    imagelocation: galleryImgLocationArray,
                    imagename: galleryImageNmae,
                    pg_one:pg_one,
                    pg_two:pg_two,
                    pg_three:pg_three
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
	});
};


const handelMultipleGet = (req,res,knex)=>{
    knex.raw('select * from multiple order by id desc')
    .then(data=>{
        res.status(200).json(data.rows)
    })
    .catch(err=>{
        res,status(400).json(err)
    })
} 



const handelMultipleDelete = (req,res,knex)=>{
   const {id } = req.params;
   console.log(id)
   knex.raw('select * from multiple where id=?',id)
   .then(data=>{
      console.log(data.rows[0].id)
      console.log(data.rows[0].imagename.length)
      for(i=0;i<data.rows[0].imagename.length;i++){
        let params = {Bucket:'satyaki-new-bucket',Key:data.rows[0].imagename[i]}
        s3.deleteObject(params,function(err,data){
            if(err){
                res.status(400).json(err)
            }
            else{
               console.log('deleted successfully')
               
            }
        })
      }
      knex.raw('delete from multiple where id=?',data.rows[0].id)
               .then(data=>{
                      res.json('successfull')
               })
               .catch(err=>{
                   res.json('ok')
               })
   
     
   })
   .catch(err=>{
       res.json('not found')
   })
}
module.exports={
    handelArticalPost:handelArticalPost,
    handelMultipleGet:handelMultipleGet,
    handelMultipleDelete: handelMultipleDelete,
    handelMultiPost:handelMultiPost
}