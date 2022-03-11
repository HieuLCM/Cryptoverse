import React, {useState, useEffect} from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'
import Loader from './Loader'

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100

  const {data, isFetching} = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState(data?.data?.coins)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {

    const filteredData = data?.data?.coins.filter(crypto => crypto.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCryptos(filteredData)

  }, [data, searchTerm])
  if (isFetching) return <Loader />

  return (
    <div>
      {!simplified && 
        <div className='search-crypto'>
         {/* Input: onChange not onSubmit */}
          <Input placeholder='Search Cryptocurrency' onChange={(event) => setSearchTerm(event.target.value)}/>
        </div>
      }
      

      {/* ?. prevends the case of undefined object */}
      <Row gutter={[32,32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card 
                title={`${currency.rank}. ${currency.name}`}
                extra={<img src={currency.iconUrl} className='crypto-image' alt="icon"/>}
                hoverable>
                <p>Price: {millify(currency.price)}</p>
                <p>Market: {millify(currency.marketCap)}</p>  
                <p>Daily Change: {millify(currency.change)}%</p>  
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Cryptocurrencies