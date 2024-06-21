import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Query, Product } from "./generated/graphql";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
    products {
      id
      name
      price
    }
  }
`;

const Users: React.FC = () => {
  const { loading, error, data } = useQuery<Query>(GET_USERS);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    // <Query
    <div>
      <h2>Users</h2>
      <ul>
        {data &&
          data.users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
      </ul>
      <hr />
      <h2>Products</h2>
      <ul>
        {data &&
          data.products.map((product: Product) => (
            <li key={product.id}>
              {`
              ${product.name} - R$ ${product.price}
            `}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
