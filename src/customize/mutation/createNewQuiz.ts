import { genToken } from "../services/common";

type ArgsCreateNewQuizInput = {
  data: {
    slug: string;
    username: string;
  };
};

export const createNewResult = async (_: any, args: ArgsCreateNewQuizInput) => {
  const argsData = args.data;
  const quizQuery = strapi.db.query("api::quiz.quiz");
  const resultQuery = strapi.db.query("api::result.result");

  const quizRes = await quizQuery.findOne({
    where: { slug: argsData.slug },
    populate: ["question"],
  });
  if (!quizRes) throw Error("Bài test không tồn tại.");
  const quizQuestions = quizRes?.question?.content || [];
  const numberOfQuestion = quizRes.questionNumber;
  const quizId = quizRes.id;
  const newQuestion = getRandomQuestion(quizQuestions, numberOfQuestion);

  const res = await resultQuery.create({
    data: {
      username: argsData.username,
      quiz: quizId,
      questions: [...newQuestion],
    },
  });
  const token = genToken({ id: res.id });
  return { token: token };
};

function getRandomQuestion(arr: any[], quantity: number) {
  const selectedElements = [];
  const selectedIndices = new Set();

  while (
    selectedElements.length < quantity &&
    selectedIndices.size < arr.length
  ) {
    const randomIndex = Math.floor(Math.random() * arr.length);

    if (!selectedIndices.has(randomIndex)) {
      selectedElements.push(arr[randomIndex]);
      selectedIndices.add(randomIndex);
    }
  }

  return selectedElements;
}


export const getScore = () => {};
