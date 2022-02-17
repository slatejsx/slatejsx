import React, { useState } from 'react'
import {
  CheckSquareOutlined,
  BorderOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useFocused, useSelected, useSlate } from 'slate-react'
import { orderUse, uListUse } from './utils/list'
import {
  setChecked,
  setURL,
  setLinkTarget,
  unWrapLink,
  setStarNum,
} from './utils/node'
import { Tooltip, Input, message, Rate } from 'antd'
import isUrl from 'is-url'
import Single from '@/components/button/single'
import Select from '@/components/button/select'

const IndentationText = (props) => {
  // children 主要文本内容
  // icon 前置标志
  // offset 缩进值
  const { children, icon, offset } = props

  if (!!icon) {
    return (
      <div style={{ display: 'flex' }}>
        <div
          contentEditable={false}
          style={{
            marginLeft: `${offset * 20}px`,
            minWidth: '10px',
            textAlign: 'right',
            marginRight: '5px',
            userSelect: 'none',
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    )
  } else {
    return (
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flex: 1,
            marginLeft: `${offset * 20}px`,
          }}
        >
          {children}
        </div>
      </div>
    )
  }
}

// 基础文本格式类
const Element = React.memo((props) => {
  // 子组件
  let { children } = props

  // 基础配置
  const { element, attributes } = props
  // 文本参数
  const { title, textAlign, list, quote } = element
  // 文本额外参数
  // checked(bool): checkbox是否打勾
  // indentation(num): list的缩进配置
  const { checked, indentation, listOrder } = element
  // 转换缩进值，没有写的就是0
  const offset = indentation || 0

  const editor = useSlate()

  // 列表类型，支持checkbox、有序无序列表
  if (!!list) {
    if (list === 'checkbox') {
      // checkbox的点击事件支持
      const Checkbox = (props) => {
        const onMouseDown = (event) => {
          if (editor.readOnly) {
            return
          }

          event.preventDefault()

          setChecked(editor, element, !checked)
        }

        const Box = () => {
          return (
            <span style={{ cursor: 'pointer' }} onMouseDown={onMouseDown}>
              {!!checked ? <CheckSquareOutlined /> : <BorderOutlined />}
            </span>
          )
        }

        return (
          <IndentationText offset={offset} icon={<Box />}>
            {!!checked ? (
              <s style={{ color: '#B7BAC6' }}>{props.children}</s>
            ) : (
              props.children
            )}
          </IndentationText>
        )
      }

      children = <Checkbox>{children}</Checkbox>
    }

    if (list === 'ul') {
      children = (
        <IndentationText
          offset={offset}
          icon={<span style={{ color: '#4E61E8' }}>{uListUse(offset)}</span>}
        >
          {children}
        </IndentationText>
      )
    }

    if (list === 'ol' && !!listOrder) {
      children = (
        <IndentationText
          offset={offset}
          icon={
            <span style={{ color: '#4E61E8' }}>
              {orderUse(offset, listOrder)}.
            </span>
          }
        >
          {children}
        </IndentationText>
      )
    }
  }

  // 如果设置了标题属性
  if (!!title) {
    if (title === 'h1') {
      children = <h1 style={{ fontSize: '28px' }}>{children}</h1>
    }
    if (title === 'h2') {
      children = <h2 style={{ fontSize: '26px' }}>{children}</h2>
    }
    if (title === 'h3') {
      children = <h3 style={{ fontSize: '24px' }}>{children}</h3>
    }
    if (title === 'h4') {
      children = <h4 style={{ fontSize: '22px' }}>{children}</h4>
    }
    if (title === 'h5') {
      children = <h5 style={{ fontSize: '20px' }}>{children}</h5>
    }
  }

  // 处理缩进，list本身已经处理过缩进，不再处理。处理其他文本的
  if (!list) {
    children = <IndentationText offset={offset}>{children}</IndentationText>
  }

  // 引用处理
  if (!!quote) {
    children = (
      <div
        style={{
          padding: '0px 0 0px 10px',
          borderLeft: '1px solid #2447F5',
          color: '#A5A6A6',
        }}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      style={{ wordBreak: 'break-all', textAlign: textAlign || 'left' }}
      {...attributes}
    >
      {children}
    </div>
  )
})

const LinkElement = (props) => {
  // 基础配置
  const { element, attributes, children } = props

  const { url, target } = element

  const editor = useSlate()
  const { readOnly } = editor

  const LinkEditor = (props) => {
    const [value, setValue] = useState(url)

    const onChange = (v) => {
      setValue(v.target.value)
    }

    return (
      <>
        <div style={{ display: 'inline-block', width: '280px' }}>
          <Input value={value} onChange={onChange} />
        </div>
        &nbsp;
        <Single
          selected={true}
          description='修改链接'
          content='修改'
          onClick={() => {
            setURL(editor, element, value)
            message.info('修改链接成功')
          }}
        />
        <Single
          selected={true}
          description='清除链接'
          content={<DeleteOutlined />}
          onClick={() => {
            unWrapLink(editor, element)
          }}
        />
        <div style={{ marginTop: '10px' }}>
          <font style={{ color: 'black' }}>打开方式:</font>&nbsp;
          <Select
            selected={target}
            notNull={true}
            onChange={(key) => {
              setLinkTarget(editor, element, key)
            }}
            buttons={[
              {
                key: '_self',
                content: '本页面',
                description: '会在本页面跳转链接',
              },
              {
                key: '_blank',
                content: '新页面',
                description: '会在新页面跳转链接',
              },
            ]}
          />
        </div>
      </>
    )
  }

  // 处理超链接
  return readOnly ? (
    <a
      onMouseDown={() => {
        if (isUrl(url)) {
          window.open(url, target)
        }
      }}
      {...attributes}
    >
      {children}
    </a>
  ) : (
    <Tooltip
      title={<LinkEditor />}
      color='white'
      overlayStyle={{ minWidth: '400px' }}
      destroyTooltipOnHide={true}
    >
      <a
        onMouseDown={() => {
          if (isUrl(url)) {
            window.open(url, target)
          }
        }}
        {...attributes}
      >
        {children}
      </a>
    </Tooltip>
  )
}

const StarElement = (props) => {
  // 基础配置
  const { attributes, children, element } = props

  const editor = useSlate()
  const selected = useSelected()
  const focused = useFocused()

  const onChange = (number) => {
    setStarNum(editor, element, number)
  }

  return (
    <span {...attributes}>
      {children}
      <span
        contentEditable={false}
        style={{
          display: 'inline-block',
          borderRadius: '2px',
          boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
        }}
      >
        <Rate
          disabled={editor.readOnly}
          allowClear={true}
          value={element.number}
          onChange={onChange}
        />
      </span>
    </span>
  )
}

export { Element, LinkElement, StarElement }
