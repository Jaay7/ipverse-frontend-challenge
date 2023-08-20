import Tv from "../../../../components/box/tv";
import Modal from "../../../../components/modal";

export default function TvModal({ params: { id: tvId } }) {
  return (
    <Modal>
      <Tv id={tvId} />
    </Modal>
  )
}