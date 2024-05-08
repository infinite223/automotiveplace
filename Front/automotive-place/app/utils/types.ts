type TUser = {
    id: string,
    name: string,
    description: string,
    email?: string
}

type TProject = {
    id: string,
    createdAt: Date,
    updatedAt: Date,      
    forSell:   boolean,
    isVisible: boolean,
    
    carMake: string,
    model: string,
    isVerified: boolean,
    imagesCount: number,
    likesCount: number,
    carItemsCount: number,
    stagesCount: number,
    garageId: string,
    userId: string,

    images?: string[]
    // likes: ....[]
    // garage: Garage
}

type TCarItem = {
    id: string,
    createdAt: Date,
    updatedAt: Date,      
    forSell:   boolean,
    isVisible: boolean,
    inUse:     boolean,
    name:      string,
    description: string,
    itemType:  ItemTypes,
    likes?:    TCarItemLikes[]
  
    projectId: string,
    project?:   TProject,
    author?:    TUser
}

type TCarItemLikes = {

}

type ItemTypes = "Turbo" | "Exhoust" | "Kompressor" | "Brakes" 

export type { TCarItem, TCarItemLikes, TProject, ItemTypes }