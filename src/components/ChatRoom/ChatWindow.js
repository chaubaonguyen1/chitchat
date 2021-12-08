//24:08
import { UserAddOutlined } from '@ant-design/icons'
import { Avatar, Tooltip, Button, Form, Input, Alert } from 'antd'
import {useContext, useState, useMemo, useRef, useEffect} from 'react'
import styled from 'styled-components'
import Message from './Message'
import { AppContext } from '../../Context/AppProvider'
import { addDocument } from '../../firebase/service'
import { AuthContext } from '../../Context/AuthProvider'
import useFirestore from '../../hooks/useFirestore'
import InputMessage from './InputMessage'
import ReactDOM from 'react-dom';
const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rbg(230, 230, 230);

    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        &__title {
            margin: 0;
            font-weight: bold;
        }
        &__description {
            font-size: 12px;
        }
    }
`
const WrapperStyled = styled.div`
    height: 100vh;
`

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`
const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`




const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`

export default function ChatWindow() {
    const {selectedRoom, members, setIsInviteMemberVisible} = useContext(AppContext)
    // const [messages,setMessages] = useState([])

    const user = useContext(AuthContext)

    const {uid, photoURL, displayName} = user

    const [form] = Form.useForm()

   
   const inputValue =  useRef()

    const handleOnSubmit = () => {
        addDocument('messages', {
            text: inputValue.current.value,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        })
        form.resetFields(['messages'])
    }

    const condition= useMemo(() => ({
       fieldName: 'roomId',
       operator: '==',
       value: selectedRoom.id
    }), [selectedRoom.id])

  

    const messages = useFirestore('messages', condition) 

    const scrollRef = useRef()
   
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

    return (
        <WrapperStyled>
            {
                selectedRoom.id ? (
                    <>
                        <WrapperStyled>
            <HeaderStyled>
                <div className="header__info">
                    <p className="header__title">{selectedRoom.name}</p>
                    <span className="header__description">{selectedRoom.description}</span>
                </div>
                <ButtonGroupStyled>
                    <Button
                     onClick={() => setIsInviteMemberVisible(true)}
                        icon={<UserAddOutlined type="text"
                       
                    />}>
                        Invite
                    </Button>
                    <Avatar.Group size="small" maxCount={2}>
                        {members.map(member =>
                            <Tooltip title={member.displayName} key={member.id}>
                            <Avatar
                             src={member.photoURL}
                             >
                                 {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}
                             </Avatar>
                            </Tooltip>)
                        }
                    </Avatar.Group>
                </ButtonGroupStyled>
            </HeaderStyled>
            <ContentStyled>
                <MessageListStyled>
                    {
                        messages.map(mes => 
                            <div ref={scrollRef}>

                                <Message
                                    key={mes.id} 
                                    text={mes.text}
                                    photoURL={mes.photoURL}
                                    displayName={mes.displayName}
                                    createdAt={mes.createdAt}
                                />
                            </div>
                                )
                    }
                </MessageListStyled>
                <FormStyled form={form}>
                 <InputMessage  name="message" ref={inputValue} callback={handleOnSubmit}  placeholder="Enter message" />
                    <Button type="primary" onClick={handleOnSubmit}>Send</Button>
                </FormStyled>
            </ContentStyled>
        </WrapperStyled>
                    </>
                ) : <Alert 
                        message="please choose a room" 
                        type="info" 
                        showIcon 
                        style={{margin: 5}}
                        closable
                    />
            }
            
        </WrapperStyled>
    )
}