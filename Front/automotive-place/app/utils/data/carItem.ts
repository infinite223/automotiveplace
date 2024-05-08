import { TCarItem } from "../types";

const carItems: TCarItem[] = [
    {
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        forSell: false,
        inUse: false,
        isVisible: true,
        itemType: "Turbo",
        name: "Turbo K04",
        projectId: "",
    },
    // Dodaj tutaj kolejne obiekty, aby uzyskać łącznie 10
    {
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        forSell: true,
        inUse: false,
        isVisible: true,
        itemType: "Turbo",
        name: "V8",
        projectId: "",
    },
    // ...itd.
];

// Dodaj łącznie 10 obiektów
for (let i = 0; i < 8; i++) {
    carItems.push({
        id: (i + 3).toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat iaculis elementum. Donec fermentum, turpis nec condimentum consectetur, libero libero pretium erat, sit amet congue mi lorem et ligula. Fusce odio tortor, feugiat eu mi porta, auctor aliquet nulla.",
        forSell: i % 2 === 0,
        inUse: i % 3 === 0,
        isVisible: true,
        itemType: "Turbo",
        name: "Item " + (i + 1),
        projectId: "",
    });
}

export { carItems }  