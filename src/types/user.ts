export type user = {
    id: number;
    username: string;
    name: string;
    picture: string | null;
    bio: string;
    following: any[];
    follower: any[];
};

export type users = {
    id: number;
    username: string;
    name: string;
    picture: string;
    bio: string;
    following?: any[];
    follower?: any[];
};

export type userProfile = {
    id: number;
    name: string;
    username: string;
    email: string;
    picture: string;
    cover: string;
    bio: string;
    created_at: string;
    following: any[];
    follower: any[];
    threads: any[];
};
