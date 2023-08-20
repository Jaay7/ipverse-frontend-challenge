'use client';
import React from 'react'
// import Navbar from './Navbar';
import TopRated from './TopRated';
import TrendingNow from './TrendingNow';
import TopRatedTv from './TopRatedTv';

export default function Dashboard() {
  return (
    <main>
      {/* <Navbar /> */}
      <div className="flex flex-col px-[20px] md:px-[60px] py-3">
        <TrendingNow />
        <TopRated />
        <TopRatedTv />
      </div>
    </main>
  )
}
