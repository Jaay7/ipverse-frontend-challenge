'use client';
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from "next/link";


const image_address = "https://image.tmdb.org/t/p/w300"

export default function TrendingNow() {

  let scrl = React.useRef(null);
  const [scrollX, setscrollX] = React.useState(0);
  const [scrolEnd, setscrolEnd] = React.useState(false);

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const AUTH_KEY = `Bearer ${process.env.AUTH_KEY}`;

  const getAllTrending = () =>
    axios.get("https://api.themoviedb.org/3/trending/all/day?language=en-US", {
      headers: {
        Authorization: AUTH_KEY
      }
    })
      .then((res) => {
        console.log(res.data)
        return res.data
      })
      .catch((err) => {
        console.log(err)
      })

  const { isLoading, data, isError } = useQuery({
    queryKey: ['getAllTrending'],
    queryFn: getAllTrending,
    retry: 2,
  })
  if (isError) {
    return <div>Error</div>
  }
  return (
    <React.Fragment>
      {
        isLoading ? <div>Loading...</div> : data ?
          <div>
            <h3 className="text-xl font-semibold">Trending Now</h3>
            <div className="flex flex-row items-center relative">
              {scrollX !== 0 && (
                <span
                  className="material-icons-round cursor-pointer bg-neutral-950/[0.6] p-1"
                  onClick={() => slide(-500)}
                >
                  chevron_left
                </span>
              )}
              <div ref={scrl} onScroll={scrollCheck} className="listscroll flex flex-row overflow-scroll mt-2 scroll-smooth h-max">
                {
                  data.results.map((item) => {
                    const id = item.id;
                    return (
                      <div key={item.id} className="group h-full w-full px-1">
                        <div className="rounded-md px-2 py-1 w-[300px] h-[169px] sm:w-[240px] sm:h-[149px] md:w-[260px] md:h-[149px] flex flex-col justify-end bg-neutral-950/[0.1] bg-blend-overlay bg-center bg-cover group-hover:bg-neutral-950/[0.6]" style={{ backgroundImage: `url('${image_address}${item.backdrop_path}')` }}>
                          <div className="hidden px-1 flex-row items-end justify-between group-hover:flex">
                            <div className="flex flex-col text-white">
                              <span className="leading-none text-medium">{item.title}</span>
                              <div className="flex flex-row items-center">
                                <span
                                  className="material-icons-round"
                                  style={{ fontSize: 14 }}
                                >
                                  thumb_up
                                </span>&nbsp;
                                <span className="text-xs">{item.vote_count}</span>
                              </div>
                            </div>
                            <Link
                              href={`/movies/${id}`}
                              className="text-xs underline cursor-pointer"
                            >
                              <span className="material-icons-outlined">info</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              {!scrolEnd && (
                <span
                  className="material-icons-round cursor-pointer bg-neutral-950/[0.6] p-1"
                  onClick={() => slide(+500)}
                >
                  chevron_right
                </span>
              )}
            </div>
          </div> : null
      }
    </React.Fragment>
  )
}
