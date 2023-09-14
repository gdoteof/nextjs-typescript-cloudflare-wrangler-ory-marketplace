type URL = string;
type BooleanString = "true" | "false";

interface Sponsor {
    name: string;
    id: number;
}

interface Specialty {
    name: string;
    id: number;
}

interface Expertise {
    code: string;
    name: string;
    id: number;
}

interface Experience {
    playing: null;
    teaching: null;
}

interface Cover {
    s: URL;
    t: URL;
    l: URL;
    m: URL;
}

interface Type {
    code: string;
    name: string;
    id: number;
}

interface Sport {
    code: string;
    name: string;
    id: number;
}

interface Boosting {
    total_score: number;
}

export interface Rate {
    avg: number | null;
    min: number | null;
    max: number | null;
    id: number | null;
}

export interface Profile {
    bio: string;
}

export interface Avatar {
    s: URL;
    t: URL;
    l: URL;
    m: URL;
}

export interface Certification {
    image: URL;
    name: string;
    id: number;
}

export interface Location {
    zip: string;
    country: string;
    package: BooleanString;
    city: string;
    address_1: string;
    address_2: null;
    lesson: BooleanString;
    state_province: string;
    point: {
        lon: number;
        lat: number;
    };
    phone: string;
    point_unresolved: BooleanString;
    name: string;
    id: number;
    event: BooleanString;
    primary: BooleanString;
    distance: number;
}

export interface LegacyProfile {
    sponsor: Sponsor[];
    specialty: Specialty[];
    customized: BooleanString;
    achievements: null;
    expertise: Expertise[];
    experience: Experience;
    tools: null;
    cover: Cover;
    reviews: null;
    customized_weight: number;
    booking_allowed: number;
    id: number;
    clubfitting: null;
    types: Type[];
    sports: Sport[];
    boosting: Boosting[];
    rates: Rate;
    profile: Profile[];
    avatar: Avatar;
    certifications: Certification[];
    review_totals: null;
    site: string;
    partners: null;
    name: string;
    locations: Location[];
    accolades: null;
    updated: string;
}

export function isLegacyProfile(obj: LegacyProfile): boolean {
return 'sponsor' in obj &&
    'specialty' in obj &&
    'customized' in obj &&
    'achievements' in obj &&
    'expertise' in obj &&
    'experience' in obj &&
    'tools' in obj &&
    'cover' in obj &&
    'reviews' in obj &&
    'customized_weight' in obj &&
    'booking_allowed' in obj &&
    'id' in obj &&
    'clubfitting' in obj &&
    'types' in obj &&
    'sports' in obj &&
    'boosting' in obj &&
    'rates' in obj &&
    'profile' in obj &&
    'avatar' in obj &&
    'certifications' in obj &&
    'review_totals' in obj &&
    'site' in obj &&
    'partners' in obj &&
    'name' in obj &&
    'locations' in obj &&
    'accolades' in obj &&
    'updated' in obj
}