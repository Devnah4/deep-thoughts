import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import Auth from '../utils/auth';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

const SingleThought = props => {
  // Pulls ID data for a thought
  const { id: thoughtId } = useParams();
  
  // Stores the data when loading into data
  // loads the QUERY_THOUGHT from queries.js
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    // Pulls the id info
    variables: { id: thoughtId }
  });

  const thought = data?.thought || {};

  // returns loading... while data loads
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>
      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
    </div>
  );
};

export default SingleThought;
