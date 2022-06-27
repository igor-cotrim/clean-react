import { useState } from 'react'

import { LoadSurveyResult } from '@/domain/usecases'
import {
  Calendar,
  Error,
  Footer,
  Header,
  Loading
} from '@/presentation/components'

import * as S from './styles'

const SurveyResult = () => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  return (
    <S.Wrapper>
      <Header />
      <S.SurveyResultContent data-testid="survey-result">
        {state.surveyResult && (
          <>
            <S.SurveyTitleContainer>
              <Calendar date={new Date()} className="calendar" />
              <S.SurveyResultTitle>
                Qual é seu framework web favorito?
              </S.SurveyResultTitle>
            </S.SurveyTitleContainer>
            <S.SurveyResultList>
              <S.SurveyResultLi>
                <S.SurveyResultImg src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <S.SurveyResultAnswer>ReactJS</S.SurveyResultAnswer>
                <S.SurveyResultPercent>50%</S.SurveyResultPercent>
              </S.SurveyResultLi>
              <S.SurveyResultLi>
                <S.SurveyResultImg src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <S.SurveyResultAnswer>ReactJS</S.SurveyResultAnswer>
                <S.SurveyResultPercent>50%</S.SurveyResultPercent>
              </S.SurveyResultLi>
              <S.SurveyResultLi className="active">
                <S.SurveyResultImg src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <S.SurveyResultAnswer>ReactJS</S.SurveyResultAnswer>
                <S.SurveyResultPercent>50%</S.SurveyResultPercent>
              </S.SurveyResultLi>
            </S.SurveyResultList>
            <S.SurveyResultButton>Voltar</S.SurveyResultButton>
          </>
        )}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => ({})} />}
      </S.SurveyResultContent>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyResult
