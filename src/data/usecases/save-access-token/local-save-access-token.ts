import { SaveAccessToken } from '@/domain/usecases'
import { UnexpectedError } from '@/domain/errors'
import { SetStorage } from '@/data/protocols/cache'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    if (!accessToken) {
      throw new UnexpectedError()
    }

    await this.setStorage.set('accessToken', accessToken)
  }
}
