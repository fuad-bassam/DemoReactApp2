export interface TableColumnFormat<T> {
    id: keyof T;
    label: string;
    format?: (value: any) => string;
}