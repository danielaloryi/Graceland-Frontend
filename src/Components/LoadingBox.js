import { CircularProgress } from '@mui/material';
import { Modal } from 'antd';
import React from 'react'

const LoadingBox = ({ loadingMessage, open, onCancel }) => {
    return (
        <Modal centered width="13%" open={open} onCancel={onCancel} closable={false} footer={null}>
            <div className=' grid place-items-center'>
                <div>
                    <div className=' grid place-items-center'>
                        <CircularProgress size={40} style={{ color: "#122E76" }} />
                    </div>
                    <h1 className=' text-center pt-2'>{loadingMessage}</h1>
                </div>
            </div>
        </Modal>
    )
}

export default LoadingBox;