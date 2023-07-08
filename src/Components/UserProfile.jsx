import { Flex, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import randomImage from "../Assests/randomImage.jpg";
import { getFirestore } from "firebase/firestore";
import { firebaseapp } from "../firebaseConfig";
import Spinner from '../Components/Spinner'
import { useParams } from "react-router-dom";
import { getUserInfo, userUploadedVideo } from "../utils/fetchData";
import RecommendedVideos from "./RecommendedVideos";

const UserProfile = () => {
  const {userId} = useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo , setUserInfo] = useState(null)
  const [feeds , setFeeds] = useState(null)

  const fireStoreDb = getFirestore(firebaseapp);

  useEffect(() => {
    setIsLoading(true)
    if (userId) {
      getUserInfo(fireStoreDb , userId).then((user) => {
        setUserInfo(user)
      });
      userUploadedVideo(fireStoreDb , userId).then((feed) => {
        setFeeds(feed)
      })
      setIsLoading(false)
    }
  },[userId , fireStoreDb])

  if(isLoading) return <Spinner />

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      width={"full"}
      height={"auto"}
      p={2}
      direction={"column"}
    >
      <Flex
        justifyContent={"center"}
        width={"full"}
        position={"relative"}
        direction={"column"}
        alignItems={"center"}
      >
        <Image
          src={randomImage}
          height={"320px"}
          width={"full"}
          objectFit={"cover"}
          borderRadius={"md"}
        />
          <Image
          src={userInfo?.photoURL}
          width="120px"
          objectFit={"cover"}
          border="2px"
          borderColor={"gray.100"}
          rounded="full"
          shadow={"lg"}
          mt="-16"
        />
      </Flex>

      {feeds && (
        <Flex direction={"column"} width="full" my={6}>
          <RecommendedVideos feeds={feeds} />
        </Flex>
      )}
    </Flex>
  );
};

export default UserProfile;
