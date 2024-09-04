import { api } from "../../config/api";
import React, { Fragment } from "react";
import "./dropdownmenu.css"

interface DropdownMenuProps {
  editorRef: React.RefObject<HTMLDivElement>;
}

const DropdownMenu:React.FC<DropdownMenuProps> = ({ editorRef }) => {
  const handleDownloadPDF = async () => {
    if(editorRef.current) {
      const quillEditor = editorRef.current.querySelector(".ql-editor");
      if(quillEditor) {
        const content = quillEditor.innerHTML;
        let title = document.querySelector("input")?.value;
        title === "" ? title = "untitled" : title;
        try {
          const response = await api.post("/api/download/pdf", { content }, { responseType: "blob" });
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${title}.pdf`
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } catch (error) {
          console.error("Error during PDF donwload", error);
        }
      }
    }
  }

  const handleDownloadDOCX = async () => {
    if(editorRef.current) {
      const quillEditor = editorRef.current.querySelector(".ql-editor");
      if(quillEditor) {
        const content = quillEditor.innerHTML;
        let title = document.querySelector("input")?.value;
        title === "" ? title = "untitled" : title;
        try {
          const response = await api.post("api/download/docx", { content }, { responseType: "blob" });
          const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${title}.docx`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.removeChild(a);
        } catch (error) {
          console.error("Error during DOCX download", error);
        }
      }
    }
  }
  return(
    <Fragment>
      <div className="bg-white md:w-full w-fit max-h-full p-3 flex items-center justify-between">
        <h1 className="md:text-3xl text-3xl ml-2">Editor<span className="text-cyan-800">Diff</span></h1>
        <ul className="list-none flex">
          <li className="md:px-7 px-3"><a href="#">Save</a></li>
          <li className="md:px-7 px-3"><a href="#">Open</a></li>
          <li id="download-menu" className="px-7 relative"><a href="#">Download as</a>
          <div id="dropdown-menu" className="absolute left-0 top-full bg-white rounded-xl shadow-md">
            <ul className="block w-32 p-2">
              <li
                className="border border-transparent p-1 m-1 cursor-pointer hover:border-neutral-900 transition-colors duration-300"
                onClick={handleDownloadPDF}
              >
                PDF
              </li>
              <li
                className="border border-transparent p-1 m-1 cursor-pointer hover:border-neutral-900 transition-colors duration-300"
                onClick={handleDownloadDOCX}
              >
                DOCX
              </li>
            </ul>
          </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default DropdownMenu;