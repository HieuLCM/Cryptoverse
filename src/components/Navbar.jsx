import React, {useState, useEffect} from 'react'
import {Button, Menu, Typography, Avatar} from "antd"
import {Link} from "react-router-dom"
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined, MoneyCollectOutlined } from '@ant-design/icons'

import logo from "../images/logo.png"

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(true)
  const [screenSize, setScreenSize] = useState(undefined)

  useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth)

      window.addEventListener('resize', handleResize)

      handleResize()

      return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
      if (screenSize <= 800) {
          setMenuActive(false)
      }
      else setMenuActive(true)
  }, [screenSize])

  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={logo} size="large"/>
            <Typography.Title level={2} className="logo">
                <Link to="/">Crytoverse</Link>
            </Typography.Title>
            <Button className='menu-control-container' style={{color: 'white'}} onClick={() => setMenuActive(!menuActive)}>
                <MenuOutlined />
            </Button>
        </div>
        {menuActive && 
        <Menu theme='dark'>
            <Menu.Item icon={<HomeOutlined />} key="home">
                <Link to="/">Home</Link>    
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />} key="items">
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>    
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined />} key="exchanges">
                <Link to="/exchanges">Exchanges</Link>    
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />} key="news">
                <Link to="/news">News</Link>    
            </Menu.Item>
        </Menu>}
        
    </div>
  )
}

export default Navbar