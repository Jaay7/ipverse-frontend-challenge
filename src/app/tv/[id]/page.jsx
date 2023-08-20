import Tv from "@/components/box/tv";

export default function MoviePage({ params: { id } }) {
  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700">
        <Tv id={id} />
      </div>
    </div>
  )
}