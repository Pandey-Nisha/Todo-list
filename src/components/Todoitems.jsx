import React from "react";
import { assets } from "../assets/assets";

export default function Todoitems({text,id,addModal, addEditModal}) {
  return (
    <>
      <div className="innerItems">
        <img className="img1" src={assets.tick} alt="tick" />
        <p>{text} </p>
        <img className="img2" src={assets.del} alt="delete" onClick={()=> {addModal(id)}}/>
        <img src="https://png.pngtree.com/element_our/20190601/ourmid/pngtree-white-edit-icon-image_1338673.jpg" alt="pen"  onClick={() => {addEditModal(id)}}/>
      </div>
      
    </>
  );
}
