import React, { useEffect } from 'react'

export default function TestList() {

  useEffect(() => {
    document.querySelector(".test_plugin").style.color = 'red'
  }, [])
  

  return (
    <div className='test_plugin'>测试组件路由加载1212333</div>
  )
}
