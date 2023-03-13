import React, { useEffect, useState } from 'react'
import {
    Grid, Pagination, PaginationItem, Paper,
    Stack, Typography
} from '@mui/material'
// components
import TestUI from './TestUI'

const BACK = process.env.REACT_APP_BACK

export default function PopularUI() {
    const [tests, setTests] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch(`${BACK}/tests/orders/?limit=10`)
            .then(response => response.json())
            .then(data => setTests(data))
    }, [])

    return (
        <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
            <Typography variant="h3" fontWeight={700} sx={{ fontFamily: 'unset', margin: 4 }}>
                Exámenes mas populares
            </Typography>
            <Paper>
                <Stack spacing={2}>
                    <Pagination
                        count={2}
                        page={page}
                        onChange={(e, v) => setPage(v)}
                        renderItem={(item) => <PaginationItem {...item} />}
                    />
                </Stack>
            </Paper>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                {tests.slice((page - 1) * 5, 5 + (5 * (page - 1))).map(test => <TestUI
                    key={test.id}
                    id={test.id}
                    name={test.name}
                    description={test.description}
                    price={test.price}
                />)}
            </Grid>
        </Grid>
    )
}