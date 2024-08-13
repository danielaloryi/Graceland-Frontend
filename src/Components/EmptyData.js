import { CircularProgress } from '@mui/material';
import { Empty, Modal } from 'antd';
import React from 'react'

const EmptyData = ({open,onCancel}) => {
    return (
        <Modal centered width="20%" open={open} onCancel={onCancel} closable={true} footer={null}>
            <div className=' grid place-items-center'>
                <div>
                    <Empty />
                </div>
            </div>
        </Modal>
    )
}

export default EmptyData;