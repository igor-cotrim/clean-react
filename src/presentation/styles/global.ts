import {
  createGlobalStyle,
  css,
  DefaultTheme,
  GlobalStyleComponent
} from 'styled-components'

type GlobalStylesProps = any

export const GlobalStyle: GlobalStyleComponent<
  GlobalStylesProps,
  DefaultTheme
> = createGlobalStyle`
  ${({ theme }) => css`
    *,
    ::after,
    ::before {
      box-sizing: border-box;
      outline: none;
    }

    html {
      line-height: 1.15;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      -ms-overflow-style: scrollbar;
      -webkit-tap-highlight-color: transparent;
      scroll-behavior: smooth;
    }

    article,
    aside,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    main,
    nav,
    section {
      display: block;
    }

    button {
      border: none;
      font-family: ${theme.font.family};
    }

    body {
      padding: 0;
      margin: 0;
      font-size: 16px;
      line-height: 1.35;
      background: ${theme.colors.mainBg};
      color: ${theme.colors.black};
    }

    body,
    input,
    textarea {
      font-family: ${theme.font.family};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: ${theme.font.family};
      margin-top: 0;
      margin-bottom: 0;
      font-weight: bold;
    }
  `}
`
