import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import TestUI from './TestUI';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FormControl, FormHelperText, Paper, TextField } from '@mui/material';

const BACK = process.env.REACT_APP_BACK

export default function TestsUI() {
    const [tests, setTests] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(1)

    useEffect(() => {
        fetch(`${BACK}/tests/search/?search=${search}&page=${page}&limit=5`)
            .then(response => response.json())
            .then(data => {
                setTests(data.rows)
                setCount(data.count)
            })
    }, [search, page])

    useEffect(() => setPage(1), [search])

    return (
        <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
            <Paper style={{ width: 360 }}>
                <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                    <FormControl sx={{ m: 1, width: 340 }}>
                        <TextField value={search} onChange={e => setSearch(e.target.value)} id="outlined-search" label="Search field" type="search" />
                        <FormHelperText>With label + helper text</FormHelperText>
                    </FormControl>
                    <Stack spacing={2}>
                        <Pagination
                            count={Math.round(count / 5)}
                            page={page}
                            onChange={(e, v) => setPage(v)}
                            renderItem={(item) => <PaginationItem
                                slots={{
                                    previous: ArrowBackIcon,
                                    next: ArrowForwardIcon
                                }}
                                {...item} />}
                        />
                    </Stack>
                </Grid>
            </Paper>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                {tests.map(test => <TestUI
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