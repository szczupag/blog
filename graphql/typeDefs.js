const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    author: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirfmPassword: String!
    email: String!
  }
  type Query{
    getPosts: [Post]
  }
  type Mutation{
    register(registerInput: RegisterInput): User!
  }
`