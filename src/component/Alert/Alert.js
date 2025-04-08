import React, { useEffect } from 'react'
import { enqueueSnackbar, SnackbarProvider, useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useTimeout } from '@mui/x-data-grid/internals';
import { resetAlert } from '../../redux/Slice/errorSlice';

export default function Alert() {

    const alertSelector = useSelector(state => state.alert)

    console.log(alertSelector);

    const dispatch = useDispatch()

        useEffect(() => {
            if(alertSelector.message != ''){
            enqueueSnackbar(alertSelector.message,
                {
                    variant: alertSelector.variant,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                }
    
            )
            setTimeout(() => {dispatch(resetAlert())},2000)
        }
        }, [alertSelector.message])
    
   
    return (
        <div>Alert</div>
    )
}
