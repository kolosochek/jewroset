export const getStaticPath = () => {
  return `${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_SERVER_PORT ? ':'+process.env.REACT_APP_SERVER_PORT : ''}`
}