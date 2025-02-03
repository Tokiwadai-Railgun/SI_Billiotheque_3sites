import { ColumnType, Generated, Insertable, JSONColumnType, Selectable, Updateable } from "kysely";

export interface Database {
		books: BookTable,
		site: SiteTable
}

export interface BookTable {
		isbn: string,
		title: string,
		author: string,
		description: string,
		cover: string,
		site_id: number | null,
		borrower_id: number | null,
		reserved_id: number | null,
}

export type Book = Selectable<BookTable>
export type NewBook = Insertable<BookTable>
export type BookUpdate = Updateable<BookTable>

export interface SiteTable {
		id: number,
		location: string
}


export type Site = Selectable<SiteTable>
export type NewSite = Insertable<SiteTable>
export type SiteUpdate = Updateable<SiteTable>
