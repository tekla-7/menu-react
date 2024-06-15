import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../components/hooks/useHttp"
import Error from "./Error";
const requestConfig={}
export default function Meals() {
 const {data:loadedMeals , isLoading ,error}=useHttp('http://localhost:3000/meals' , requestConfig,[])

if(isLoading){
  return <p className="center">Fetching ...</p>
}
if(error){
  return <Error title='gailed to fetch' message={error}></Error>
}
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
      <MealItem key={meal.id} meal={meal}/>
      })}
    </ul>
  );
}
