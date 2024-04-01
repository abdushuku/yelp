import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Form from "./Form";
import { useEffect, useState } from "react";
import Table from "./Table";
import "../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase/config";
import { getDocs, collection } from "firebase/firestore";

const Main = ({ accountList, getAccountList }) => {
  const [itemList, setItemList] = useState([]);
  const [userId, setUserId] = useState("");
  const currentEmail = getAuth().currentUser

  const userName = accountList.filter((acc) => acc.email === currentEmail.email)[0]?.userName

  const itemCollectionRef = collection(db, "restaurants");

  const getItemList = async () => {
    try {
      const data = await getDocs(itemCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        itemId: doc.itemId,
      }));

      setItemList(filteredData);
      setUserId(getAuth()?.currentUser?.uid);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAccountList();
    getItemList();
  }, [accountList]);

  const logoutHandler = () => {
    signOut(getAuth())
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          background: "#5344A9",
          color: "white",
          borderRadius: "5px",
          width: "100%",
        }}
      >
        <Stack width={1 / 4} ml={2}>
          <img src="./yelp-logo.png" alt="logo" style={{ height: 50, width: 100 }} />
        </Stack>
        <Stack direction="row" justifyContent="end" mt={1}>
          <Button onClick={logoutHandler} variant="contained">
            Logout
          </Button>
        </Stack>
      </Stack>

      <Container>

        <Stack direction={"column"} spacing={10} mt={5}
          sx={{
            display: "flex",
            flex: "column",
            alignItems: 'center'
          }}
        >
          <Stack
            sx={{
              // background: "#ffff",
              borderRadius: "10px",
              width: "400px",
              height: "355px",
            }}
          >
            <Form
              itemCollectionRef={itemCollectionRef}
              getItemList={getItemList}
            />
          </Stack>
          <Stack
            sx={{
              background: "#5344A9",
              borderRadius: "20px",
              padding: "15px 20px 30px",
            }}
          >
            <Table itemList={itemList} userId={userId} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Main;
