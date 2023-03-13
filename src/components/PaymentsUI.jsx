import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Button, Grid, Paper, Typography
} from '@mui/material'
import PaidIcon from '@mui/icons-material/Paid'
import AddIcon from '@mui/icons-material/Add'

const BACK = process.env.REACT_APP_BACK

function Payment({ id }) {
    return (
        <Paper sx={{ width: 320, margin: '2px', boxShadow: '0px 0px 10px 0px #00000047' }}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Typography title={id} sx={{ width: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {id}
                </Typography>
                <Button>
                    <PaidIcon />
                </Button>
            </Grid>
        </Paper>
    )
}

export default function PaymentsUI() {
    // get token from store
    const token = useSelector(state => state.token)
    const role = useSelector(state => state.role)
    // array of payments
    const [payments, setPayments] = useState([])
    // reload list effect
    useEffect(() => {
        fetch(`${BACK}/payments/${role === 'ADMIN' ? 'admin' : ''}`, { headers: { 'token': token } })
            .then(response => response.json())
            .then(data => setPayments(data))
    }, [token, role])
    // render component
    return (
        <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
            <Paper sx={{
                width: 968, marginBottom: 0.25, marginTop: 0.1,
                boxShadow: '0px 0px 10px 0px #00000047'
            }}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Button>
                        <AddIcon />
                    </Button>
                </Grid>
            </Paper>
            <Grid container direction="column" alignItems="center" sx={{ height: 480 }}>
                {payments
                    .slice(0, 36)
                    .map(o => <Payment key={o.id} id={o.id} />)}
            </Grid>
        </Grid>
    )
}