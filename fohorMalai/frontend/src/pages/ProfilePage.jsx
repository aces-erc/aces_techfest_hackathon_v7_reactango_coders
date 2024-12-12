import { useContext } from "react";
import { UserContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  console.log(username);

  return <div></div>;
};

export default ProfilePage;
