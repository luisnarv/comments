import React from 'react'
import { Button, Grid, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../reducer';

const ButtonUI = styled(Button)(({ theme }) => ({
    backgroundColor: '#9b0000',
    '&:hover': {
        backgroundColor: '#d70000'
    }
}))

export default function TestUI({ id, name, description, price }) {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    return (
        <div className="TestUI">
            <div className="content">
                <div className="title">{name}</div>
                <div className="price">${price}.00</div>
                <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at posuere eros. Interdum et malesuada fames ac ante ipsum primis in faucibus.</div>
            </div>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                <Button>
                    Detalles
                </Button>
                {cart.includes(id) ? <ButtonUI color='secondary' onClick={() => dispatch(removeFromCart(id))}>
                    Quitar
                </ButtonUI> : <Button onClick={() => dispatch(addToCart(id))}>
                    Agregar
                </Button>}
            </Grid>
        </div>
    )
}