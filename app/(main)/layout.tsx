import React from 'react'
import DashboardProvider from './provider'
import Header from './dashboard/_components/Header'

const DashboardLayout = ({children} : { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardProvider>
        <Header />
        <div>
          {children}
        </div>
      </DashboardProvider>
    </div>
  )
}

export default DashboardLayout