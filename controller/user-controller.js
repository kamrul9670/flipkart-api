

 


   import User from '../model/user-schema.js'

  


   export const userSignup = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if (exist) {
            return response.status(401).json({ message: 'Username already exists' });
        }

        const newUser = new User(request.body);
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id, username: newUser.username }, secretKey, { expiresIn: '1h' });

        response.status(200).json({ message: 'User registered successfully', token });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};





//    export const userSignup = async (request , response) => {

//     try {
//         // console.log(request.body);
//         // await User.deleteMany({}); 
//          const exist =  await User.findOne({ username : request.body.username });

//        if(exist)
//        {
//         return response.status(401).json({message: 'username already exist'});

//        }

//         const user = request.body;
//      const newUser = new  User(user);
//      await newUser.save();


//      response.status(200).json({message : user });

//     }  catch (error) {

//         response.status(500).json({message : error.message });

//     }
    
    
//    }


   

//    export const userLogin = async (request , response) => {
  
//            try {
            
//                  const username = request.body.username;
                 
//                  const password = request.body.password;


//              let user =    await User.findOne({username : username , password : password });

//                  if(user){
//                      return response.status(200).json({ data: user });
//                  }
//                  else{
//                     return response.status(401).json(`Invalid login`);

//                  }

//            } catch (error) {
//         response.status(500).json('Error' , error.message);
//            }


//    }



import jwt from 'jsonwebtoken';
const secretKey = '1'; // Replace with a long, randomly generated string


export const userLogin = async (request, response) => {
    try {
        const { username, password } = request.body;

        const user = await User.findOne({ username, password });

        if (!user) {
            return response.status(401).json({ message: 'Invalid username or password' });
        }
        else
        {
            const token = jwt.sign({  username: user.username }, secretKey, { expiresIn: '1h' });

            response.status(200).json({ data : user , message: 'Login successful', token });
        }

        // Generate JWT token
      
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
