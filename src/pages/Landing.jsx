import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Landing() {

// function definition
// redirect from one page to another page we can usenavigate ----(hook)

const navigate=useNavigate()
const handleNavigate=()=>{
  navigate('/home')

}

  return (
    <div>
      <Row className='align-items-center'>
        <Col></Col>
        <Col lg={6}> 
 <h1>WELCOME TO VIDEO.COM</h1>
 <p style={{textAlign:'justify'}}>Where user can use their favourite videos,user can upload any youtube videos by copy and paste their url in to video.com,will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop it is free try it now !!!</p>
 <button onClick={handleNavigate} className='btn btn-success'>Click here to know more</button>
  </Col>


        <Col lg={5}> 
        <img className='img-fluid' width={'300px'} height={'300px'} src="https://imgeng.jagran.com/images/2023/apr/Youtube%20(4)1681217487204.jpg" alt="no image" /></Col>
      </Row>
    </div>
  )
}

export default Landing