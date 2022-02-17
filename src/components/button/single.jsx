import React from 'react';
import { Button, Tooltip } from 'antd';

const Single = props => {
    const { selected, description, content, onClick } = props

    const onMouseDown = (event) => {
        event.preventDefault();

        onClick()
    }

    return (
        <Tooltip title={description}>
            <Button
                size="small"
                type={selected ? 'primary' : 'default'}
                onMouseDown={event => onMouseDown(event)}
                style={{ marginLeft: '2px', marginRight: '2px' }}
            >
                {content}
            </Button>
        </Tooltip>
    )
}

export default Single