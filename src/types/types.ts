import { ColumnType, Generated, Insertable, JSONColumnType, Selectable, Updateable } from "kysely";

export interface Database {
		books: BookTable,
		site: SiteTable,
		person: PersonTable,
		customer: CustomerTable
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

export enum PersonType {
	"customer",
	"employee"
}

export interface PersonTable {
		id: string,
		first_name: string,
		last_name: string,
		address_id: number,
		role: PersonType
}

export type Person = Selectable<PersonTable>
export type NewPerson = Insertable<PersonTable>
export type UpdatePerson = Updateable<PersonTable>

export interface CustomerTable {
		id: string,
		email: string,
		phone: string,
		person_id: number,
}

export type Customer = Selectable<CustomerTable>
export type NewCustomer = Insertable<CustomerTable>
export type UpdateCustomer = Updateable<CustomerTable>
