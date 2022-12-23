import React from "react";
import { SINGLE_PRODUCT } from "../../graphql/query";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import styled from "styled-components";
import { useStoreContext } from "../../lib/contex";

const ProductDetails = () => {
  const { query } = useRouter();
  const { productQuantity, cartItems, increaseQty, decreaseQty, handleOnAdd } =
    useStoreContext();

  const [results] = useQuery({
    query: SINGLE_PRODUCT,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const product = data.products.data[0].attributes;
  const { title, description, image, slug } = product;
  const { url, width, height } = image.data.attributes.formats.medium;

  return (
    <ProductDetailsStyled>
      {/* For Using With Cloudinary */}
      {/* <Image src={url} alt={title} width={width} height={height} /> */}
      <img src={url} alt={title} />

      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>

        <Quantity>
          <span>Quantity</span>
          <button disabled={productQuantity < 2} onClick={decreaseQty}>
            <AiFillMinusCircle />
          </button>
          <p>{productQuantity}</p>
          <button onClick={increaseQty}>
            <AiFillPlusCircle />
          </button>
        </Quantity>

        <CartButtonStyled onClick={() => handleOnAdd(product, productQuantity)}>
            Add to Cart
        </CartButtonStyled>
      </ProductInfo>
    </ProductDetailsStyled>
  );
};

export default ProductDetails;

const ProductDetailsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  img {
    width: 40%;
  }
`;

const ProductInfo = styled.div`
  width: 40%;
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    background-color: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;
  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
  }
  svg {
    color: #494949;
  }
`;

const CartButtonStyled = styled.button`
  width: 100%;
  text-align: center;
  background-color: var(--primary);
  color: white;
  font-weight: 500;

  &:hover,
  &:active {
    background-color: black;
    box-shadow: 1px 2px 3px #ccc;
  }
`;
