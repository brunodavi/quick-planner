import { useState } from "react";
import { MdDownload, MdDownloadDone } from "react-icons/md";

export default function Export() {
  function handleClick() {
    setSuccess(true)
    setTimeout(() => { setSuccess(false) }, 3_000);
  }

  const [success, setSuccess] = useState(false)

  return (
    <div className="fixed cursor-pointer bottom-[17px] right-[70px]">
      {
        (success)
          ? <MdDownloadDone size={30} />
          : <MdDownload size={30} onClick={handleClick} />
      }
    </div>
  )
}
