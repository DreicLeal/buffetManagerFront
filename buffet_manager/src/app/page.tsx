"use client"
import DishFrame from '@/components/dishFrame/DishFrame'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <DishFrame type='quente' name='Tofu'/>
      <DishFrame type='sopa' name='Sopa do campo'/>
      <DishFrame type='salada' name='Mix Verde'/>
      <DishFrame type='quente' name='Tofu'/>
      <DishFrame type='sopa' name='Sopa do campo'/>
      <DishFrame type='salada' name='Mix Verde'/>
      <DishFrame type='quente' name='Tofu'/>
      <DishFrame type='sopa' name='Sopa do campo'/>
      <DishFrame type='salada' name='Mix Verde'/>
      <DishFrame type='quente' name='Tofu'/>
      <DishFrame type='sopa' name='Sopa do campo'/>
      <DishFrame type='salada' name='Mix Verde'/>
    </main>
  )
}
