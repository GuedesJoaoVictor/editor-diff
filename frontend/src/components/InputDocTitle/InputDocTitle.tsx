import { MdModeEdit } from "react-icons/md";

const InputDocTitle = () => {

    return(
        <div className="flex items-center justify-center mb-6">
            <input type="text" name="title" id="title" placeholder="Untitled..." 
            className="text-neutral-100 text-xl bg-transparent border-b-2 border-neutral-400 text-center md:w-1/12 focus-visible:outline-none"/>
            <MdModeEdit color="#f5f5f5"/>
        </div>
    )
}
 
export { InputDocTitle };