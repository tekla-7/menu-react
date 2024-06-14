import { createContext, useState } from "react";

const UserProgressContext=createContext({
     progress:'',
     showCart:()=>{},
     hideCart:()=>{},
     showCheckout:()=>{},
hideCheckout:()=>{},
})
export function UserProgressContextProvider({children}){
    const [userProgress , setUserProgress]=useState('')
    function showCart(){
        setUserProgress('cart')
    }
    function hideCart(){
        setUserProgress('')
    }
    function showCheckout(){
        setUserProgress('checkout')
    }
    function hideCheckout(){
        setUserProgress('')
    }
    const userProgressCtx={
        progress:userProgress,
        showCart,
        hideCart,
        showCheckout ,
        hideCheckout
    }
 return <UserProgressContextProvider.Provider value={userProgressCtx}>{children}</UserProgressContextProvider.Provider>
}
export default UserProgressContext