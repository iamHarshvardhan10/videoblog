import React, { useEffect, useState } from "react";


import { getAllFeeds } from "../utils/fetchData";
import Spinner from "../Components/Spinner";
import { SimpleGrid } from "@chakra-ui/react";
import VideoPin from "./VideoPin";
const RecommendedVideos = ({feeds}) => {
    
  return (
    <SimpleGrid
    width={"full"}
    minChildWidth={"300px"}
    spacing={"15px"}
    autoColumns={"max-content"}
    px={2}
    overflowX={"hidden"}
  >
    {feeds && feeds.map((data) => (
      <VideoPin key={data.id} data={data} maxWidht={"400px"} height={"auto"}/>
    ))}
  </SimpleGrid>
  )
}

export default RecommendedVideos