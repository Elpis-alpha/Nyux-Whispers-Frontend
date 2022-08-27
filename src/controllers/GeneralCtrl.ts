import { capitalize } from './SpecialCtrl'


export const processCookies = () => { }

export const reterieveSectionName = (str: string) => {

  return capitalize(str.replace('section:', ''))

}

export const numberOfAllItemsInCart = (cartItem: any) => {

  let finalNumb = 0

  if (!cartItem.items) return finalNumb

  cartItem.items.forEach((item: any) => finalNumb += item.quantity)

  return finalNumb

}

