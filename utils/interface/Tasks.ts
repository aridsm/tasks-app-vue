export interface Task {
    id: number;
    name: string;
    description: string;
    important: boolean;
    finalDate: Date;
    addedDate: Date;
    directoryId: number;
    directoryName?: string;
}

export interface TaskFields {
    name: string;
    description: string;
    directoryId: number;
    important: boolean;
    finalDate: Date;
    id?: number;
    addedDate?: Date;
    directoryName?: string;
  }