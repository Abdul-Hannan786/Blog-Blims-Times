export type UserType = {
    email: string,
    uid: string,
    userType: string,
    username: string
}

export type BlogType = {
    title: string
    file: File
    tag: string
    content: string
    slug: string
    createdDate: string
    docID?:string
    imageURL?:string
}