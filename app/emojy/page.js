"use client"
import EmojiPicker from 'emoji-picker-react'
import React from 'react'

const page = () => {
  return (
    <div>
        <EmojiPicker onEmojiClick={({emoji})=>console.log(emoji)}/>
    </div>
  )
}

export default page