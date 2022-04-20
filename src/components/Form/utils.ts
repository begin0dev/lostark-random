import { SUPPORTER_LIST } from './constants';

import { UserJob } from './types';

export const divideUsers = (userJobs: UserJob[]) => {
  const supporters: Record<string, string[]> = {};
  const others: Record<string, string[]> = {};
  userJobs.forEach(({ username, jobs }) => {
    jobs.forEach((job) => {
      if (SUPPORTER_LIST.includes(job)) {
        if (!supporters[username]) supporters[username] = [];
        supporters[username].push(job);
      } else {
        if (!others[username]) others[username] = [];
        others[username].push(job);
      }
    });
  });
  return { supporters: Object.entries(supporters), others: Object.entries(others) };
};

const getRandomNumber = (number: number) => Math.floor(Math.random() * number);

type UserWithJobs = [string, string[]];

export const getRandomPickUser = (userWithJobs: UserWithJobs[], teamList: string[] = []) => {
  const excludeUserNames = teamList.map((userJob) => userJob.split('-')[0]);
  const users = userWithJobs.filter(([username]) => !excludeUserNames.includes(username));
  if (users.length === 0) return;

  const user = users[getRandomNumber(users.length)];
  const [userName, jobs] = user;
  const job = jobs.splice(getRandomNumber(jobs.length), 1)[0];
  teamList.push(`${userName}-${job}`);
  if (jobs.length === 0) userWithJobs.splice(userWithJobs.indexOf(user), 1);
};
