import './app.css';

import { Layout } from 'antd';
import styled from 'styled-components';

import Form from './components/Form';
import TeamTable from './components/TeamTable';
import { useState } from 'react';

function App() {
  const [teams, setTeams] = useState<string[][] | null>(null);

  return (
    <MainLayout>
      <h1>로스트아크 랜덤 조 생성</h1>
      <Content>
        <Form setTeams={setTeams} />
        <TeamTable teams={teams} />
      </Content>
    </MainLayout>
  );
}

export default App;

const MainLayout = styled(Layout)`
  padding: 24px;
  height: 100vh;
`;

const Content = styled.div`
  max-width: 600px;
`;
