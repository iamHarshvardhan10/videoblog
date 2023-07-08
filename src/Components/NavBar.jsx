import React from "react";

import logo from "../Assests/logo.png";

import { IoAdd, IoLogOut, IoMoon, IoSearch, IoSunny } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";

// import avatar from "../Assests/download.png";
import {
  Flex,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  useColorMode,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  
} from "@chakra-ui/react";

const NavBar = ({ user }) => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.600", "gray.300");

  const logout = () => {
    console.log("I am Logout")
    localStorage.clear()
    navigate('/login' , {replace : true})
  }
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100vw"}
      p={4}
    >
      <Link to={"/"}>
        <Image src={logo} width={"100px"} />
      </Link>

      <InputGroup mx={6} width={"60vw"}>
        <InputLeftElement
          pointerEvents="none"
          children={<IoSearch color="grey.300" />}
        />
        <Input
          type="text"
          placeholder="Search Here..."
          fontSize={18}
          fontWeight={"medium"}
          variant={"filled"}
        />
      </InputGroup>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Flex
          width={"40px"}
          height={"40px"}
          justifyContent={"center"}
          alignItems={"center"}
          cursor={"pointer"}
          borderRadius={"5px"}
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? (
            <IoMoon fontSize={25} />
          ) : (
            <IoSunny fontSize={25} />
          )}
        </Flex>

        <Link to={"/create"}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            bg={bg}
            width={"40px"}
            height={"40px"}
            borderRadius={"5px"}
            mx={6}
            cursor={"pointer"}
            _hover={{ shadow: "lg" }}
            transition={"ease-in-out"}
            transitionDuration={"0.3s"}
          >
            <IoAdd
              fontSize={25}
              color={`${colorMode === "dark" ? "#111" : "#f1f1f1"}`}
            />
          </Flex>
        </Link>

        <Menu>
          <MenuButton>
          {user && user.photoURL && (
            <Image src={user.photoURL} width={"50px"} height={"50px"} rounded={"full"} />
          )}
          </MenuButton>
          <MenuList shadow={"lg"}>
            <Link to={`/userDetail/${user?.uid}`}>
              <MenuItem>My Account</MenuItem>
            </Link>
            <MenuItem flexDirection={"row"} alignItems={"center"} gap={4} onClick={logout} >
              Logout

              <IoLogOut fontSize={20}   
                 />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
