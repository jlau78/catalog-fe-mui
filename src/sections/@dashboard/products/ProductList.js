import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// @mui
import { Grid} from '@mui/material';
import { getItems, getItemsByQuery } from '../../../API';

import ShopProductCard from './ProductCard';


// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {

  const [searchParams, setSearchParams] = useSearchParams()
  const queryParam = searchParams.get('query')
  // const query = (queryParam === undefined) ? '' : queryParam 
  const query = queryParam || ''

  const [items, setItems] = useState([])

  useEffect(() => {
    fetchItems(query)
  }, [query])

  function fetchItems(query) {
    console.log(`Search for items with query:${query}`)
    if (query) {
      getItemsByQuery(query).then(({status, data}) => {
       getItems().then(({status, data}) => {
        if (status !== 200) {
          throw new Error(`Error: Failed to getItems for query ${query}`)
        }
        setItems(data.items)
       
      }).catch((err) => console.error(err))
      })
    } else {
      getItems().then(({status, data}) => {
        if (status !== 200) {
          throw new Error(`Error: Failed to getItems for query ${query}`)
        }
        setItems(data.items)

      }).catch((err) => console.error(err))
    }
  }

  return (
    <Grid container spacing={3} {...other}>
      {items && items.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
