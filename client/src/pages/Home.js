import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // use useQuery hook to make the query request
  // loading is a part of apollo/client that shows the query is loading
  // data is the space where it is stored
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // loads the data for thoughts from data
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
          </div>
      </div>
    </main>
  );
};

export default Home;
