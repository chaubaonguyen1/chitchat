import { Avatar, Form, Modal, Select, Spin } from 'antd'
import { debounce } from 'lodash'
import { useContext, useMemo, useState } from 'react'
import { AppContext } from '../../Context/AppProvider'
import { db } from '../../firebase/config'

function DebounceSelect({fetchOptions, debounceTimeout = 300, ...props}) {


    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState([])

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([])
            setFetching(true)

            fetchOptions(value, props.currentMembers).then(newOptions => {
                setOptions(newOptions)
                setFetching(false)
            })
        }
        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions,props.currentMembers])
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small"/> : null}
            {...props}
        >
            {options.map(option => (
                <Select.Option key={option.value} value={option.value} title={option.label}>
                    <Avatar size="small" src={option.photoURL}>
                        {option.photoURL ? '' : option.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {`${option.label}`}
                </Select.Option>
            ))}
        </Select>
    )
}

async function fetchUserList(search, currentMembers) {
    return db.collection('users')
        .where('keywords', 'array-contains', search)
        .orderBy('displayName')
        .limit(20)
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc => ({
                label: doc.data().displayName,
                value: doc.data().uid,
                photoURL: doc.data().photoURL
            })).filter(option => !currentMembers.includes(option.value))
        })
}

export default function InviteMemberModal() {
    const {isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom} = useContext(AppContext)
    const [value, setValue] = useState([])
   
   
    const [form] = Form.useForm()
    const handleOk = () => {
        setIsInviteMemberVisible(false)
        form.resetFields()
    }

    const handleCancel = () => {
        form.resetFields()
        setIsInviteMemberVisible(false)
        const roomRef = db.collection('rooms').doc(selectedRoomId)

        roomRef.update({
            members: [
                ...selectedRoom.members,
                ...value.map(val => val.value)
            ]
        })
    }

   
        return (
        <div>
            <Modal
                title="Add more members"
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        label="members' names"
                        value={value}
                        placeholder="Type member's name"
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{width: '100%'}}
                        currentMembers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    )
}//1:47:42
