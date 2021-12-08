import { Input, Form } from 'antd'
import { useState, forwardRef } from 'react'

const InputMessage = ({name, placeholder, callback}, ref) => {
    const [text,setText] =  useState("")
    const handleInputChange = (e) => {
        setText(e.target.value)
    }

    const handleCallback = () => {
        callback()
        setText("")
    }

    
  
    return (
        <Form.Item >
            <Input
                name={name}
                bordered={false}
                value={text}
                autoComplete="off"
                placeholder={placeholder}
                onChange={handleInputChange}
                onPressEnter={handleCallback}
                autoFocus
            />
            <input type="hidden"  value={text} ref={ref} />
        </Form.Item>
    )
}

export default forwardRef(InputMessage)
