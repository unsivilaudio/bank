import { useEffect, useState } from 'react';
import axios from 'axios';
import User from '../users/User'
const Home2 = () => {
 const [data, setData] = useState(null)
   useEffect(() => {
    const a = async () => {
    const s = await axios.get('http://localhost:5000/market/get')
    setData(s.data.market)
    }
    a();
  }, [])
      // const d = data.map((d) => console.log(d._id))

  return (
    <div className='home'>
     {data && <User data={data}/>}
    </div>
  )
}

export default Home2