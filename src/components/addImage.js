import React, { useState, useRef,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import authHeader from "../services/auth-header";
import axios from "axios";

import AuthService from "../services/auth.service";
const API_URL="http://localhost:8080/upload"
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const AddImage = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();
 // let images=[];
  const [image, setImage] = useState("");
  const [images, setImages] = useState();
  const useId=JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    axios.get("http://localhost:8080/images",{ params: { userId: useId } }
    ).then(res => {
      console.log(useId)
      setImages(res.data)
    })
  }, [])

  const onFileChange=(e)=> {
    setImage( e.target.files[0])
}
  




  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('profileImg', image)
    formData.append('userId', useId)
    console.log(useId)
    axios.post("http://localhost:8080/user-profile", formData,
    ).then(res => {
      setImages(res.data)
        console.log(images)
    })
    
  };

  return (
    <div className="container">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <h3>React File Upload</h3>
                        <div className="form-group">
                            <input type="file" onChange={onFileChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                  </div>   
           <div>
            <h1 className="fw-light text-center text-lg-start mt-4 mb-0">Gallery</h1>
            <hr className="mt-2 mb-5"/>   
            <div className="row text-center text-lg-start">
                {images && images.map(image => 
                  <div className="col-sm-6 col-md-4 mb-3" key={image._id}>
                  <a href="#" className="d-block mb-4 h-100">
                       <img
                          src={image.name}
                          className="img-fluid img-thumbnail"
                          alt="Boat on Calm Water"
                            />
                  </a>
                   </div>
          )}
            </div>
            </div>
            </div>

          
             
  );
};

export default AddImage;
