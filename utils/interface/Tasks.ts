export interface Task {
    id: number;
    name: string;
    description: string;
    important: boolean;
    finalDate: Date;
    addedDate: Date;
    directoryId: number;
}