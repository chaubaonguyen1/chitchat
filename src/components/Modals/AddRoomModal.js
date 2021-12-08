import {Modal, Form, Input} from 'antd'
import { useContext } from 'react'
import { AppContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider'
import { addDocument } from '../../firebase/service'


export default function AddRoomModal() {
    const {isAddRoomVisible, setIsAddRoomVisible} = useContext(AppContext)
    const user = useContext(AuthContext)
   
    const {uid} = user;
  

    const [form] = Form.useForm()
    const handleOk = () => {
        addDocument('rooms', {...form.getFieldsValue(), members: [uid]})
        setIsAddRoomVisible(false)

        //reset fields in modal
        form.resetFields()
    }

    const handleCancel = () => {
        setIsAddRoomVisible(false)
        form.resetFields()
    }
        return (
        <div>
            <Modal
                title="Create room"
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Room's name" name="name">
                        <Input placeholder="Enter room's name here"/>
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea placeholder="Enter description"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
