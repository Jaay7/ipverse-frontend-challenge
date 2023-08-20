import Box from "../../../components/box";

export default function MoviePage({ params: { id } }) {
  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700 rounded-lg">
        <Box id={id} />
      </div>
    </div>
  )
}