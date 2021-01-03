const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const cors = require("cors");
const config = require("../config/auth.config");
const jwToken = require("jsonwebtoken");
const schema = require('./schema');
const countriesController = require("../controllers/countries.controller");
const usersController = require("../controllers/users.controller");
const authControler = require('../controllers/auth.controller');

// userHandler mocks out a simple ORM
const userHandler = {
  getUser(code) {
    return usersController.users(code)
    .then(res=>res)
    .catch(err=>{
      console.log("THE ERROR FROM DB IS", err);
      return err
    });;
  },
  getCountry(code) {
    return countriesController.countries(code)
    .then(res=>res)
    .catch(err=>{
      console.log("THE ERROR FROM COUNTRY IS", err);
      return err
    });
  },
  signInUser(data) {
    return authControler.signin(data)
    .then(res=>res)
    .catch(err=>{
      console.log("THE ERROR FROM LOGGED IN USER IS", err);
      return err
    });
  }
}

const getErrorCode = errorName => {
  return errorType[errorName]
}
const rootResolver = {
    country: async args => {
      const country_code = args.id;
      // Grab user/country from DB
      const user = await userHandler.getUser(country_code);
      const country = await userHandler.getCountry(country_code);
      // return the schema based signature
      return {
        name: country,
        user: user
      }
    },
    login: async (args, context) => {
      const { request, response } = context;
      
      const info = await userHandler.signInUser(args);

      if (info.error) {
        throw new Error(errorName.PASSWORD_MISMATCH);
      } 
      const finalResponse = info.error ? info : { 
        full_name: info.full_name, 
        country_code: info.country_code
      }
      const token = jwToken.sign({ id: info.id }, config.secret);
      const options = {
        maxAge: 1000 * 60 * 15 , //expires in 15 minutes
        httpOnly: true, // client can't get cookie by script
        secure: false, // only transfer over http
        sameSite: true, // only sent for requests to the same FQDN as the domain in the cookie
      }
      // Setting the cookie by the name of token in response headers which secure API end points will expect
      // in authorization header of subsequent requests.
      request.res.cookie('token', token, options);
      return finalResponse;
    }
  };

const app = express();

// not having cors enabled will cause an access control error
app.use(cors());
// app.use("/graphql", function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });
// app.use(bodyParser.json());

// Wrapping graphql middleware in a funtion to get access to req and res objects 
// which can be passed down as a context to set and check cookies in resolvers.
app.use('/graphql', (req, res) => { graphqlHTTP({
    schema: schema,
    context: { 
      request: req, 
      response: res
    },
    rootValue: rootResolver,
    graphiql: true,
  })(req, res)
});

app.listen(4000);
console.log('GraphQL server listening at localhost:4000/graphql');
              
