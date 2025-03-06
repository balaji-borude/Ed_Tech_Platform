import React from 'react'

// creating an array 
const Stats=[
  {count:"5k", label:"Active Students"},
  {count:"5+", label:"Mentors"},
  {count:"200+", label:"Courses"},
  {count:"50+", label:"Awards"},
]

const StatsComponents = () => {
  return (
    <section>
      <div>
        <div className='flex gap-x-5'>
          {
            Stats.map((data,index)=>{
              return(
                <div key={index}>
                  <h1>
                    {data.count} 
                  </h1>
                  <h1>
                    {data.label} 
                  </h1>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default StatsComponents