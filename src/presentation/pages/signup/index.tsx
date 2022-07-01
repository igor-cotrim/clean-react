/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { useHistory, Link } from 'react-router-dom'

import { Validation } from '@/presentation/protocols'
import { AddAccount } from '@/domain/usecases'
import {
  currentAccountState,
  Footer,
  LoginHeader
} from '@/presentation/components'

import { FormStatus, Input, signUpState, SubmitButton } from './components'

import * as S from './styles'

type SignUpProps = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp = ({ validation, addAccount }: SignUpProps) => {
  const resetSignUpState = useResetRecoilState(signUpState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(signUpState)
  const history = useHistory()

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    setState((old) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, formData)
    }))
    setState((old) => ({
      ...old,
      isFormInvalid:
        !!old.nameError ||
        !!old.emailError ||
        !!old.passwordError ||
        !!old.passwordConfirmationError
    }))
  }

  useEffect(() => resetSignUpState(), [])

  useEffect(() => validate('name'), [state.name])

  useEffect(() => validate('email'), [state.email])

  useEffect(() => validate('password'), [state.password])

  useEffect(
    () => validate('passwordConfirmation'),
    [state.passwordConfirmation]
  )

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }

      setState((prev) => ({ ...prev, isLoading: true }))

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      setCurrentAccount(account)

      history.replace('/')
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <S.Wrapper>
      <LoginHeader />
      <S.SignUpForm data-testid="form" onSubmit={handleSubmit}>
        <S.Subtitle>Criar Conta</S.Subtitle>
        <Input type="text" name="name" placeholder="Digite seu nome" />
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <Input
          type="password"
          name="passwordConfirmation"
          placeholder="Repita sua senha"
        />
        <SubmitButton disabled={state.isFormInvalid} type="submit">
          Cadastrar
        </SubmitButton>
        <S.LinkToLogin>
          <Link data-testid="login-link" to="/login" replace>
            Voltar Para Login
          </Link>
        </S.LinkToLogin>
        <FormStatus />
      </S.SignUpForm>
      <Footer />
    </S.Wrapper>
  )
}

export default SignUp
