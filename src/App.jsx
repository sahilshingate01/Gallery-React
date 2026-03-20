import React, { useEffect, useState } from 'react'
import axios from "axios";

const App = () => {
  const [userdata, setuserdata] = useState([])
  const [index, setindex] = useState(1)
  let imagedata = "No Data Is Present"

  async function getdata() {
    try {
      const res = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=45`)
      setuserdata(await res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { getdata() }, [index])

  if (userdata.length > 0) {
    imagedata = userdata.map((ele, idx) => {
      return <div key={idx} >
        <a href={ele.url} target='_blank'>
          <div className='h-40 w-44 bg-white rounded-2xl overflow-hidden'>
            <img className='h-full object-cover w-full' src={ele.download_url} alt="" />
          </div>
          <h2 className=' font-bold text-lg  '>{ele.author}</h2>
        </a>
      </div>
    })
  }

  return (
    <div className=' bg-black text-white h-screen overflow-auto'>
      <div className="flex justify-center py-6">
        <h1 className="text-4xl font-extrabold tracking-wide 
  bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500 
  bg-clip-text text-transparent drop-shadow-lg">
          📸 Infinite Photo Gallery
        </h1>
      </div>

      <div className=' flex flex-wrap gap-5'>
        {imagedata}
      </div>
      <div className='flex gap-5 justify-center items-center'>

        <button onClick={() => { if (index > 1) { setindex(index - 1) } }} className={` bg-amber-400 px-4 py-2 text-white font-bold rounded-xl active:scale-95 cursor-pointer mt-6 ${index == 1 ? ' opacity-50 ' : 'opacity-100'} `}>Prev</button>
        <h2 className=' mt-6 font-bold text-white text-sl '>Page {index}</h2>
        <button onClick={() => { setindex(index + 1) }} className=' bg-amber-400 px-4 py-2 text-white font-bold rounded-xl active:scale-95 cursor-pointer mt-6 '>Next</button>

      </div>
    </div>
  )
}

export default App
