"use client"
import IBuffetDatabase from "@/interface"
import { useState } from "react"
import styles from "./style.module.scss"


const Header = () => {
    const [dishes, setDishes] = useState<IBuffetDatabase[]>([])
    const addDishes = () => {

}
    return(
        <header className={styles.headerContainer}> 
        <h1>da Terra</h1>
        <button onClick={()=> addDishes}>Adicionar</button>
        </header>
    )
}

export default Header