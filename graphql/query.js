export const GET_PRODUCTS = `
query {
  products {
    data {
      id 
      attributes {
        title
        description
        price
        slug
        image {
          data {
            attributes {
              formats
            }
          }
        }
      }
    }
  }
}
`;

export const SINGLE_PRODUCT = `
  query getProducts($slug: String!) {
    products(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          title
          slug
          description
          price
          image {
            data {
              attributes {
                formats
              }
            }
          }
        }
      }
  }
}
`
