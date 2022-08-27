export const findElement = (tag: string) => {

  return document.querySelector(tag)

}

export const findElements = (tag: string) => {

  return Array.from(document.querySelectorAll(tag))

}

export const findBy = (element: HTMLElement, tag: string) => {

  return element.querySelector(tag)

}

export const findsBy = (element: HTMLElement, tag: string) => {

  return Array.from(element.querySelectorAll(tag))

}

export const addClass = (element: HTMLElement, clas: string) => {

  const classList = clas.split(" ")

  classList.forEach(item => {

    element.classList.add(item)

  })

}

export const toggleClass = (element: HTMLElement, clas: string) => {

  if (element.classList.contains(clas)) {
    removeClass(element, clas)
  } else {
    addClass(element, clas)
  }

}

export const stateClass = (state: any, className: string, equal?: any) => {

  className = " " + className + " "

  if (equal) {

    return state === equal ? className : ""

  } else {

    return state ? className : ""
  }

}

export const createElement = (emmet: string, innerContent: string) => {

  let info1 = emmet.split(".")

  const returnValue = document.createElement(info1[0])

  info1.forEach((item, index) => {

    if (index > 0) {

      item.split('#').forEach((item, index) => {

        if (index === 0) {

          addClass(returnValue, item)

        } else {

          returnValue.id = item

        }

      })

    }

  })

  innerContent = innerContent === undefined ? '' : innerContent

  returnValue.innerHTML = innerContent

  return returnValue

}

export const toggleWithDocument = (clicker: HTMLElement, element: HTMLElement, clas: string) => {

  clicker.addEventListener('click', (e) => {

    const theFunc = function () {

      removeClass(element, clas)

      document.removeEventListener('click', theFunc)

    }

    if (element.classList.contains(clas)) {

      theFunc()

    } else {

      addClass(element, clas)

      setTimeout(() => {

        document.addEventListener('click', theFunc)

      }, 10);

    }

  })

}

export const removeClass = (element: HTMLElement, clas: string) => {
  element.classList.remove(clas)
}

export const dragElement = (elmnt: HTMLElement) => {

  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (findElement(elmnt.id + "-dragger")) {

    // if present, the header is where you move the DIV from:

    // @ts-ignore
    findElement(elmnt.id + "-dragger").style.cursor = 'move'

    // @ts-ignore
    findElement(elmnt.id + "-dragger").onmousedown = dragMouseDown;

  } else {

    // otherwise, move the DIV from anywhere inside the DIV:

    elmnt.style.cursor = 'move'

    elmnt.onmousedown = dragMouseDown;

  }

  function dragMouseDown(e: Event) {

    e = e || window.event;

    e.preventDefault();

    // get the mouse cursor position at startup:

    // @ts-ignore
    pos3 = e.clientX;

    // @ts-ignore
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;

    // call a function whenever the cursor moves:

    document.onmousemove = elementDrag;

  }

  function elementDrag(e: Event) {

    e = e || window.event;

    e.preventDefault();

    // calculate the new cursor position:

    // @ts-ignore
    pos1 = pos3 - e.clientX;

    // @ts-ignore
    pos2 = pos4 - e.clientY;

    // @ts-ignore
    pos3 = e.clientX;

    // @ts-ignore
    pos4 = e.clientY;

    // set the element's new position:

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";

    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

  }

  function closeDragElement() {

    // stop moving when mouse button is released:

    document.onmouseup = null;

    document.onmousemove = null;

  }

  // It modifies only top and left values

}

