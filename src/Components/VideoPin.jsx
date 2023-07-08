import {
  Flex,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getFirestore } from "firebase/firestore";
import { firebaseapp } from "../firebaseConfig";
import { getUserInfo } from "../utils/fetchData";
import moment from "moment/moment";

const VideoPin = ({ data }) => {
  const firestoreDb = getFirestore(firebaseapp);
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("blackAlpha.700", "gray.900");
  const textColor = useColorModeValue("gray.100", "gray.100");

  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserID] = useState(null);

  useEffect(() => {
    if (data) setUserID(data.userId);
    if (userId)
      getUserInfo(firestoreDb, userId).then((data) => {
        setUserInfo(data);
      });
  }, [userId]);
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      direction={"column"}
      cursor={"pointer"}
      shadow={"lg"}
      _hover={{ shadow: "xl" }}
      rounded={"md"}
      overflow={"hidden"}
      position={"relative"}
      maxWidth={"300px"}
      bg={"gray.200"}
      maxHeight={"200px"}
     
    >
      <Link to={`/videoDetail/${data.id}`}>
        <video
          src={data.videoUrl}
          muted
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
        ></video>
      </Link>

      <Flex
        position={"absolute"}
        bottom={"0"}
        left={"0"}
        p={2}
        bg={bg}
        width={"full"}
        direction={"column"}
      >
        <Flex
          width={"full"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text color={textColor} isTruncated fontSize={"20px"}>
            {data.title}
          </Text>
          <Link to={`/userDetail/${userId}`}>
            <Image
              src={userInfo?.photoURL}
              rounded={"full"}
              width={"50px"}
              height={"50px"}
              border={"2px"}
              borderColor={bg}
              mt={-10}
            />
          </Link>
        </Flex>
        <Text fontSize={12} color={textColor} ml={"auto"}>
          {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
        </Text>
      </Flex>
    </Flex>
  );
};

export default VideoPin;
