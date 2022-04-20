import { useEffect } from 'react';
import { Form as AntdForm, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { JOB_LIST } from './constants';
import { divideUsers, getRandomPickUser } from './utils';
import { FormValues } from './types';

interface Props {
  setTeams: (teams: string[][]) => void;
}

function Form({ setTeams }: Props) {
  const [form] = AntdForm.useForm<FormValues>();

  const onFinish = (values: FormValues) => {
    const teams: string[][] = [];
    const { supporters, others } = divideUsers(values.userJobs);
    while (supporters.length > 0 || others.length > 0) {
      const team: string[] = [];
      if (supporters.length > 0) getRandomPickUser(supporters, team);
      else getRandomPickUser(others, team);
      getRandomPickUser(others, team);
      getRandomPickUser(others, team);
      getRandomPickUser(others, team);
      teams.push(team);
    }
    setTeams(teams);
  };

  useEffect(() => {
    form.setFieldsValue({
      userJobs: [{ username: '', jobs: [] }],
    });
  }, [form]);

  return (
    <AntdForm name="form" form={form} onFinish={onFinish} autoComplete="off">
      <AntdForm.List name="userJobs">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <FormItemWrapper align="baseline" key={key}>
                <AntdForm.Item
                  {...restField}
                  name={[name, 'username']}
                  rules={[{ required: true, message: '이름은 필수임!!' }]}
                >
                  <Input placeholder="이름" />
                </AntdForm.Item>
                <FormSelect
                  {...restField}
                  name={[name, 'jobs']}
                  rules={[{ required: true, message: '직업선택 필수임!!' }]}
                >
                  <Select mode="multiple" options={JOB_LIST} placeholder="직업선택" />
                </FormSelect>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </FormItemWrapper>
            ))}
            <AntdForm.Item>
              <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                이름, 직업 추가
              </Button>
            </AntdForm.Item>
          </>
        )}
      </AntdForm.List>
      <AntdForm.Item>
        <Button type="primary" htmlType="submit" block>
          랜덤 생성하기
        </Button>
      </AntdForm.Item>
    </AntdForm>
  );
}

export default Form;

const FormItemWrapper = styled(Space)`
  display: flex;
`;
const FormSelect = styled(AntdForm.Item)`
  width: 390px;
`;
