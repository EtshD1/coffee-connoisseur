import Airtable from 'airtable';

const token = process.env.AIRTABLE_TOKEN;
const base = process.env.AIRTABLE_BASE;

if (!token || token === "")
	throw new Error("Airtable token is not found");
if (!base || base === "")
	throw new Error("Airtable base is not found");

const coffeeStoreTable = new Airtable({
	apiKey: token
}).base(base)('coffee-stores');

export default coffeeStoreTable;
