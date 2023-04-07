import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom'
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { name, description, images, cover, price, colors, status, priceSale } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        {images && images.length > 0  ?
          <StyledProductImg alt={name} src={images[0]} />
        : <Card sx={{
          textAlign: 'center',
          verticalAlign: 'center',
          fontSize: '1.2em',
          color: 'gray',
          backgroundColor: 'lightblue'
        }}>No image</Card>
        }

      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="/dashboard/item-detail" component={RouterLink} color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {description}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {colors => ( 
            <ColorPreview colors={colors} />
          )} 
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
