import React from 'react'
const themes = {
  light: {
    color: '#000',
    backGround: '#fff'
  },
  dark: {
    color: '#fff',
    background: '#000'
  },
}

const ThemeContext = React.createContext({
  theme: themes.light,
  toggle: () => {}
})

export {
  themes,
  ThemeContext
}