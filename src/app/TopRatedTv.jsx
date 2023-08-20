'use client';
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link';

const image_address = "https://image.tmdb.org/t/p/w300"

export default function TopRatedTv() {

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

  const getTopRatedSeries = () =>
    axios.get("https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1", {
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

  const { isLoading: isLoadingSeries, data: dataSeries, isError: isErrorSeries } = useQuery({
    queryKey: ['getTopRatedSeries'],
    queryFn: getTopRatedSeries,
    retry: 2,
  })

  return (
    <React.Fragment>
      {
        isErrorSeries ? <div>Something went wrong ...</div> :
          isLoadingSeries ? <div>Loading...</div> : dataSeries ?
            <div className="mt-[50px]">
              <h3 className="text-xl font-semibold">Top 10 Series Today</h3>
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
                    dataSeries.results.slice(0, 10).map((item, index) => {
                      return (
                        <Link
                          key={item.id}
                          className="group h-full w-full px-1 flex flex-row cursor-pointer"
                          href={`/tv/${item.id}`}
                        >
                          <span className="text-[170px] text-black font-bold mr-[-20px] text-stroke-4 leading-none">{index + 1}</span>
                          <div
                            className="w-[100px] h-[170px] sm:w-[120px] sm:h-[180px] lg:w-[130px] lg:h-[200px] flex flex-col items-end text-center bg-neutral-950/[0.1] bg-blend-overlay bg-center bg-cover truncate group-hover:bg-neutral-950/[0.6] rounded-r-md"
                            style={{ backgroundImage: `url('${image_address}${item.poster_path}')` }}
                          >
                            <div className="leading-[0.8] bg-[#e50913] px-1 pb-1 rounded-l-[2px] font-bold"><span className="text-[8px]">TOP</span><br /><span className="text-[12px]">10</span></div>
                          </div>
                        </Link>
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
