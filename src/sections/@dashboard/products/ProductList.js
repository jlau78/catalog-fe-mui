import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// @mui
import {Grid, TablePagination} from '@mui/material';
import { getItems, getItemsByQuery } from '../../../API';

import ShopProductCard from './ProductCard';


// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {

  const queryParam = searchParams.get('query')
  // const query = (queryParam === undefined) ? '' : queryParam 
  const query = queryParam || ''

  const [items, setItems] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <>
      <Grid container spacing={3} {...other}>
        {items && items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} key={product.id}/>
          </Grid>
        ))}


      </Grid>
      <TablePagination
        rowsPerPageOptions={[10, 30, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
