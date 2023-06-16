import { typeDefs } from "./customize/typeDefs";
import { createNewResult, submitQuiz } from "./customize/mutation";
import { Strapi } from "@strapi/strapi";
import { getResultByToken } from "./customize/query";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Strapi }) {
    const extensionService = strapi.service("plugin::graphql.extension");
    extensionService.use(() => ({
      typeDefs: typeDefs,
      resolvers: {
        Mutation: {
          createNewResult: {
            resolve: createNewResult,
          },
          submitQuiz: {
            resolve: submitQuiz,
          },
        },
        Query: {
          getResultByToken: {
            resolve: getResultByToken,
          },
        },
      },
      resolversConfig: {
        "Mutation.createNewResult": {
          auth: false,
        },
        "Mutation.submitQuiz": {
          auth: false,
        },
        "Query.getResultByToken": {
          auth: false,
        },
      },
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
