import { faker } from '@faker-js/faker'

import { RemoteLoadSurveyResult } from '@/data/usecases'

export const mockRemoteSurveyResultModel =
  (): RemoteLoadSurveyResult.Model => ({
    question: faker.random.words(10),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.word(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(),
        isCurrentAccountAnswer: faker.datatype.boolean()
      },
      {
        answer: faker.random.word(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(),
        isCurrentAccountAnswer: faker.datatype.boolean()
      }
    ],
    date: faker.date.recent().toISOString()
  })
