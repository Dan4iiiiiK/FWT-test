export interface IPicture {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

export interface IAuthor {
  id: number;
  name: string;
}

export interface ILocations {
  id: number;
  location: string;
}

export interface IPictureParams {
  _limit: number;
  _page: number;
}

export interface IPageArray {
  id: number;
  page: number;
  isActive: boolean;
}

export interface IObject {
  authorId?: (number | null)[] | undefined;
  locationId?: (number | null)[] | undefined;
  from?: string | null;
  to?: string | null;
}

export interface IParams {
  page: number;
  search: string;
  limit: number;
  authorId?: (number | null)[] | undefined;
  locationId?: (number | null)[] | undefined;
  from?: string | null;
  to?: string | null;
}

export interface IObjectAuthorsAndLocations {
  object?: string;
  search?: string;
}
