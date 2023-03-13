import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, Grid, Paper, styled, Typography } from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import PolicyIcon from '@mui/icons-material/Policy'
import ChurchIcon from '@mui/icons-material/Church'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'

const BACK = process.env.REACT_APP_BACK

const Typo = styled(Typography)(({ theme }) => ({
    marginBottom: 1,
    lineHeight: 2,
    display: 'flex',
    alignItems: 'center'
}))

export default function ProfileUI() {
    const token = useSelector(state => state.token)
    const name = useSelector(state => state.name)

    const [user, setUser] = useState({})

    useEffect(() => {
        fetch(`${BACK}/users/me`, { headers: { 'token': token } })
            .then(response => response.json())
            .then(data => setUser(data))
    }, [token])

    return (
        <Paper sx={{ height: 340, padding: '10px', margin: 0.5, boxShadow: '0px 0px 10px 0px #00000047' }}>
            <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                <Avatar alt={user.name} referrerPolicy="no-referrer" src={user.photo} sx={{ width: 100, height: 100 }} />
                <Typography variant="h6" color="primary" fontWeight={700} fontStyle="italic" sx={{ fontFamily: 'unset' }}>
                    {name}
                </Typography>
                <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                    <Typo variant="body2" color="primary">
                        <MedicalInformationIcon /> {user.id}
                    </Typo>
                    <Typo variant="body2" color="primary">
                        <EmailIcon /> {user.email}
                    </Typo>
                    <Typo variant="body2" color="primary">
                        <AccessTimeFilledIcon />{user.createdAt}
                    </Typo>
                    <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                        <Typo variant="body2" color="primary">
                            <LocalPhoneIcon />{user.phone}
                        </Typo>
                        <Typo variant="body2" color="primary">
                            <FingerprintIcon />{user.dni}
                        </Typo>
                    </Grid>
                    <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                        <Typo variant="body2" color="primary">
                            <VerifiedUserIcon />{user.username}
                        </Typo>
                        <Typo variant="body2" color="primary">
                            <PolicyIcon />{user.role ? user.role : 'Paciente'}
                        </Typo>
                    </Grid>
                    <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                        <Typo variant="body2" color="primary">
                            {user.sex === 'M' ? <><MaleIcon />Hombre</> : null}
                            {user.sex === 'F' ? <><FemaleIcon />Mujer</> : null}
                        </Typo>
                        <Typo variant="body2" color="primary">
                            <ChurchIcon />{user.civil}
                        </Typo>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}
