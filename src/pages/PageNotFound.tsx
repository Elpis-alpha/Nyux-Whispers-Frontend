import styled from "styled-components"

const PageNotFound = () => {

  return (

    <PageNotFoundStyle>

      {"Seemes you've reached a dead end"}

    </PageNotFoundStyle>

  )

}

const PageNotFoundStyle = styled.div`

  padding: 2pc;
  font-weight: bold;
  line-height: 2.5pc;
  font-size: 1.5pc;
  flex: 1;
  text-align: center;
  width: 100%;
  
  ${props => props.theme.flexing()}

  ${props => props.theme.useAnimation("opacity")}

`

export default PageNotFound
