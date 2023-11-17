import React from 'react'
import './style.scss'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { getAllProductThunk } from '../../redux/aciton/product'


const Login = () => { 
    const dispatch = useDispatch()
    
    const handleClick = () => { 
        dispatch(getAllProductThunk())    
    }


    return (
        <div className='login'>
            Login
            <Button onClick={() => handleClick()}>Check redux</Button>
        </div>
    )
}

export default Login