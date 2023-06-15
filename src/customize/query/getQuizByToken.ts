import { verifyToken } from "../services/common";

type ArgsGetResultByTokenInput = {
  data: {
    token: string;
  };
};
export const getResultByToken = async (
  _: any,
  args: ArgsGetResultByTokenInput
) => {
  const argsData = args.data;
  const resultQuery = strapi.db.query("api::result.result");
  const tokenPayload = verifyToken(argsData.token);
  const resultRes = await resultQuery.findOne({
    where: { id: tokenPayload.id },
    populate: ["quiz"],
  });
  if (!resultRes) throw Error("Không tồn tại bài Quiz.");
  return { ...dataResolver(resultRes) };
};

const dataResolver = (result: any) => {
  const questions = result?.questions || [];

  return {
    username: result?.username,
    quizName: result?.quiz?.name,
    questions: questions.map((item) => {
      delete item?.correct;
      return { ...item };
    }),
  };
};
