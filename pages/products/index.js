import Product from 'Components/Product'
import { GET_CATEGORIES, GET_PRODUCTS } from 'graphql/query';
import Head from 'next/head'
import React, { useState } from 'react'
import { useQuery } from 'urql';
import styled from 'styled-components';

const Index = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [results, reexecuteQuery] = useQuery({
         query: GET_PRODUCTS,
         variables: {
            filters : {
                category : {
                    slug : { eq :  selectedCategory }
                }
            }
         }
         });
  const { data, fetching, error } = results;
   

    const [categoriesResult] = useQuery({
        query: GET_CATEGORIES,
        variables : {},
    })

    const { data : categoriesData, fetching: categoriesFetching, error: categoriesError} = categoriesResult;

//     if (fetching || categoriesFetching ) return <p>Loading...</p>;
//   if (error || categoriesError ) return <p>Ugh ...{categoriesError.message} {error.message}</p>;
//   const products = data.products.data;
//   const categories = categoriesData.categories.data;

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    reexecuteQuery({ requestPolicy: 'network-only'});
  }

  return (
    <main className='flex container mx-auto'>
        <Head>
            <title>All Products by Category</title>
        </Head>
        <aside className='w-1/5'>
            {
                !categoriesFetching && !categoriesError ? (
                    categoriesData.categories.data.map((item) => (
                    <li 
                    onClick={() => handleCategorySelect(item.attributes.slug)}
                    className='list-none text-sm text-center border p-2 hover:cursor-pointer hover:text-black' 
                     key={item.id}>{item.attributes.name}</li>
                ))
                ) : <div>Loading... </div>
            }
        </aside>
        <div className='px-4 w-4/5'>
            <section>
                <ProductGallery>
                {!fetching && !error ? 
                (data.products.data.map((product) => (
                    <Product key={product.attributes.slug} product={product} />
                ))) : <div>Loading ...</div>}
                </ProductGallery>

               
                </section>
               
                
        </div>
    </main>
  )
}

export default Index

const ProductGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-gap: 2rem;
`;