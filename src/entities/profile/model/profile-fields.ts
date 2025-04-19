export type ProfileField = {
  label: string;
  value?: string;
  callback?: (value: string) => void;
  confirmed?: boolean;
  editable?: boolean;
}