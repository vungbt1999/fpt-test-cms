export const typeDefs = `
  type Mutation {
    createNewResult(data: CreateNewResultInput!): ResultResolver!
    submitQuiz(data: SubmitQuizInput!): SubmitQuizResolver!
  }

  input CreateNewResultInput {
    slug: String!
    username: String!
  }

  input SubmitQuizInput {
    token: String!
    userAnswers: JSON!
  }

  type ResultResolver {
    token: String!
  }

  type SubmitQuizResolver {
    score: Int!
    totalQuestion: Int!
  }

  type Query {
    getResultByToken(data: GetResultByTokenInput!): ResultDetailResolver!
    verifySlug(data: VerifySlugInput!): Boolean!
  }

  input GetResultByTokenInput {
    token: String!
  }

  type ResultDetailResolver {
    username: String!
    quizName: String!
    questions: JSON!
  }

  input VerifySlugInput {
    slug: String!
  }
`;
