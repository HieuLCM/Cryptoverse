import React, {useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import {useParams} from 'react-router-dom'
import millify from 'millify'
import {Col, Typography, Select} from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, ThunderboltOutlined, NumberOutlined, CheckOutlined} from '@ant-design/icons'

import LineChart from './LineChart'
import Loader from './Loader'
import { useGetCryptoDetailQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'


const {Title, Text} = Typography
const {Option} = Select


const CryptoDetails = () => {
  const {coinId} = useParams()

  const [timePeriod,setTimePeriod] = useState('7d')
  const {data, isFetching} = useGetCryptoDetailQuery(coinId)
  const {data: coinHistory} = useGetCryptoHistoryQuery({coinId, timePeriod})

  const cryptoDetails = data?.data?.coin

  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y']

  const stats = [
    {title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined />},
    {title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined />},
    {title: '24h Volume', value: `$ ${cryptoDetails?.price && millify(cryptoDetails["24hVolume"])}`, icon: <ThunderboltOutlined />},
    {title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined />},
    {title: 'All-time-high (daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined />},
  ]

  const genericStats = [
    {title: 'Number of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined />},
    {title: 'Number of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined />},
    {title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined />},
    {title: 'Total Suply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined />},
    {title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined />},
  ]

  if (isFetching) return <Loader />
  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>{cryptoDetails?.name} ({cryptoDetails?.symbol})</Title>
        <p>
          {cryptoDetails?.name} live price in US dollars. View value statistics, market cap and supply
        </p>
      </Col>  
      <Select 
      defaultValue="7d" 
      className="select-timeperiod" 
      placeholder="Select time period"
      onChange={value => setTimePeriod(value)} >
        {time.map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </Select>
      <LineChart coinHistory={coinHistory} timePeriod={timePeriod} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coint-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails.name}
            </p>
          </Col> 
          {stats.map(({title, value, icon}, index) => (
            <Col className='coin-stats' key={index}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coint-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistics
            </Title>
            <p>
              An overview showing the stats of all cryptocurrencies
            </p>
          </Col> 
          {genericStats.map(({title, value, icon}, index) => (
            <Col className='coin-stats' key={index}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
            <Col className='coin-desc'>
              <Title level={3} className='coin-details-heading'>
                What is {cryptoDetails.name}?
              </Title>
              {HTMLReactParser(cryptoDetails.description)}
            </Col>
            <Col className='coin-links'>
              <Title level={3} className='coin-details-heading'>
                {cryptoDetails.name} Links 
              </Title>
              {cryptoDetails.links.map((link) =>(
                <Col className='coin-link' key={link.name}>
                  <Title level={5} className='link-name'>{link.type}</Title>
                  <a href={link.url} target='_blank' rel='noreferrer'>
                    {link.name}
                  </a>
                </Col>
              ))}
            </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails