export interface ITask {
  id: number;
  text: string;
  deadline: Date | string;
  done: boolean;
  warning: boolean;
}