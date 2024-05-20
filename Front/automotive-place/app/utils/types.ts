type TUser = {
    id: string,
    name: string,
    description: string,
    email?: string,
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
    isLikedByAuthUser?: boolean,
    images?: string[],
    authorId:    string,
    author?:    TUser
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
    likesCount: number,
    name:      string,
    description: string,
    isLikedByAuthUser?: boolean,
    itemType:  ItemTypes,
    likes?:    TCarItemLikes[]
    authorId:    string,
    projectId?: string,
    project?:   TProject,
    author?:    TUser
}

type TCarItemCreate = {
    forSell:   boolean,
    isVisible: boolean,
    inUse:     boolean,
    name:      string,
    description: string,
    itemType:  ItemTypes,
    authorId:    string,
    projectId?: string,
}

type TCarItemLikes = {

}

type ItemTypes = "Turbo" | "Exhaust" | "Kompressor" | "Brakes" | "Audio" | "Clutch" | "Suspension" | "Engine Tune-up" | "Transmission" | "Wheels" | "Tires" | "Fuel Injectors" | "Cooling System" | "Battery" | "Alternator" | "Starter Motor" | "Steering System" | "Lights" | "Body Kit";

type TSearchOptions = {
    query: string,
    type: "local" | "database"
}
// Tłumaczenia:
// Turbo: Turbo
// Exhaust: Układ wydechowy
// Kompressor: Sprężarka (lub Kompresor)
// Brakes: Hamulce
// Audio: System audio
// Clutch: Sprzęgło
// Suspension: Zawieszenie
// Engine Tune-up: Regulacja silnika
// Transmission: Skrzynia biegów
// Wheels: Koła
// Tires: Opony
// Fuel Injectors: Wtryskiwacze paliwa
// Cooling System: Układ chłodzenia
// Battery: Bateria
// Alternator: Alternator
// Starter Motor: Rozrusznik
// Steering System: Układ kierowniczy
// Lights: Oświetlenie
// Body Kit: Zestaw karoserii


type TTableView = "elements" | "rows"

export type { TCarItem, TCarItemLikes, TProject, ItemTypes, TTableView, TSearchOptions }
export type { TCarItemCreate }