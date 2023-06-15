import { verifyToken } from "../services/common";

type ArgsCreateNewQuizInput = {
  data: {
    token: string;
    userAnswers: any;
  };
};

export const submitQuiz = async (_: any, args: ArgsCreateNewQuizInput) => {
  const argsData = args.data;
  const resultQuery = strapi.db.query("api::result.result");
  const tokenPayload = verifyToken(argsData.token);
  const userAnswers = argsData.userAnswers;

  const resultRes = await resultQuery.findOne({
    where: {
      id: tokenPayload.id,
      isSubmit: !true
    },
  });
  if (!resultRes) throw Error("Không tồn tại bài Quiz.");

  const questions = resultRes?.questions || [];
  const dataMapping = mappingQuestionData(questions, userAnswers);
  await resultQuery.update({
    where: { id: resultRes.id },
    data: {
      ...resultRes,
      questions: dataMapping.questions,
      score: dataMapping.score,
      isSubmit: true,
    },
  });
  return {
    score: dataMapping.score,
    totalQuestion: dataMapping.totalQuestion,
  };
};

const mappingQuestionData = (items: any[], answerItems: any) => {
  let score = 0;
  const newQuestion: any[] = [];
  items.map((item, index) => {
    const answerUser = answerItems[`question_${index}`];
    newQuestion.push({
      ...item,
      userAnswer: answerUser,
    });
    if (item.correct === answerUser) {
      score += 1;
    }
  });
  return {
    score,
    totalQuestion: items.length,
    questions: newQuestion,
  };
};
