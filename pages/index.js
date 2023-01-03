import { useQuery } from "urql";
import { GET_PRODUCTS } from "../graphql/query";
import Product from "../Components/Product";
import styled from "styled-components";
import Link from "next/link";

export default function Home() {
  const [results] = useQuery({ query: GET_PRODUCTS ,
  variables: {
    pagination: {limit : 3}
  }});
  const { data, fetching, error } = results;

  const [latest] = useQuery({ query: GET_PRODUCTS,
  variables: {
    sort : "createdAt:desc",
    pagination: { limit: 3}
  }
  }); 
  const {data: latestData, fetching: latestFetching, error: latestError} = latest;

  if (fetching || latestFetching) return <p>Loading...</p>;
  if (error || latestError) return <p>Ugh ... {error.message}</p>;
  const products = data.products.data;
  const latestProducts = latestData.products.data;

  return (
    <>
      
      <main>
        <section>
          <h1 className="text-center">My Store</h1>
        <ProductGallery>
          {products.map((product) => (
            <Product key={product.attributes.slug} product={product} />
          ))}
        </ProductGallery>

        <div className="flex justify-center">
          <Link className="btn btn-sm" href='/products'>See more</Link>
        </div>
        </section>
        <br />
        <section>
          <h1 className="text-center">Latest Product</h1>
        <ProductGallery>
          {latestProducts.map((product) => (
            <Product key={product.attributes.slug} product={product} />
          ))}
        </ProductGallery>
        </section>
      </main>
    </>
  );
}

const ProductGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
`;
