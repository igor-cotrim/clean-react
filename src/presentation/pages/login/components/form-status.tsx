import { useRecoilValue } from 'recoil'

import { FormStatusBase } from '@/presentation/components'

import { loginState } from './atoms'

const FormStatus = () => {
  const { isLoading, mainError } = useRecoilValue(loginState)

  return <FormStatusBase isLoading={isLoading} mainError={mainError} />
}

export default FormStatus
