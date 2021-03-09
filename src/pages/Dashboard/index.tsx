/* eslint-disable camelcase */
import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/logo-page.svg';
import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  const handleAddRepository = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue) {
      setInputError('Digite o autor/nome do repositório!');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${inputValue}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setInputValue('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }
  };

  return (
    <>
      <img src={logo} alt="logo" />
      <Title>Explore repositórios no GitHub!</Title>

      <Form
        hasError={Boolean(inputError)}
        action=""
        onSubmit={handleAddRepository}
      >
        <input
          placeholder="Digite o nome do repositório"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <a key={repository.full_name} href="teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
