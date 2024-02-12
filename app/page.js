"use client"
import Image from "next/image";
import Container from "./components/Container";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  console.log("Session:", session)
  if(!(session?.status == "authenticated")){
    return(
      
      <main className="page pt-[100px] z-0">
        <Container>
          <h1>Hi there!</h1>
          <p>That is admin dashboard site, you have to login to be able to edit your personal website...</p>
          <h4>Login button is in the navbar. Remember you won't be able to change anything on your main website through that dashboard unless you are logged in as the admin</h4>
        </Container>
      </main>
    )
  }
  return (
    <>
    <main className="page pt-[100px] z-0">
    <Container >
      <h1 className="text-lg md:text-[2rem] lg:text-[2rem] xl:text-3xl">adsfoi;njweopi</h1>
      <div>
        <p>safddddddddddddddd</p>
        <p>safddddddddddddddd</p>
        <p>safddddddddddddddd</p>
        <p>safddddddddddddddd</p>
        <p>safddddddddddddddd</p>
        <p>safddddddddddddddd</p>
        <p>safddddddddddddddd</p>
        <p>safddddddddddddddd</p>
        </div>
    </Container>
    </main>
    </>
  );
}
