import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import SideBar from "./SideBar";
import "./App.css";
import { Button, DangerButton, PrimaryButton, SecondaryButton } from "./Button";

const App = () => {
  return (
    <div>
      <Button title={"Hi There"} />
      <PrimaryButton
        title="Hey Alert"
        onClick={() => alert("Hey There Primary")}
      />
      <DangerButton title="Danger" onClick={() => alert("Be carefull.")} />
      <SecondaryButton title="Secondary" />
    </div>
  );
  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       flexDirection: "column",
  //       width: "100vw",
  //       height: "100vh",
  //     }}
  //   >
  //     <Header />

  //     <div style={{ flex: 1, display: "flex" }}>
  //       <SideBar />
  //       <Main />
  //     </div>
  //     <Footer />
  //   </div>
  // );
};

export default App;
