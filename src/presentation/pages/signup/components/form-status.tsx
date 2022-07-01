import { useRecoilValue } from 'recoil'

import { FormStatusBase } from '@/presentation/components'

import { signUpState } from './atoms'

const FormStatus = () => {
  const { isLoading, mainError } = useRecoilValue(signUpState)

  return <FormStatusBase isLoading={isLoading} mainError={mainError} />
}

export default FormStatus
