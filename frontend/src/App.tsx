import Quill from "quill";
import "quill/dist/quill.snow.css"; // Importa os estilos do Quill
import { useEffect, useRef } from "react";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import { InputDocTitle } from "./components/InputDocTitle/InputDocTitle";

const App = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
    ];
    // Verifica se o Quill já foi inicializado neste contêiner
    if (editorRef.current && !editorRef.current.querySelector(".ql-editor")) {
      // Inicializa o Quill apenas se ainda não houver um editor presente
      const quill = new Quill(editorRef.current, {
        modules: {
          toolbar: toolbarOptions
        },
        theme: "snow"
      });
    }
  }, []);

  return (
    <div className="w-full min-h-100% justify-center drop-shadow-2xl rounded-xl inline-block">
      <div className="flex items-center justify-center mb-10">
        <DropdownMenu editorRef={editorRef}/>
      </div>
      <InputDocTitle/>
      <div className="bg-white m-auto mt-2 rounded-xl overflow-hidden max-w-screen-xl">
        <div ref={editorRef} className="bg-white min-h-fit mt-4 p-4" />
      </div>
    </div>
  );
};

export { App };
