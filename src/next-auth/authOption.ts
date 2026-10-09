import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions:NextAuthOptions = {
  providers: [
    // Add your authentication providers here
    Credentials({
        name:'Login',  //اللي موجود علي الزرار 
        credentials:{
       //input info
       email : {label:'Email',type:'email',placeholder:'Enter Your Email'},
        password : {label:'Password',type:'password',placeholder:'Enter Your Password'}
    },
      async  authorize (credentials){

      //call api, navigate Home page when Login success ,error => error page
      const response = await fetch(`${process.env.API}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email:credentials?.email,
      password:credentials?.password
    }),
    })
      
       if (!response.ok) {
         throw new Error(response.statusText);
        
        }

        const payload = await response.json();
        const userData:{id:string}= jwtDecode(payload.token)

        //user obj, token =>access token
        console.log("payload", payload);

        return {
          id: userData.id,
          token: payload.token,
          name: payload.user.name,
          email: payload.user.email, 
        };
          
        
    }
    })
    ],
    //user login , user refresh ,getSession
    callbacks: {
      //token obj data => 
      //user obj authorize
      async jwt({ token, user }) {
        //لما يكون فيه user 
        if (user) {
          token.id = user.id;
          token.token = user.token; //access token
          token.name = user.name;
          token.email = user.email;
        }
        return token;
      },
      session({ session, token }) {
        if (token) {
          session.user.id = token.id ;
         
        }
        return session;
      }
      },
  pages: {
    signIn: '/Login', // Specify the custom login page route
    
  }
}