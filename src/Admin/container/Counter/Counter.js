import React from 'react'
import { decrement, increment } from '../../../redux/action/counter.action'
import { Button, ButtonBase } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';

export default function Counter() {

  const c = useSelector((state => state.count));

  const dispatch = useDispatch()

  console.log(c);
  
    const handleIncrement = () => {
      dispatch(increment()) 
    }

    const handleDecrement = () => {
      dispatch(decrement()) 
    }

  return (
    <>
    <div>Counter</div>

    <Button onClick={handleIncrement}>+</Button>
    <span>{c.count}</span>
    <Button onClick={handleDecrement}>-</Button>
    </>
  )
}
