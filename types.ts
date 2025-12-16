export interface ScriptItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  script: string;
}

export interface NotificationState {
  show: boolean;
  message: string;
}
