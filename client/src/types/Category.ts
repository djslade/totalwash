export interface Category {
    _id: string;
    name: string;
    parents: { _id: string, name: string, parents: string[], description: string, slug: string, photo: string }[];
    description: string;
    slug: string;
    photo: string;
}
