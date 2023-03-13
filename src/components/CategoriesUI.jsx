import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

const BACK = process.env.REACT_APP_BACK

function Category({ id, name, reload }) {
    const token = useSelector(state => state.token)

    const [state, setState] = useState()

    const [input, setInput] = useState(name)

    const handleCheck = () => {
        setState()
        handleEdit()
    }

    const handleClose = () => {
        if (state === 'edit') setInput(name)
        setState()
    }

    const handleEdit = () => {
        fetch(`${BACK}/categories/${id}`, {
            method: 'put',
            headers: { 'token': token, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: input })
        }).then(reload())
    }

    return (
        <Paper sx={{ padding: '5px', width: 360 }}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Box sx={{ width: 140 }}>
                    {state === undefined ? name : null}
                    {state === 'edit' ? <TextField variant="standard" value={input} onChange={e => setInput(e.target.value)} /> : null}
                </Box>
                {state === undefined ? <Button onClick={() => setState('edit')}>
                    <EditIcon />
                </Button> : null}
                {state === undefined ? <Button onClick={() => setState('delete')}>
                    <DeleteIcon />
                </Button> : null}
                {state === 'edit' || state === 'delete' ? <Button onClick={handleCheck}>
                    <CheckIcon />
                </Button> : null}
                {state === 'edit' || state === 'delete' ? <Button onClick={handleClose}>
                    <CloseIcon />
                </Button> : null}
            </Grid>
        </Paper>
    )
}

export default function CategoriesUI() {
    const token = useSelector(state => state.token)
    const [categories, setCategories] = useState([])

    const [reload, setReload] = useState({})

    useEffect(() => {
        fetch(`${BACK}/categories/admin`, { headers: { 'token': token } })
            .then(response => response.json())
            .then(data => setCategories(data))
    }, [token, reload])

    return (
        <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
            {categories.map(c => <Category key={c.id} id={c.id} name={c.name} reload={() => setReload({})} />)}
        </Grid>
    )
}