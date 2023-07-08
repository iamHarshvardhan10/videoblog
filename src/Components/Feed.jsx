import React, { useEffect, useState } from "react";

import { getFirestore } from "firebase/firestore";
import { firebaseapp } from "../firebaseConfig";
import { categoryFeeds, getAllFeeds } from "../utils/fetchData";
import Spinner from "../Components/Spinner";
import { SimpleGrid } from "@chakra-ui/react";
import VideoPin from "./VideoPin";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const Feed = () => {
  const firestoreDb = getFirestore(firebaseapp);
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);
  const {categoryId} = useParams()

  useEffect(() => {
    setLoading(true);
    if(categoryId) {
      categoryFeeds(firestoreDb , categoryId).then((data) => {
        setFeeds(data)
        setLoading(false)
      })
      
    }else{

      getAllFeeds(firestoreDb).then((data) => {
        setFeeds(data);
        setLoading(false);
      });
    }
  },[firestoreDb , categoryId]);

  if (loading) return <Spinner msg={"Wait, Feeds Are Loading"} />;
  if (!feeds?.length > 0) return <NotFound/>
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
  );
};

export default Feed;
