export interface UserJob {
  username: string;
  jobs: string[];
}

export interface FormValues {
  userJobs: UserJob[];
}
