import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

// @mui
import { Container, Box, Card, Stack, Typography } from '@mui/material';
import ProductDetailsSummary from '../sections/@dashboard/products/details/ProductDetailsSummary';

export default function ProductDetailsPage(product) {

    return (
        <>

        <Container>
            <Typography variant="h6" sx={{ mb: 5 }}>
            Product
            </Typography>

            <ProductDetailsSummary product={product} />


        </Container>
        </>
    )
}