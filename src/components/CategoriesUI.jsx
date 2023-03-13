import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Button, FormControl, Grid, MenuItem, Modal,
    Paper, Select, TextField, Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'

const BACK = process.env.REACT_APP_BACK

function Category({ id, name, handleEdit, handleDelete }) {
    return (
        <Paper sx={{ width: 320, margin: '2px', boxShadow: '0px 0px 10px 0px #00000047' }}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Typography title={name} sx={{ width: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {name}
                </Typography>
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

export default function CategoriesUI() {
    // get token from store
    const token = useSelector(state => state.token)
    // array of categories
    const [categories, setCategories] = useState([])
    // edit modal state and hooks
    const [openEdit, setOpenEdit] = useState(false)
    const handleOpenEdit = () => setOpenEdit(true)
    const handleCloseEdit = () => setOpenEdit(false)
    // delete modal state and hooks
    const [openDelete, setOpenDelete] = useState(false)
    const handleOpenDelete = () => setOpenDelete(true)
    const handleCloseDelete = () => setOpenDelete(false)
    // selected category state
    const [category, setCategory] = useState('')
    // merge state (category fk in tests => merge category)
    const [merge, setMerge] = useState('')
    // edit handler
    const handleEdit = (sample) => {
        handleOpenEdit()
        setCategory(sample)
    }
    // delete handler
    const handleDelete = (sample) => {
        handleOpenDelete()
        setCategory(sample)
    }
    // input handler
    const handleChange = (event) => {
        setCategory({ ...category, [event.target.name]: event.target.value })
    }
    // select handler
    const handleSelect = (event) => {
        setMerge(event.target.value)
    }
    // edit request
    const sendEdit = () => {
        fetch(`${BACK}/categories/${category.id}`, {
            method: 'put',
            headers: { 'token': token, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: category.name })
        }).then(() => handleCloseEdit())
    }
    // delete request
    const sendDelete = () => {
        fetch(`${BACK}/categories/${category.id}/${merge}`, {
            method: 'delete',
            headers: { 'token': token }
        }).then(() => handleCloseDelete())
    }
    // reload list effect
    useEffect(() => {
        fetch(`${BACK}/categories/admin`, { headers: { 'token': token } })
            .then(response => response.json())
            .then(data => setCategories(data))
    }, [token, openEdit, openDelete])
    // render component
    return (
        <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
            <Modal open={openEdit} onClose={handleCloseEdit}>
                <Paper sx={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)', width: 400,
                    bgcolor: 'background.paper', border: '2px solid #000',
                    boxShadow: 24, p: 4
                }}>
                    <TextField name="name" value={category.name} onChange={handleChange} variant="standard" />
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
                            {categories
                                .filter(c => c.id !== category.id)
                                .map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
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
                {categories
                    .slice(0, 36)
                    .map(c => <Category key={c.id} id={c.id} name={c.name} handleEdit={handleEdit} handleDelete={handleDelete} />)}
            </Grid>
        </Grid>
    )
}