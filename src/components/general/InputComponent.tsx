import styled from "styled-components"

const InputComponent = ({ input: Input, label, valid, isValid }: { input: JSX.Element, label: string, valid?: string, isValid?: boolean }) => {

  return (

    <InputComponentStyle>

      <div className="floating-container">

        {Input}

        <label htmlFor={Input?.props?.id}>{label}</label>

      </div>

      <small className={isValid ? "good" : "bad"}>{valid ? valid : ""}</small>

    </InputComponentStyle>

  )

}

const InputComponentStyle = styled.div`
  
  width: 100%;
  padding: 1.2pc 0;

  .floating-container {
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;

    label {
      width: 100%;
      display: block;
      padding-left: .5pc;
      position: absolute;
      bottom: 0;
      left: 0; right: 0;
      width: 100%;
      z-index: 10;
      padding-bottom: .2pc;
      transition: font-size .5s, bottom .5s;
    }

    input {
      width: 100%;
      border: 0 none;
      outline: 0 none;
      border-bottom: 1px solid grey;
      padding: 0.2pc .5pc;
      z-index: 20;

      &:valid + label, &:focus + label {
        bottom: 1.5pc;
        font-size: .9pc;
      }
    }
  }

  small {
    position: absolute;
    width: 100%;
    left: 0; right: 0;
    bottom: 0.3pc;
    font-size: .7pc;
    line-height: .7pc;
    transition: color .5s;

    &.bad {
      color: red;
    }

    &.good {
      color: green;
    }
  }
`

export default InputComponent
