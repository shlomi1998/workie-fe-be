import React from 'react'
import { EmojiIcon } from '../../../../../svg'

export default function EmojiPicker() {
  return (
    <li>
        <button className='btn dark:bg-dark_bg_2 border-0 absolute left-4' type='button'>
           <EmojiIcon className="dark:fill-dark_svg_1 bg-gray-700 "/> 
        </button>
    </li>
  )
}
