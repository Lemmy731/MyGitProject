import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RepositoryData = () => {
  const { id } = useParams();
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repositories/${id}`);
        setRepository(response.data);
      } catch (error) {
        console.error('Error fetching repository details:', error);
      }
    };

    fetchRepositoryDetails();
  }, [id]);

  if (!repository) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Repository Details</h2>
      <p>Name: {repository.name}</p>
      <p>FullName: {repository.full_name}</p>
      <p>Language: {repository.language}</p>
    </div>
  );
};

export default RepositoryData;