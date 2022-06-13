import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './UserDetails.css'
import { useAuthContext } from './../../hooks/useAuthContext';

export default function Recipe() {
  const { id } = useParams()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [bought, setIsBought] = useState(false)
  const { user } = useAuthContext()
  const uid = user.data.user._id
  const balance = user.data.user.balance 
  console.log('hii')
  console.log(data)

     useEffect(() => {
    const a = async () => {
    const s = await axios.get('http://localhost:5000/market/get/' + id)
    setData(s.data.market)
    setIsPending(false)
    console.log(s)
    
    }
    a();
  }, [])

  const buyHandler = (e) => {
    if(balance => e) {
       axios.post(`http://localhost:5000/user/d/${uid}`, {
      balance: balance - e
    })
    }
    setIsBought(true)
  }

    return (
      <div>
      
        <div className="wrapper">
          <div className="product-img">
            <img src="https://media.istockphoto.com/vectors/smooth-blurred-gradient-insta-background-wallpaper-style-scalable-vector-id1249702917?k=20&m=1249702917&s=612x612&w=0&h=V8hj84Og_mgIB_ALQv_ZGWupITp6ZdlZYTJNmQx0vgw=" height={420} width={327} />
          </div>
             
          <div className="product-info">
            <div className="product-text">

             {!bought && data && (
              <>
              <h1>User {data.user}</h1>
              <h2>{data.platform}</h2>
              <p>{data.description}</p>
              </>
             )}
            </div>
            <div className="bought">
             {bought && data && (
              <>
              <h2>شكرًا لك على الشراء</h2>
              <h4>Username: {data.user}</h4>
              <h4>Password: {data.password}</h4>
              <h4>Email: {data.mainEmail}</h4>
              <h4>Email Password: {data.emailPassword}</h4>
              </>
             )}
            </div>
            {data && (
            <div className="product-price-btn">
              <p><span>{data.price}</span>$</p>
              <button onClick={() => buyHandler(data.price)}type="button">buy now</button>
            </div>
            )}
          </div>
          <div>
            Main Email Includes
          </div>
        </div>
        
      </div>
      
    );
  }