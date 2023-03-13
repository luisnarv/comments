import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Grid, Paper } from '@mui/material'
import SamplesUI from './SamplesUI'
import ProfileUI from './ProfileUI'
import CategoriesUI from './CategoriesUI'
import OrdersUI from './OrdersUI'
import PaymentsUI from './PaymentsUI'

export default function DashboardUI() {
    // get role from store
    const role = useSelector((state) => state.role)
    // selected option state
    const [option, setOption] = useState('orders')
    // set options
    let options = ['orders', 'payments']
    if (role === 'ADMIN') options = [...options, 'categories', 'samples']
    // render component
    return (
        <Grid container direction="row" justifyContent="space-evenly" alignItems="center" sx={{ height: 540, width: '100%', backgroundColor: '#eaeaea' }}>
            <Paper sx={{ width: 320 }}>
                <Grid container direction="column">
                    <ProfileUI />
                    {options.includes('orders')
                        ? <Button
                            sx={{ margin: 0.5, boxShadow: '0px 0px 10px 0px #00000047' }}
                            variant={option === 'orders' ? 'contained' : 'outlined'}
                            onClick={() => { setOption('orders') }}>
                            Ordenes
                        </Button>
                        : null}
                    {options.includes('payments')
                        ? <Button
                            sx={{ margin: 0.5, boxShadow: '0px 0px 10px 0px #00000047' }}
                            variant={option === 'payments' ? 'contained' : 'outlined'}
                            onClick={() => { setOption('payments') }}>
                            Pagos
                        </Button>
                        : null}
                    {options.includes('categories')
                        ? <Button
                            sx={{ margin: 0.5, boxShadow: '0px 0px 10px 0px #00000047' }}
                            variant={option === 'categories' ? 'contained' : 'outlined'}
                            onClick={() => { setOption('categories') }}>
                            Categorias
                        </Button>
                        : null}
                    {options.includes('samples')
                        ? <Button
                            sx={{ margin: 0.5, boxShadow: '0px 0px 10px 0px #00000047' }}
                            variant={option === 'samples' ? 'contained' : 'outlined'}
                            onClick={() => { setOption('samples') }}>
                            Muestras
                        </Button>
                        : null}
                </Grid>
            </Paper>
            <Paper sx={{ width: 980, height: 526, padding: 0.5 }}>
                {option === 'orders' ? <OrdersUI /> : null}
                {option === 'payments' ? <PaymentsUI /> : null}
                {option === 'categories' ? <CategoriesUI /> : null}
                {option === 'samples' ? <SamplesUI /> : null}
            </Paper>
        </Grid>
    )
}
