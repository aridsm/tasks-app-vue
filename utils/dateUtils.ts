enum DayWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

export const daysWeek = {
    [DayWeek.Sunday]: {
        fullName: 'Domingo',
        abbreviation: 'Dom'
    },
    [DayWeek.Monday]: {
        fullName: 'Segunda-feira',
        abbreviation: 'Seg'
    },
    [DayWeek.Tuesday]:  {
        fullName: 'Terça-feira',
        abbreviation: 'Ter'
    },
    [DayWeek.Wednesday]: {
        fullName: 'Quarta-feira',
        abbreviation: 'Qua'
    },
    [DayWeek.Thursday]: {
        fullName: 'Quinta-feira',
        abbreviation: 'Qui'
    },
    [DayWeek.Friday]: {
        fullName: 'Sexta-feira',
        abbreviation: 'Sex'
    },
    [DayWeek.Saturday]: {
        fullName: 'Sábado',
        abbreviation: 'Sáb'
    },
}

enum Month {
    January = 0,
    February = 1,
    March = 2,
    April = 3,
    May = 4,
    June = 5,
    July = 6,
    August = 7,
    September = 8,
    October = 9,
    November = 10,
    December = 11,
}

export const months: {
    [key: number]: string
} = {
    [Month.January]: 'Janeiro',
    [Month.February]: 'Fevereiro',
    [Month.March]: 'Março',
    [Month.April]: 'Abril',
    [Month.May]: 'Maio',
    [Month.June]: 'Junho',
    [Month.July]: 'Julho',
    [Month.August]: 'Agosto',
    [Month.September]: 'Setembro',
    [Month.October]: 'Outubro',
    [Month.November]: 'Novembro',
    [Month.December]: 'Dezembro',
}
