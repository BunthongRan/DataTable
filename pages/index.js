import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Layout from '@/components/layout'
import DataTable , { createTheme } from 'react-data-table-component';
import DataProduct from '@/components/product';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [product, setProduct] = useState([])
  const [search , setSearch] = useState(" ");
  const [filterProducts ,setFilterProducts] = useState([]);
  const getProducts = async () => {
         const response = await axios.get(`https://api.escuelajs.co/api/v1/products/`)
        setProduct(response.data)
        setFilterProducts(response.data)
        console.log(product)
  }

  const notify = () => {
    toast.info("Edit successfully updated !" , {
      theme : "colored",
      autoClose: 1000,
      position: "bottom-right",
    });
  };

  const notify1 = () => {
    toast.success("Deleted successfully !" , {
      theme : "colored",
      autoClose: 1000,
      position: "bottom-right",
    });
  };

  const columns= [
    {
        name: "Product Name",
        selector: row => row.title,
        sortable: true,
    },
    {
        name: "Price",
        selector: row => row.price,
    },
    {
      name: "Category",
      selector: row => row.category.name,
  },
    {
        name: "Photo",
        selector: row => <img src={row.images} width={100} style={{'borderRadius':'9px','margin':'10px'}}/>
        ,
    },
    {
        name: "Action",
        cell: (row) =>  <>
        <button className='btn btn-info m-2' onClick={notify}>Edit</button>
        <button className='btn btn-success' onClick={notify1}>Delete</button>
        </>,
      },

]

  useEffect(() => {
      getProducts();
  },[])

  useEffect(() => {
      const result = product.filter(products => {
        return products.category.name.toLowerCase().match(search.toLowerCase());
      });
      setFilterProducts(result);
  },[search])

  return (
      <Layout className='bg-white mb-3'>
        <main className='container bg-light mb-4 '>
        <h1 className='mb-3 mt-3'> Products Collections Data - Table</h1>
        <DataTable
        title='All Products Listing name'
        columns={columns}
        data={filterProducts}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='500px'
        subHeader
        subHeaderComponent={
          <input type='text'
           placeholder='Search product'
            className='form-control w-25'
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
        }
        />
        <ToastContainer/>
        </main>
      </Layout>
  )
}
