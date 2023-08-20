'use client'
import React, { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const image_address = "https://image.tmdb.org/t/p/w300"

export default function Tv({ id }) {
  const AUTH_KEY = `Bearer ${process.env.AUTH_KEY}`;

  const getTvDetails = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
      headers: {
        Authorization: AUTH_KEY
      }
    })

    return response.data
  }

  const { isLoading: isTvLoading, data: tvData, isError: isTvError } = useQuery({
    queryKey: ['getTvDetails'],
    queryFn: getTvDetails,
  })

  const getCredits = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`, {
      headers: {
        Authorization: AUTH_KEY
      }
    })

    return res.data
  }

  const { isLoading, data, isError } = useQuery({
    queryKey: ['getCredits'],
    queryFn: getCredits,
  })

  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick = useCallback(
    (e) => {
      if (onDismiss) onDismiss()
    },
    [onDismiss]
  )

  if (isTvError) return (<div>Something went wrong...</div>)

  return (
    <div className="rounded-lg">{
      isTvLoading ? "Loading..." : tvData && <>
        <div className="relative h-[200px] md:h-[400px] flex flex-col bg-no-repeat bg-cover bg-top	items-start justify-end bg-neutral-950/[0.5] bg-blend-overlay p-4" style={{ backgroundImage: `url('${image_address}${tvData.backdrop_path}')` }}>
          {/* <button className="text-white absolute top-0 right-0 m-3 bg-black h-[20px] w-[20px] rounded-full text-[12px] scale-125" >x</button> */}
          <span className="material-icons-round absolute top-3 right-3 bg-black rounded-full p-1 cursor-pointer" onClick={onClick}>close</span>
          <span className="flex-grow"></span>
          <h1 className="text-white text-[44px] font-semibold uppercase leading-none">{tvData.name}</h1>
        </div>
        <div className="bg-[#181818] p-4">
          <div className="flex flex-row">
            <p className="text-white text-sm mt-3">{tvData.overview}</p>
            {/* <div className="flex flex-col ml-4">
              <p className="text-white text-sm mt-3 cursor-pointer"><span className="text-gray-500">Cast:</span> {
                isLoading ? "Loading..." : data && data.cast.slice(0, 5).map((person) => {
                  return <span key={person.name} className="hover:underline">{person.name + ", "}</span>
                })
              } <span className="hover:underline italic">more</span></p>
              <p className="text-white text-sm mt-3"><span className="text-gray-500">Release Date: </span>{tvData.release_date}</p>
              <p className="text-white text-sm mt-3"><span className="text-gray-500">Rating: </span>{tvData.vote_average.toFixed(1)} ({tvData.vote_count})</p>
              <p className="text-neutral-300 text-sm mt-3">Vote Count: </p>
            </div> */}
          </div>
        </div>
        <div className="bg-[#181818] p-4">
          <div className="flex flex-col">
            <h1 className="text-white text-xl font-medium">About {tvData.name}</h1>
            <p className="text-white text-sm mt-3 cursor-pointer"><span className="text-gray-500">Director: </span>{data && data.crew.map((person) => {
              if (person.job === "Director")
                return <span key={person.name} className="hover:underline">{person.name}</span>
            })
            }</p>
            <p className="text-white text-sm mt-3 cursor-pointer"><span className="text-gray-500">Cast: </span>{data && data.cast.slice(0, 10).map((person) => {
              return <span key={person.name} className="hover:underline">{person.name + ", "}</span>
            })
            }</p>
            <p className="text-white text-sm mt-3 cursor-pointer"><span className="text-gray-500">Writer: </span>{data && data.crew.map((person) => {
              if (person.job === "Screenplay")
                return <span key={person.name} className="hover:underline">{person.name + ", "}</span>
            })
            }</p>
          </div>
        </div>
      </>
    }</div>
  )
}
