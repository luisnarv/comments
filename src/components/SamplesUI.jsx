import { Button, FormControl, Grid, MenuItem, Modal, Paper, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

const BACK = process.env.REACT_APP_BACK

function Sample({ id, name, handleEdit, handleDelete }) {
    return (
        <Paper sx={{ padding: '5px', width: 600 }}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                {name}
                <Button onClick={() => handleEdit({ id, name })}>
                    <EditIcon />
                </Button>
                <Button onClick={() => handleDelete({ id, name })}>
                    <DeleteIcon />
                </Button>
            </Grid>
        </Paper>
    )
}

export default function SamplesUI() {
    const token = useSelector(state => state.token)
    const [samples, setSamples] = useState([])

    const [openEdit, setOpenEdit] = useState(false)
    const handleOpenEdit = () => setOpenEdit(true)
    const handleCloseEdit = () => setOpenEdit(false)
    const [openDelete, setOpenDelete] = useState(false)
    const handleOpenDelete = () => setOpenDelete(true)
    const handleCloseDelete = () => setOpenDelete(false)

    const [sample, setSample] = useState('')

    const handleEdit = (sample) => {
        handleOpenEdit()
        setSample(sample)
    }

    const handleDelete = (sample) => {
        handleOpenDelete()
        setSample(sample)
    }

    const handleChange = (event) => {
        setSample({ ...sample, [event.target.name]: event.target.value })
    }

    const handleSelect = (event) => {
        setMerge(event.target.value)
    }

    const [merge, setMerge] = useState({ id: '' })

    const sendEdit = () => {
        fetch(`${BACK}/samples/${sample.id}`, {
            method: 'put',
            headers: { 'token': token, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: sample.name })
        }).then(() => handleCloseEdit())
    }

    const sendDelete = () => {
        fetch(`${BACK}/samples/${sample.id}/${merge}`, {
            method: 'delete',
            headers: { 'token': token }
        }).then(() => handleCloseDelete())
    }

    useEffect(() => {
        fetch(`${BACK}/samples/admin`, { headers: { 'token': token } })
            .then(response => response.json())
            .then(data => setSamples(data))
    }, [token, openEdit, openDelete])

    return (
        <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
            <Modal open={openEdit} onClose={handleCloseEdit}>
                <Paper sx={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)', width: 400,
                    bgcolor: 'background.paper', border: '2px solid #000',
                    boxShadow: 24, p: 4
                }}>
                    <TextField name="name" value={sample.name} onChange={handleChange} variant="standard" />
                    <Button>
                        <CheckIcon onClick={sendEdit} />
                    </Button>
                    <Button>
                        <CloseIcon onClick={handleCloseEdit} />
                    </Button>
                </Paper>
            </Modal>
            <Modal open={openDelete} onClose={handleCloseDelete}>
                <Paper sx={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)', width: 400,
                    bgcolor: 'background.paper', border: '2px solid #000',
                    boxShadow: 24, p: 4
                }}>
                    <FormControl>
                        <Select value={merge} label="Age" onChange={handleSelect}>
                            <MenuItem value={''}>Ninguna</MenuItem>
                            {samples.filter(s => s.id !== sample.id).map(s => <MenuItem value={s.id}>{s.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Button>
                        <CheckIcon onClick={sendDelete} />
                    </Button>
                    <Button>
                        <CloseIcon onClick={handleCloseDelete} />
                    </Button>
                </Paper>
            </Modal>
            {samples.map(s => <Sample key={s.id} id={s.id} name={s.name} handleEdit={handleEdit} handleDelete={handleDelete} />)}
        </Grid>
    )
}