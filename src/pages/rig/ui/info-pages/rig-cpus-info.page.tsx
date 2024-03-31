import { useParams } from "react-router-dom";

export function RigCpusInfo({
  className
} : {
  className?: string
}) {
  const { rigId } = useParams();

  return (
    <div>
      {rigId}
    </div>
  )
}