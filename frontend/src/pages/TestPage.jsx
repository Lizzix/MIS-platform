import { Box } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';

const fetchExchanges = async () => {
  const res = await fetchExchanges('https://swapi.dev/api/planets/');
  return res.json();
};

function TestPage() {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('http://127.0.0.1:5000/exchanges/').then(res => res.json())
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);
  return (
    <div>
      {data.map(exchange => {
        return (
          <Box>
            <p>date_added: {exchange.date_added}</p>
            <p>id: {exchange.id}</p>
            <p>item: {exchange.item}</p>
            <p>notes: {exchange.notes}</p>
            <p>provider_uid: {exchange.provider_uid}</p>
            <p>receiver_uid: {exchange.receiver_uid}</p>
            <p>region: {exchange.region}</p>
            <p>status: {exchange.status}</p>
          </Box>
        );
      })}
    </div>
  );
}

export default TestPage;
