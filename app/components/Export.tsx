import { AiOutlineExport } from "react-icons/ai";
import { exportICS, downloadICS } from "../utils/helpers";


export default function Export({ jsonTree }: { jsonTree: JsonTree }) {
  function handleClick() {
    const { error, value } = exportICS(jsonTree)

    if (error) {
      throw error
    } else if (typeof value === 'string') {
      downloadICS(value)
    } else {
      throw new Error(`Invalid value: ${value}`)
    }

  }

  return (
    <button onClick={handleClick} className="flex text-white rounded-md items-center justify-between bg-transparent">
      <AiOutlineExport className="mx-1" size="90%" />
      <span className="hidden lg:block lg:text-nowrap">
        Export ICS
      </span>
    </button>
  );
}
