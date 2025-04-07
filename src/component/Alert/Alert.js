import React, { useEffect } from 'react'
import { enqueueSnackbar, SnackbarProvider, useSnackbar } from 'notistack';

export default function Alert() {

    useEffect(() => {
        enqueueSnackbar('Hello Fruitables',
            {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            }

        )
    }, [])
    return (
        <div>Alert</div>
    )
}
