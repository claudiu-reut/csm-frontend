import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "../SignIn/api/axios"
export default function DeleteUser() {
  const match = useParams();
  const history = useNavigate();
  
  useEffect(() => {

    const deleteUser = async () => {
    console.log(match.id);
     const response = await axios.delete(`/deleteuser/${match.id}`)
      history("/admin");
      console.log(response);
    };
    deleteUser();
  }, []);
  return <div>DeleteUser</div>;
}
