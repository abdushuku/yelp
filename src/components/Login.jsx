import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../firebase/config.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongMsg, setWrongMsg] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => setWrongMsg(false))
      .catch(() => setWrongMsg(true));
  };
  return (
    <Box sx={{ background: "#ffffff" }} height={"100vh"}>
      <Container>
        <Stack direction={"row"} justifyContent={"center"}>
          <Box 
            border={1} 
            borderColor="primary.main" 
            borderRadius={8} padding={2}
            sx={{
              boxShadow: 1, 
            }}>
            <Stack
              width={"450px"}
              height={"400px"}
              sx={{
                mt: "100px",
                p: "10px 20px",
                borderRadius: "10px",
              }}
            >
              <Box mb={2}>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  Welcome to My Yelp
                </Typography>
                <Typography fontSize={25} sx={{ textAlign: "center" }}>
                  Sign in for Yelp.
                </Typography>
              </Box>
              <form onSubmit={loginHandler}>
                <Box mb={2}>
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </Box>
                <Box>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </Box>
                {wrongMsg && (
                  <Typography mb={15} fontSize={13} color={"red"}>
                    Your email or password is Wrong
                  </Typography>
                )}

                <Typography mb={3}>
                  Don't have an account? <Link to={"/register"}>Register</Link>
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: "10px", width: "100%" }}
                >
                  Sign in
                </Button>
              </form>
            </Stack>
          </Box>

        </Stack>
      </Container>
    </Box>
  );
};

export default Login;