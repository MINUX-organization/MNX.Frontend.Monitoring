import { useParams } from "react-router-dom";

export function RigGpusInfo() {
  const { rigId } = useParams();

  return (
    <div>
      {rigId}
    </div>
  )
}