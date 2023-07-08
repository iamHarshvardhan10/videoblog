import React from "react";
import {
  Category,
  Create,
  Feed,
  NavBar,
  Search,
  
} from "../Components";
import { Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { categories } from "../data";
import VideoDetails from "../Components/VideoDetails";
import UserProfile from "../Components/UserProfile";

const Home = ({ user }) => {
  return (
    <>
      <NavBar user={user} />
      <Flex width={"100vw"}>
        <Flex
          direction={"column"}
          justifyContent={"start"}
          alignItems={"center"}
          width={'5%'}
        >
          {categories &&
            categories.map((data) => <Category key={data.id} data={data} />)}
        </Flex>

        <Flex
          width={"95%"} justifyContent={'center'} alignItems={'center'} px={4}>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route path="/create" element={<Create />} />
            <Route path="/videoDetail/:videoId" element={<VideoDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/userDetail/:userId" element={<UserProfile/>}/>
          </Routes>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
