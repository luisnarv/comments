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

const Profile = styled(Paper)(({ theme }) => ({
    width: 320,
    height: 340,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    color: '#202020',
    border: '1px solid coral',
    background: 'linear-gradient(0deg, rgba(255,167,122,1) 0%, rgba(255,210,188,1) 100%)',
    transition: 'border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: 'inset 0 -3em 3em rgb(255 59 0 / 25%), 0.3em 0.3em 1em rgb(0 0 0 / 30%)'
}))

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
        <Profile>
            <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                <Avatar alt={user.name} referrerPolicy="no-referrer" src={user.photo} sx={{ width: 100, height: 100 }} />
                <Typography variant="h6" fontWeight={700} fontStyle="italic" sx={{ fontFamily: 'unset' }}>
                    {name}
                </Typography>
                <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                    <Typo variant="body2">
                        <MedicalInformationIcon /> {user.id}
                    </Typo>
                    <Typo variant="body2">
                        <EmailIcon /> {user.email}
                    </Typo>
                    <Typo variant="body2">
                        <AccessTimeFilledIcon />{user.createdAt}
                    </Typo>
                    <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                        <Typo variant="body2">
                            <LocalPhoneIcon />{user.phone}
                        </Typo>
                        <Typo variant="body2">
                            <FingerprintIcon />{user.dni}
                        </Typo>
                    </Grid>
                    <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                        <Typo variant="body2">
                            <VerifiedUserIcon />{user.username}
                        </Typo>
                        <Typo variant="body2">
                            <PolicyIcon />{user.role ? user.role : 'Paciente'}
                        </Typo>
                    </Grid>
                    <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                        <Typo variant="body2">
                            {user.sex === 'M' ? <><MaleIcon />Hombre</> : null}
                            {user.sex === 'F' ? <><FemaleIcon />Mujer</> : null}
                        </Typo>
                        <Typo variant="body2">
                            <ChurchIcon />{user.civil}
                        </Typo>
                    </Grid>
                </Grid>
            </Grid>
        </Profile>
    )
}
