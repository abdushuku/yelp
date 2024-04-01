import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Form = ({ itemCollectionRef, getItemList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");

  let auth = getAuth();

  const onSubmitItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(itemCollectionRef, {
        name,
        description,
        city,
        userId: auth?.currentUser?.uid
      });
      setName('')
      setDescription('')
      setCity('')

      getItemList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack p={2} >
      <Typography textAlign={"center"} fontWeight={"bold"} fontSize={20} color={"black"} >
        Add Cafe
      </Typography>
      <form onSubmit={onSubmitItem}>
        <Box mb={2}>
          <label className="form-label"sx={{
            color:"#000"
          }} >Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Box>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button type="submit" variant="contained" sx={{ width: "470px", 
          background: "white", fontWeight: "bold", border:"1px solid #000", color:"#000", }}>
            SUBMİT
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Form;
