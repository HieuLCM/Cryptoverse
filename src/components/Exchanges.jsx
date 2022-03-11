import React, {useState} from 'react'
import millify from 'millify'
import {Col, Row, Collapse, Typography, Select, Avatar} from 'antd'

import {useGetExchangesQuery, useGetCryptosQuery} from '../services/cryptoApi'
import Loader from './Loader'

const {Text} = Typography
const {Panel} = Collapse
const {Option} =Select

const Exchanges = () => {

  const {data: cryptos, isFetching:cryptosFetching} = useGetCryptosQuery(100)
  const [selectedCoin, setSelectedCoin] = useState('Bitcoin')
  
  
  const coinId = cryptos?.data?.coins.filter((coin) => coin.name === selectedCoin)[0].uuid

  const {data: markets} = useGetExchangesQuery(coinId ? coinId : 'Qwsogvtv82FCd')
  

  if (cryptosFetching) return <Loader />

  return (
    <div>
      <div className='exchange-container'>
        <Select 
        defaultValue="Bitcoin" 
        className='select-exchange-coin'
        placeholder="Select Cryptocurrency"
        onChange={value => setSelectedCoin(value)} >
          {cryptos?.data?.coins.map((coin) => (
            <Option key={coin.name}>{coin.name}</Option>
          ))}
        </Select>
      </div>
      
      <Row>
      {markets?.data?.markets.map((market, index) => (
          <Col span={24} key={index}>
            <Collapse>
              <Panel key={index} showArrow={false} header={(<Col span={24}>
                        <Avatar src={market.exchange.iconUrl} alt="market"/>
                        <Text><strong>  {market.exchange.name}</strong></Text>
                    </Col>)}>
               <div>
                  <Row>
                    <Col span={4}>
                        <Text>Rank: <strong>{market.rank}</strong></Text>
                    </Col>
                    <Col span={9}>
                      <Text>24h Trade Volume: <strong>${millify(market["24hVolume"])}</strong></Text>
                    </Col>
                    <Col span={6}>                      
                      <Text>Price: <strong>${millify(market.price)}</strong></Text>
                    </Col>
                    <Col span={5}> 
                      <Text>Market Share: <strong>{millify(market.marketShare)}%</strong></Text>
                    </Col>

                  </Row>
                </div> 
              </Panel>
            </Collapse>
            
          </Col>
            
        ))}
      </Row>
    </div>
  )
}

export default Exchanges