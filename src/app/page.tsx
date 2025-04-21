import NavBar from "@/components/NavBar"
import FirstPage from "@/components/FirstPage"
export default function Home() {

  return (
    <div className="flex flex-col items-center mt-10">
      <NavBar />
      <a href="wow">click</a>
      <FirstPage />
      
    </div>
  );
}
