
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Country {
    name: String
    user: User
  }  

  type User {
    id: Int
    full_name: String
    country_code: Int
  }
  
  type Query {
    country(id: Int!): Country
  }

  type Mutation {
    login(email: String!, password: String!): User!
  }
`);