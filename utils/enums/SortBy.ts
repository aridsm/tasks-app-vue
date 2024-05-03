export enum SortBy {
    AddedFirst = 1,
    AddedLast = 2,
    AlphaOrder = 3,
    ReverseAlphaOrder = 4,
    AscendingFinalDate = 5,
    DescendingFinalDate = 6,
}

export const SortByList = [
    {
        id: SortBy.AddedFirst,
        name: 'Adicionados primeiro'
    },
    {
        id: SortBy.AddedLast,
        name: 'Adicionados por último'
    },
    {
        id: SortBy.AlphaOrder,
        name: 'Ordem alfabética'
    },
    {
        id: SortBy.ReverseAlphaOrder,
        name: 'Ordem alfabética inversa'
    },
    {
        id: SortBy.AscendingFinalDate,
        name: 'Data final ascendente'
    },
    {
        id: SortBy.DescendingFinalDate,
        name: 'Data final descendente'
    },
]