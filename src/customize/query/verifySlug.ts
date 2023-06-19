type ArgsVerifySlugInput = {
  data: {
    slug: string;
  };
};
export const verifySlug = async (_: any, args: ArgsVerifySlugInput) => {
  const argsData = args.data;
  const quizQuery = strapi.db.query("api::quiz.quiz");
  const quizRes = await quizQuery.findOne({
    where: { slug: argsData.slug },
    populate: ["question"],
  });
  if (!quizRes) return false;
  return true;
};
