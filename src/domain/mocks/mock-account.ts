import { faker } from '@faker-js/faker'

import { AddAccount } from '@/domain/usecases'

export const mockAccountModel = (): AddAccount.Model => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})
