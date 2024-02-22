export type Thread = {
    id: number;
    content: string;
    image: string[] | null;
    likes: number;
    isLiked: boolean;
    replies: number;
    created_at: string;
    updated_at: string;
    author: {
        id: number;
        name: string;
        username: string;
        picture: string | null;
    };
};

export type DetailThread = {
    id: number;
    content: string;
    image: string[] | null;
    likes: number;
    isLiked: boolean;
    replies: Array<any>;
    created_at: string;
    updated_at: string;
    author: {
        id: number;
        name: string;
        username: string;
        picture: string | null;
    };
};

export type Likes = {
    author: {
        id: number;
    };
};

export type Like = {
    id: number;
    author: {
        id: number;
    };
};
