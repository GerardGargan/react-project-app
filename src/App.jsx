import { useState } from "react";
import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";
import NoProjectSelected from "./components/NoProjectSelected";

function App() {

  const [openNewProject, setOpenNewProject] = useState(false);

  function createNewProject() {
    setOpenNewProject(true);
  }
  
  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onPressNewProject={createNewProject} />
      {openNewProject ? <NewProject /> : <NoProjectSelected />}
    </main>
  );
}

export default App;
