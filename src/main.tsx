import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// 临时禁用严格模式以修复光标事件监听器问题
// StrictMode在开发模式下会双重挂载组件，导致事件监听器冲突
createRoot(document.getElementById('root')!).render(
  <App />
)
