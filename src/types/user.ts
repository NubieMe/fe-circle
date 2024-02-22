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
};
