import React, {useState} from 'react'
import {Select, Typography, Row, Col, Avatar, Card} from 'antd'
import moment from 'moment'

import { useGetCryptosQuery } from '../services/cryptoApi'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import Loader from './Loader'

const {Text, Title} = Typography
const {Option} = Select


const defImage = "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg"

const News = ({simplified}) => {
  
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency') 

  const {data: cryptos} = useGetCryptosQuery(100)
  const {data, isFetching} = useGetCryptoNewsQuery({newsCategory, count: simplified? 7 : 50})

  if (isFetching) return <Loader />

  return (
    <Row gutter={[24,24]}>
      {!simplified && (
        <Col span={24}>
          <Select 
            showSearch 
            className='select-news' 
            placeholder="Select a Crypto" 
            optionFilterProp='value'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptos?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>

        </Col>)}
      {data?.value.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className='news-card'>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className='news-image-container'>
                <Title className='news-title' level={5}>{news?.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || defImage} alt="news" style={{maxWidth: '150px', maxHeight: "100px"}}/>
              </div>
              <p>
                {news.description > 100 ? `${news.description.substring(0,100)}...` : news.description}
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar src={news.provider[0].image?.thumbnail?.contentUrl || defImage} alt="news" />
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News