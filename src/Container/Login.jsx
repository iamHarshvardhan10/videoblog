import { Button, Flex, HStack, Image  } from "@chakra-ui/react";
import React from "react";

import { FcGoogle } from "react-icons/fc";

import backGround from "../Assests/loginback.jpg";
import logo from '../Assests/logo.png'

// this auth function provided by firebase for singInWithPopup function
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// firestore for storing user info
import { doc, getFirestore, setDoc } from "firebase/firestore";

// this firebase details file
import { firebaseapp } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // auth instances provided
  const firebaseAuth = getAuth(firebaseapp);
  // google se login karne ke liye use hau hai
  const provider = new GoogleAuthProvider();

  // firestore mai save karne ke liye getStorage ko access kiya
  const firebaseDB = getFirestore(firebaseapp);

  const navigate = useNavigate();

  // onClick function pe popup hoga signInWithPopup firebase function se

  const login = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;

    // locastorage mai info save karne ke liye
    localStorage.setItem("user", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(refreshToken));

    // userInfo mai collection mai save kiya

    await setDoc(
      doc(firebaseDB, "users", providerData[0].uid),
      providerData[0]
    );

    navigate("/" , {replace : true})
  };
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
    >

      
      <Image
        src={backGround}
        objectFit={"cover"}
        width={"full"}
        height={"full"}
      />

      <Flex position={'absolute'} top={'1'} left={'0'}>
        <Image src={logo} width={'125px'}/> 
      </Flex>
      <Flex position={'absolute'} top={'4'} left={'150'}>
        <span style={{fontSize:"32px" , color:"white", fontWeight:"bold"}}>Capture Your Moment</span>
      </Flex>

      <Flex
        position={"absolute"}
        width={"100vw"}
        height={"100vh"}
        bg={"blackAlpha.600"}
        top={0}
        left={0}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HStack>
          <Button
            leftIcon={<FcGoogle fontSize={50} />}
            colorScheme="whiteAlpha"
            shadow={"lg"}
            height={55}
            onClick={() => login()}
          >
            SignIn with Google
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Login;
