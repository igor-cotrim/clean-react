import { Footer, Header, Loading } from '@/presentation/components'

import * as S from './styles'

const SurveyResult = () => {
  return (
    <S.Wrapper>
      <Header />
      <S.SurveyResultContent>
        <S.SurveyResultTitle>
          Qual é seu framework web favorito?
        </S.SurveyResultTitle>
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
        {false && <Loading />}
      </S.SurveyResultContent>
      <Footer />
    </S.Wrapper>
  )
}

export default SurveyResult
