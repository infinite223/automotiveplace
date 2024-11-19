import React, { FC } from 'react'

interface IAMPCarStatsItem {
    title: string,
    subTitle?: string,
    value: string
}

export const AMPCarStatsItem: FC<IAMPCarStatsItem> = ({ subTitle, title, value }) => {
  return (
    <main className='flex p-2 px-4 bg-zinc-950/50 rounded-sm flex-col gap-1'>
        <h1>
            {value}
        </h1>
        
        <div className='flex flex-col gap-0.5'>
        <h2>
            {title}
        </h2>

        {subTitle && <p>
            {subTitle}\
        </p>}
        </div>
    </main>
  )
}