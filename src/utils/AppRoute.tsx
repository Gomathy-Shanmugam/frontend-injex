import type { RouteObject } from "react-router-dom";
import Home from "../Components/Home/Home";
import Grade from "../Components/Grade/Grade";

import FlipBookUploader from "../Components/FlipBookUploader";
import RubricEditor from "../Components/Rubrics/RubricEditor";



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
    path: "/flipbook",
    element: <FlipBookUploader/>
    
  },
   {
    path: "/rubric",
    element: <RubricEditor/>
    
  }
]

export default AppRoute;