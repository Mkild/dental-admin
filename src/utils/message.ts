import MessageVue from '@/components/Message.vue'
import { h, render, VNode } from 'vue'

export type MessageProps = {
  message: string
  type: MessageType
}

type MessageFnc = (message: string) => void

type MessageProp = ((message: string | MessageProps) => void) & {
  success: MessageFnc
  warning: MessageFnc
  info: MessageFnc
  error: MessageFnc
}

export type MessageType = 'success' | 'warning' | 'info' | 'error'

export const getStyle = (
  type: MessageType
): {
  style: {
    background: string
    border: string
    color: string
  }
  icon: string
} => {
  // TODO 目前只有一个图标
  const icon = 'delete-report'

  // success
  const style = {
    background: '#f0f9eb',
    borderColor: '#e1f3d8',
    color: '#67C23B',
  }

  if (type === 'error') {
    style.background = '#fef0f0'
    style.borderColor = '#fde2e2'
    style.color = '#f56c6c'
  }

  if (type === 'info') {
    style.background = '#f4f4f5'
    style.borderColor = '#e9e9eb'
    style.color = '#909399'
  }

  if (type === 'warning') {
    style.background = '#fdf6ec'
    style.borderColor = '#faecd8'
    style.color = '#e6a23c'
  }

  return {
    style: {
      background: style.background,
      border: `1px solid ${style.borderColor}`,
      color: style.color,
    },
    icon,
  }
}

const messageBoxId = 'MESSAGE-ID'

const renderMessage = (): VNode => {
  const props: MessageProps = {
    message: '',
    type: 'success',
  }
  const container = document.createElement('div')
  container.id = messageBoxId
  Object.assign(container.style, {
    minWidth: '380px',
    top: '36px',
    position: 'fixed',
    left: 'calc(50% - 190px)',
    zIndex: new Date().getFullYear(),
    boxSizing: 'border-box',
    fontSize: '14px',
    pointerEvents: 'none',
  })
  // 创建 虚拟dom
  const messageVNode = h(MessageVue, props)
  // 将虚拟dom渲染到 container dom 上
  render(messageVNode, container)
  // 最后将 container 追加到 body 上
  document.body.appendChild(container)

  return messageVNode
}

let messageInstance: any

const sendMessage = (message: string, type: MessageType): void => {
  if (messageInstance) {
    const messageVue = messageInstance.component
    messageVue?.exposed?.open?.({ message, type })
  } else {
    messageInstance = renderMessage()
    sendMessage(message, type)
  }
}

const _Message = (message: string | MessageProps): void => {
  if (typeof message === 'string') {
    sendMessage(message, 'success')
  } else {
    sendMessage(message.message, message.type)
  }
}
_Message.success = (message: string) => sendMessage(message, 'success')
_Message.warning = (message: string) => sendMessage(message, 'warning')
_Message.info = (message: string) => sendMessage(message, 'info')
_Message.error = (message: string) => sendMessage(message, 'error')

const Message: MessageProp = _Message

export default Message
