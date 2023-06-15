export const typeDefs = `
  type Mutation {
    createNewResult(data: CreateNewResultInput!): ResultResolver!
  }

  input CreateNewResultInput {
    slug: String!
    username: String!
  }

  type ResultResolver {
    token: String!
  }

  type Query {
    getResultByToken(data: GetResultByTokenInput!): ResultDetailResolver!
  }

  input GetResultByTokenInput {
    token: String!
  }

  type ResultDetailResolver {
    username: String!
    quizName: String!
    questions: JSON!
  }
`;
