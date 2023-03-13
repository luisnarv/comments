import React, { useEffect, useState } from 'react'
import { Avatar, Divider, Grid, Paper, Typography } from '@mui/material'

const BACK = process.env.REACT_APP_BACK

function Review({ author, avatar, content }) {
    return (
        <Paper sx={{ width: 360 }}>
            <Grid container direction="row" alignItems="center">
                <Avatar alt={author} referrerPolicy="no-referrer" src={avatar} sx={{ width: 50, height: 50, margin: 1, marginRight: 1.5 }} />
                <Typography variant="h6" color="primary" fontWeight={700} sx={{ fontFamily: 'unset' }}>
                    {author}
                </Typography>
            </Grid>
            <Divider />
            <Typography variant="subtitle1" fontStyle="italic" sx={{ margin: 2 }}>
                <b style={{ color: 'grey' }}>"</b> {content} <b style={{ color: 'grey' }}>"</b>
            </Typography>
        </Paper >
    )
}

export default function ReviewsUI() {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch(`${BACK}/reviews`)
            .then(response => response.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h3" fontWeight={700} sx={{ fontFamily: 'unset', margin: 4 }}>
                Mirá lo que opinan los pacientes de nosotros
            </Typography>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                {reviews
                    .slice(0, 3)
                    .map(r => <Review key={r.id} id={r.id} author={r.author} content={r.content} avatar={r.avatar} />)}
            </Grid>
        </Grid>
    )
}