import { useState } from "react";
import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects:[],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        projectId: prevState.selectedProjectId,
        text: text,
        id: taskId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }

    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(x => x.id != id)
      }
    });
  }

  function handleSelectProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    });
  }

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      };

      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        selectedProjectId: undefined
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    });
  };

  function handleDeleteProject(id) {
    console.log(`Deleting ${id}`)
    setProjectState(prevState => {
      const updatedProjects = prevState.projects.filter(project => project.id !== id);
      return {
        selectedProjectId: undefined,
        projects: updatedProjects
      }
    });
  }

  const selectedProject = projectState.projects.find(project => project.id == projectState.selectedProjectId)
  let content = <SelectedProject project={selectedProject} tasks={projectState.tasks} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} />;

  if(projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if(projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onPressNewProject={handleStartAddProject} />
  }

  
  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar onSelectProject={handleSelectProject}  onPressNewProject={handleStartAddProject} projects={projectState.projects} />
      {content}
    </main>
  );
}

export default App;
