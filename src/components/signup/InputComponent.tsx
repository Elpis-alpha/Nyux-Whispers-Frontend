import React from "react"
import styled from "styled-components"


interface MyType {

  id: string

  type: "text" | "email" | "password"

  label: string

  readOnly?: boolean

  value: string

  valid?: string

  inputClass?: string

  setValue: Function

}

const InputComponent = ({ id, type, label, readOnly, value, setValue, valid, inputClass }: MyType) => {

  const focusHandler = (e: any) => {

    e.currentTarget.parentElement.classList.add('focused')

  }

  const blurHandler = (e: any) => {

    const input = e.currentTarget

    const inputValue = input.value

    if (inputValue === "") {

      input.classList.remove('filled');

      input.parentElement.classList.remove('focused');

    } else {

      input.classList.add('filled');

    }

  }

  return (

    <InputComponentStyle>

      <div className="form-group">

        <label className="form-label" htmlFor={id}>{label}</label>

        <input id={id} name={id} autoCapitalize={id}

          className={["form-input", (!valid ? "valid" : "invalid"), inputClass].join(' ')} 
          
          type={type} onFocus={focusHandler}

          onBlur={blurHandler} readOnly={readOnly ? readOnly : false}

          value={value} onInput={e => setValue(e.currentTarget.value)}

        />

      </div>

    </InputComponentStyle>

  )

}

const InputComponentStyle = styled.div`
  
  .form-group {
    position:relative;  

    & + .form-group {
      margin-top: 30px;
    }
  }

  .form-label {
    position: absolute;
    left: 0;
    top: 10px;
    color: ${props => props.theme.rgbaOpp(.7)};
    z-index: 10;
    transition: transform 150ms ease-out, font-size 150ms ease-out;
  }

  .focused .form-label {
    transform: translateY(-125%);
    font-size: .75em;
  }

  .form-input {
    position: relative;
    padding: .3pc .5pc;
    width: 100%;
    outline: 0 none;
    border: 0 none;
    box-shadow: 0 1px 0 0 ${props => props.theme.col};
    transition: box-shadow 150ms ease-out;
    
    &:focus {
      box-shadow: 0 2px 0 0 blue;
    }
  }

  .form-input.filled {
    box-shadow: 0 2px 0 0 lightgreen;
  }

`

export default React.memo(InputComponent)