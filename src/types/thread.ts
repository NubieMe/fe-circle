export type Thread = {
    id: number;
    content: string;
    image: string[] | null;
    likes: Like[];
    replies: any[];
    created_at: string;
    updated_at: string;
    author: {
        id: number;
        name: string;
        username: string;
        picture: string | null;
    };
    user?: number;
    username?: string;
};

export type DetailThread = {
    id: number;
    content: string;
    image: string[] | null;
    likes: Like[];
    replies: any[];
    created_at: string;
    updated_at: string;
    author: {
        id: number;
        name: string;
        username: string;
        picture: string | null;
    };
};

export type postThread = {
    content: string;
    image: FileList | null | undefined;
};

export type replyThread = {
    content: string;
    image: File | null;
    author: number;
};

export type Like = {
    id: number;
    author: {
        id: number;
    };
};
