import type { RouteObject } from "react-router-dom";

import Home from "../Components/Home/Home";
import Grade from "../Components/Grade/Grade";
import FlipBookUploader from "../Components/FacultyDashboard.tsx/FlipBookUploader";
import RubricEditor from "../Components/Rubrics/RubricEditor";
import CurriculumCourse from "../Components/FacultyDashboard.tsx/CurriculumCourse";
import GradeSummary from "../Components/Grade/Gradesummary";
import BasicCreateCourse from "../Components/FacultyDashboard.tsx/BasicsCreateCourse";
import ConceptofInjex from "../Components/Injexconcept/ConceptofInjex";
import PanelofExperts from "../Components/PanelofExperts/PanelofExperts";
import JobLink from "../Components/JobLink/JobLink";
import FacultyDevelopment from "../Components/Facultydevelopment/Facultydevelopment";
import StartupSection from "../Components/StartUp/StartupSection";
import Industryproject from "../Components/IndustryProject/Industryproject";
import Ownventure from "../Components/Ownventure/Ownventure";
import Sidenav from "../Components/Dashboard/Sidenav";
import Dashboard from "../Components/Dashboard/Dashboard";
import CollegeList from "../Components/Dashboard/CollegeList";
import CollegeRegister from "../Components/Dashboard/CollegeRegister";
import RegistrationDetails from "../Components/Dashboard/RegistrationDetails";
import CollegeOverview from "../Components/Dashboard/CollegeOverview";
import StudentOverview from "../Components/Dashboard/StudentsOverview";
import MasterPipeline from "../Components/Master/MaterPipeline";

import ModuleView from "../Components/Master/ModuleView";
import DropdownView from "../Components/Master/DropdownView";
import OptionView from "../Components/Master/OptionView";

const AppRoute: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/grade", element: <Grade /> },
  { path: "/gradesummary", element: <GradeSummary /> },
  { path: "/flipbook", element: <FlipBookUploader /> },
  { path: "/basic", element: <BasicCreateCourse /> },
  { path: "/rubric", element: <RubricEditor /> },
  { path: "/curriculum", element: <CurriculumCourse /> },
  { path: "/injex-concept", element: <ConceptofInjex /> },
  { path: "/panel-experts", element: <PanelofExperts /> },
  { path: "/job-link", element: <JobLink /> },
  { path: "/faculty-development", element: <FacultyDevelopment /> },
  { path: "/start-up", element: <StartupSection /> },
  { path: "/industry-project", element: <Industryproject /> },
  { path: "/own-venture", element: <Ownventure /> },
  { path: "/sidenav", element: <Sidenav /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "registration/:email",
        element: <RegistrationDetails />,
      },
    ],
  },
  { path: "/college-register", element: <CollegeRegister /> },
  { path: "/colleges", element: <CollegeList /> },
  { path: "/college-overview", element: <CollegeOverview /> },
  { path: "/student-overview", element: <StudentOverview /> },

  // ------------------Masters-----------------

  { path: "/master-pipeline", element: <MasterPipeline /> },
  { path: "/pipeline/:pipelineId", element: <ModuleView /> },
  { path: "/pipeline/:pipelineId/module/:moduleId", element: <DropdownView /> },
  {
    path: "/pipeline/:pipelineId/module/:moduleId/:dropdownId",
    element: (
      <OptionView
        dropdownId={""}
        moduleId={""}
        pipelineId={""}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
];

export default AppRoute;
