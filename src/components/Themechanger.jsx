// import React, { useEffect } from 'react'
import { Button } from './index'
import { MdDarkMode } from "react-icons/md"
function Themechanger() {
    const handleTheme = () => {
        if (localStorage.getItem('theme') === 'dark') {
            localStorage.setItem('theme', 'light')
        } else {
            localStorage.setItem('theme', 'dark')
        }
    }
    // useEffect(() => {
    //     let istheme = localStorage.getItem('theme') || ''
    // }, [])

    return (
        <Button bgColor='bg-transparent' onClick={handleTheme}><MdDarkMode fontSize={23} /></Button>
    )
}

export default Themechanger
