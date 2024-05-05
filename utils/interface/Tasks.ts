
export interface Task {
    id: number;
    name: string;
    description: string;
    important: boolean;
    finalDate: Date;
    addedDate: Date;
    directoryId: number;
    directoryName?: string;
    completed: boolean
}
export interface TaskFields {
    name: string;
    description: string;
    directoryId: number;
    important: boolean;
    finalDate: Date;
    completed: boolean
    id?: number;
    addedDate?: Date;
    directoryName?: string;
  }
  