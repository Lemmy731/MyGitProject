import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GitHubRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [startingLetterFilter, setStartingLetterFilter] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10; // Number of repositories per page

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/Lemmy731/repos?page=${page}&per_page=${perPage}`, {
          headers: {
            Authorization: `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`,
          },
        });
        console.log(response);
        let filteredRepositories = response.data;

        // Apply search query filter
        if (searchQuery) {
          filteredRepositories = filteredRepositories.filter(repo => repo.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // Apply language filter
        if (languageFilter) {
          filteredRepositories = filteredRepositories.filter(repo => repo.language === languageFilter);
        }

        // Apply starting letter filter
        if (startingLetterFilter) {
          filteredRepositories = filteredRepositories.filter(repo => repo.name.toLowerCase().startsWith(startingLetterFilter.toLowerCase()));
        }

        setRepositories(filteredRepositories);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchRepositories();
  }, [page, searchQuery, languageFilter, startingLetterFilter]);

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLanguageFilterChange = (event) => {
    setLanguageFilter(event.target.value);
  };

  const handleStartingLetterFilterChange = (event) => {
    setStartingLetterFilter(event.target.value);
  };

  return (
    <div>
      <h1>My GitHub Repositories</h1>
      <div>
        <input type="text" value={searchQuery} onChange={handleSearchInputChange} placeholder="Search repositories..." />
        <select value={languageFilter} onChange={handleLanguageFilterChange}>
          <option value="">All Languages</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          {/* Add more options as needed */}
        </select>
        <select value={startingLetterFilter} onChange={handleStartingLetterFilterChange}>
          <option value="">All Letters</option>
          <option value="a">A</option>
          <option value="b">B</option>
          {/* Add more options for other letters */}
        </select>
      </div>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            <Link to={`/repository/${repo.id}`}>
              {repo.name}
            </Link>
          </li>
          
        ) 
      ) }
      </ul>
      <div>
        <button onClick={() => goToPage(page - 1)} disabled={page === 1}>Previous Page</button>
        <button onClick={() => goToPage(page + 1)}>Next Page</button>
      </div>
    </div>
  );
};

export default GitHubRepositories;
