export default {
  grid: {
    container: '130rem',
    gutter: '3.2rem'
  },
  border: {
    radius: '0.5rem'
  },
  font: {
    family: 'Poppins, sans-serif',
    weight: {
      light: 300,
      normal: 400,
      bold: 600
    },
    sizes: {
      xxxsmall: '0.8rem',
      xxsmall: '1rem',
      xsmall: '1.2rem',
      small: '1.4rem',
      medium: '1.6rem',
      large: '1.8rem',
      xlarge: '2.0rem',
      xxlarge: '2.8rem',
      huge: '5.2rem'
    }
  },
  colors: {
    mainBg: '#f2f2f2',
    white: '#fff',
    gray: '#666',
    grayLight: '#ccc',
    black: '#000',
    primary: '#880e4f',
    primaryDark: '#560027',
    primaryLight: '#bc477b',
    green: '#4caf50',
    red: '#ef5350'
  },
  spacings: {
    xxsmall: '0.8rem',
    xsmall: '1.6rem',
    small: '2.4rem',
    medium: '3.2rem',
    large: '4.0rem',
    xlarge: '4.8rem',
    xxlarge: '5.6rem'
  },
  transition: {
    default: '0.3s ease-in-out',
    fast: '0.1s ease-in-out'
  }
} as const
