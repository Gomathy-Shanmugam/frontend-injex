import type { RouteObject } from "react-router-dom";
import Home from "../Components/Home/Home";
import Grade from "../Components/Grade/Grade";

import FlipBookUploader from "../Components/FacultyDashboard.tsx/FlipBookUploader";
import RubricEditor from "../Components/Rubrics/RubricEditor";
import CurriculumCourse from "../Components/FacultyDashboard.tsx/CurriculumCourse";
import GradeSummary from "../Components/Grade/Gradesummary";
import BasicCreateCourse from "../Components/FacultyDashboard.tsx/BasicsCreateCourse"
import ConceptofInjex from "../Components/Injexconcept/ConceptofInjex";
import PanelofExperts from "../Components/PanelofExperts/PanelofExperts";



const AppRoute: RouteObject[] = [
  {
    path: "/",
    element: <Home/>
    
  },
  {
    path: "/grade",
    element: <Grade/>
    
  },
   {
    path: "/gradesummary",
    element: <GradeSummary/>
    
  },
   {
    path: "/flipbook",
    element: <FlipBookUploader/>
    
  },
 {
  path:"/basic",
  element:<BasicCreateCourse/>
 },

   {
    path: "/rubric",
    element: <RubricEditor/>
    
  },
    {
    path: "/curriculum",
    element: <CurriculumCourse/>
    
  },
   {
    path: "/injex-concept",
    element: <ConceptofInjex/>
    
  },
   {
    path: "/panel-experts",
    element: <PanelofExperts/>
    
  }
]

export default AppRoute;