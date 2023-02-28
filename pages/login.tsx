import { Button, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useRef } from "react";
import { NextPageWithLayout } from "./_app";
import LogoRed from "../public/img/logo-red.png";
import Image from "next/image";

const Login: NextPageWithLayout = () => {
  const credentialsRef = useRef({email: '', password: ''})

  const handleCredentialsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    credentialsRef.current = { ...credentialsRef.current, [name]: value};
  };
  const handleSubmitLogin = async (e: FormEvent)  => {
    e.preventDefault();
    const res = await signIn("credentials", {
      callbackUrl: "/",
      ...credentialsRef.current,
    });
  };

  return (
    <main
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        action=""
        onSubmit={handleSubmitLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          paddingBottom: '32px'
        }}
      >
        <div style={{paddingBottom: '24px'}}>
          <Image src={LogoRed} width={140} height={60} />
        </div>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          onChange={handleCredentialsChange}
        />
        <TextField
          name="password"
          label="Senha"
          variant="outlined"
          type="password"
          onChange={handleCredentialsChange}
        />
        <Button variant="contained" type="submit" fullWidth>
          Login
        </Button>
      </form>
    </main>
  );
};

Login.getLayout = (page) => page;
//Login.noAuthNeeded = true;

export default Login;
