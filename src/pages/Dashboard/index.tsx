import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logo from '../../assets/logo-page.svg';
import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="logo" />
      <Title>Explore repositórios no GitHub!</Title>

      <Form action="">
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars.githubusercontent.com/u/9078587?s=400&u=85efe5300ff5dad5c2dadd9bbaac3eda8feb808a&v=4"
            alt="lindo homem"
          />
          <div>
            <strong>Rocketseat/unform</strong>
            <p>Descrição base do repositório</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
