import { Table } from 'antd';

interface Props {
  teams: string[][] | null;
}

function TeamTable({ teams }: Props) {
  return (
    <Table
      columns={[
        {
          title: '조',
          dataIndex: '0',
          key: 'team',
          render: (value, record, index) => `${index + 1} 조`,
        },
        {
          title: '조원1',
          dataIndex: '0',
          key: 'team_1',
        },
        {
          title: '조원2',
          dataIndex: '1',
          key: 'team_2',
        },
        {
          title: '조원3',
          dataIndex: '2',
          key: 'team_3',
        },
        {
          title: '조원4',
          dataIndex: '3',
          key: 'team_4',
        },
      ]}
      dataSource={teams || []}
      rowKey={(record) => record.join(',')}
      pagination={false}
    />
  );
}

export default TeamTable;
