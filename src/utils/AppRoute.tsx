import type { RouteObject } from "react-router-dom";
import Home from "../Components/Home/Home";
import Grade from "../Components/Grade/Grade";

import FlipBookUploader from "../Components/FacultyDashboard.tsx/FlipBookUploader";
import RubricEditor from "../Components/Rubrics/RubricEditor";
import CurriculumCourse from "../Components/FacultyDashboard.tsx/CurriculumCourse";
import GradeSummary from "../Components/Grade/Gradesummary";



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
    path: "/rubric",
    element: <RubricEditor/>
    
  },
    {
    path: "/curriculum",
    element: <CurriculumCourse/>
    
  }
]

export default AppRoute;