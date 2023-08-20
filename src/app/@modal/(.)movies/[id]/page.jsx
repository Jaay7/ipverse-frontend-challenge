import Box from "../../../../components/box";
import Modal from "../../../../components/modal";

export default function MovieModal({ params: { id: movieId } }) {
  // console.log(params);
  return (
    <Modal>
      <Box id={movieId} />
    </Modal>
  )
}