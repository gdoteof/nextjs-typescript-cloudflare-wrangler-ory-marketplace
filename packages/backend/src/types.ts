type Metadata = {
    [key: string]: any;
}

interface Category {
    id: string;
    name: string;
    metadata: Metadata;
}

interface Item {
    id: string;
    name: string;
    metadata: Metadata;
    categories?: Category[];
}

type Success<T> = {
    kind: "success";
    value: T;
}

type Failure<E> = {
    kind: "failure";
    error: E;
}

type Result<T, E> = Success<T> | Failure<E>;


export type { Metadata, Category, Item, Result };
