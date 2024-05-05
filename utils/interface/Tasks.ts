export interface Task {
    id: number;
    name: string;
    description: string;
    important: boolean;
    finalDate: Date;
    addedDate: Date;
    directoryId: number;
}

export interface TaskFields {
    name: string;
    description: string;
    directoryId: number | null;
    important: boolean;
    finalDate: Date | null;
    id?: number;
    addedDate?: Date;
    directoryName?: string;
  }