
  

    


      import express from 'express';
      
    import dotenv from 'dotenv';

      import cors from 'cors';

       import bodyParser from 'body-parser';


       import Connection from './database/db.js';

         import DefaultData from './default.js';

    import Router  from './routes/route.js' ;

        const app = express();
            
   dotenv.config();
       
      app.use(cors(

            // {
            //   origin : [""] ,
            //   methods :  ["POST" , "GET" ] ,
            //   credentials : true
            // }

      ));

      // app.get("/" , (req , res) =>  {
      //   res.json("Sucessfully deploy Server");
      // })

      app.use(bodyParser.json({extended : true }))
      app.use(bodyParser.urlencoded({extended : true }))
     app.use('/' , Router);

        const PORT = process.env.PORT || 8000;
     const USERNAME = process.env.DB_USERNAME;
     const PASSWORD = process.env.DB_PASSWORD;

     Connection(USERNAME,PASSWORD);

        app.listen(PORT, () => {
          
          console.log(`Server is running successfully on Port ${PORT}`)});

         DefaultData();
