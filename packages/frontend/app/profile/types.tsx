export interface Sponsor {
    name: string;
    id: string;
}

export interface Specialty {
    name: string;
    id: string;
}

export interface Achievement {
    name: string;
    id: string;
}

export interface ExperienceDetail {
    name: string;
    id: string;
}

export interface Experience {
    playing: ExperienceDetail[];
    teaching: ExperienceDetail[];
}

export interface Expertise {
    code: string;
    name: string;
    id: string;
}

export interface Tool {
    name: string;
    id: string;
}

export interface Cover {
    s: string;
    t: string;
    l: string;
    m: string;
}

export interface Review {
    date: string;
    review: string;
    rating: string;
    reviewer: string;
    avatar: Cover | null;
}

export interface Clubfitting {
    name: string;
    id: string;
}

export interface FittingType {
    code: string;
    name: string;
    id: string;
}

export interface Sport {
    code: string;
    name: string;
    id: string;
}

export interface Profile {
    bio: string;
}

export interface Rates {
    avg: number;
    min: string;
    max: string;
    id: string;
}

export interface Certification {
    image: string;
    name: string;
    id: string;
}

export interface ReviewTotals {
    average_stars: number;
    review_count: string;
    star_count: string;
}

export interface Partner {
    name: string;
    acode: string;
}

export interface Location {
    zip: string;
    country: string;
    package: boolean;
    city: string;
    address_1: string;
    address_2: string;
    lesson: boolean;
    state_province: string;
    point: {
        lon: string;
        lat: string;
    };
    phone: string;
    point_unresolved: boolean;
    name: string;
    id: string;
    event: boolean;
    primary: boolean;
    distance: number;
}

export interface MainObject {
    sponsor: Sponsor;
    specialty: Specialty[];
    customized: boolean;
    achievements: Achievement[];
    experience: Experience;
    expertise: Expertise[];
    tools: Tool[];
    cover: Cover;
    customized_weight: string;
    reviews: Review[];
    booking_allowed: number;
    id: string;
    clubfitting: Clubfitting[];
    types: FittingType[];
    sports: Sport[];
    profile: Profile[];
    rates: Rates;
    avatar: Cover;
    certifications: Certification[];
    review_totals: ReviewTotals;
    site: string;
    partners: Partner[];
    name: string;
    locations: Location[];
    accolades: string[];
    updated: string;
}
