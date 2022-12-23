import { useQuery } from "urql";
import { GET_PRODUCTS } from "../graphql/query";
import Product from "../Components/Product";
import styled from "styled-components";

export default function Home() {
  const [results] = useQuery({ query: GET_PRODUCTS });
  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Ugh ... {error.message}</p>;
  const products = data.products.data;

  return (
    <>
      
      <main>
        <h1>My Store</h1>
        <ProductGallery>
          {products.map((product) => (
            <Product key={product.attributes.slug} product={product} />
          ))}
        </ProductGallery>
      </main>
    </>
  );
}

const ProductGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
`;
