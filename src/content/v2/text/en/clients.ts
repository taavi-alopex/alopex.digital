// Client wording (EN). Keys and system order must match CLIENT_DATA in ../../clients.ts.
import type { ClientText } from "../types";

export const clients: Record<string, ClientText> = {
  packtailor: {
    name: "Packtailor",
    industry: "Packaging · EU",
    status: "Client since 2026",
    title: "From finding new brands to answering them, in one system",
    result: "Every lead is checked before a campaign, and every reply is answered in the customer's language.",
    systems: [
      { title: "Finding leads", before: "Prospects were collected by hand, and many emails bounced.", built: "Search and maps find brands. The system checks each website for signs that the brand packs in pouches, adds contact people and verifies every email address.", now: "Only checked, relevant leads reach the campaigns." },
      { title: "Sales inbox with AI replies", before: "Replies from five email inboxes were read and answered by hand.", built: "One inbox for the whole team. Replies are sorted by meaning, answers are drafted in the customer's language, and files and photos stay in the thread.", now: "Sales reads the draft, edits it and clicks Send." },
      { title: "Quote reminders", before: "Quotes went out, and follow-ups depended on someone remembering.", built: "A reminder on the same weekday every week, three at most, also for deals that came in by phone or email.", now: "No quote goes quiet without anyone noticing." },
      { title: "Unsubscribes and out-of-office replies", before: "\"Remove me\" emails and auto-replies needed someone to deal with them.", built: "Unsubscribes go to the blocklist and the CRM. Out-of-office replies get a short welcome-back email on the day the person returns.", now: "Handled without anyone touching it." },
    ],
  },
  woodnest: {
    name: "Woodnest",
    industry: "Saunas · export",
    status: "Client since 2026",
    title: "New resellers across Europe, written to in their own language",
    result: "1,523 companies contacted. About 1 in 11 answered \"interested\".",
    systems: [
      { title: "Reseller lists per country", before: "There was no list of who sells saunas in each market.", built: "Researched lists of resellers and manufacturers in each country, with the decision maker and a verified email for each.", now: "Lists in the local language for the Nordics, the Baltics, Poland and Germany." },
      { title: "Campaigns in the local language", before: "The same English email went to everyone, and few replied.", built: "Campaigns written in each market's language, with follow-ups sent in the same email thread.", now: "Small lists in the local language get the best results." },
      { title: "Reply panel and alerts", before: "Replies were spread across eight mailboxes.", built: "A fast panel with every reply in one place, and an email to sales for every positive answer.", now: "The panel opens in under a second." },
    ],
  },
  ovision: {
    name: "Ovision",
    industry: "Print and promotional products · Estonia",
    status: "Running",
    title: "Invoices, production and their own CRM",
    result: "An invoice takes seconds instead of 10–15 minutes.",
    systems: [
      { title: "Invoices in Merit Aktiva", before: "Client data, registry codes and product lines were typed in by hand.", built: "When an order reaches \"awaiting invoice\", the invoice is created with data from the Business Register and the right reference number.", now: "Invoices are made in seconds and go out on time." },
      { title: "Production cards", before: "Production was tracked from memory, and design files sat in emails.", built: "A card for each product with its deadline and print method. Design files are saved to SharePoint, and invoicing starts when the last product is done.", now: "Nothing gets forgotten." },
      { title: "Quotes and costing in one place", before: "Costs were calculated in spreadsheets and quotes were made in another tool.", built: "Costing and the quote are built in one place, from the product catalogue.", now: "A quote takes one click instead of an hour." },
      { title: "Their own CRM, dashboard and AI assistant", before: "Sales lived in Trello, and payments were checked by hand.", built: "A CRM built for them and a live dashboard. Paid invoices move to \"paid\" by themselves, and an assistant can move deals between stages.", now: "The dashboard is running. The CRM is being built." },
      { title: "Digital roadmap and grant", before: "A plan was needed to apply for funding.", built: "A digital roadmap and the application for an implementation grant.", now: "Application submitted." },
    ],
  },
  gemoss: {
    name: "Gemoss",
    industry: "Coffee machines · Estonia",
    status: "Running",
    title: "Sales numbers the team trusts",
    result: "A report every morning instead of a monthly Excel.",
    systems: [
      { title: "Fair sales numbers every morning", before: "A monthly Excel counted response times at night and on weekends too, and pay depended on it.", built: "Response times counted in working hours only, and a daily report for each salesperson.", now: "Pay is based on real numbers." },
      { title: "Newsletters from the CRM", before: "Newsletters were sent from a separate tool.", built: "Newsletters go out from the CRM, with checks that they were delivered.", now: "Customers and campaigns are in one place." },
    ],
  },
  security: {
    name: "Dial Security",
    industry: "Security services · Estonia",
    status: "Running",
    title: "New building sites found before competitors see them",
    result: "New sites appear in the dashboard by themselves.",
    systems: [
      { title: "Building-site radar", before: "New sites were found by chance, often after a competitor had already signed.", built: "The system checks the building register and construction news for sites that don't have a security company yet.", now: "A fresh list, without searching." },
      { title: "Emails and call tasks", before: "Generic emails and no follow-up.", built: "Personal emails in the security manager's name, then a call task if nobody replies.", now: "Every site gets a first contact." },
      { title: "Sales dashboard", before: "No overview of sites and calls.", built: "A dashboard with each site's status, call results and one button to add a site to the emails.", now: "One screen for the whole sales team." },
    ],
  },
  moso: {
    name: "MOSO Bambuskeskus",
    industry: "Building materials · Estonia",
    status: "In progress",
    title: "A new website, with enquiries going straight into the CRM",
    result: "The prototype is approved. Launch is next.",
    systems: [
      { title: "Customer journey and brand", before: "No shared picture of how customers choose and buy.", built: "A map of the customer journey, a brand board and a marketing review.", now: "A plan for every page of the site." },
      { title: "New website", before: "An old website that was hard to edit.", built: "A new website the team can edit themselves, and a plan so that old links keep working.", now: "The team updates pages without help." },
      { title: "Enquiries into the CRM", before: "Enquiries arrived by email, and nobody tracked them.", built: "Email and form enquiries become deals in the CRM.", now: "Planned after launch." },
    ],
  },
  spetselektroodi: {
    name: "Spetselektroodi",
    industry: "Industrial supplies · Estonia",
    status: "In progress",
    title: "A digital roadmap, a grant, then new customers",
    result: "Three phases, partly paid for by a grant.",
    systems: [
      { title: "Roadmap and grant", before: "Plenty of ideas, but no plan and no budget for all of them.", built: "A digital roadmap and the application for an implementation grant.", now: "In progress." },
      { title: "New customers from the business register", before: "New customers came only through referrals.", built: "Phase 2: finding companies in the business register that look like their best customers.", now: "Planned." },
    ],
  },
  swa: {
    name: "SWA Poland",
    industry: "Student recruitment · Poland",
    status: "Running",
    title: "Recruitment campaigns in three languages",
    result: "Recruiters get only qualified candidates, tagged and ready to call.",
    systems: [
      { title: "Ads and forms for each city", before: "Forms collected many people who didn't qualify.", built: "Meta ads for each city with forms that ask the right questions. Budget moves to the cities that work.", now: "Only qualified candidates reach the recruiters." },
      { title: "SMS sequence with A/B tests", before: "Every candidate was followed up by hand.", built: "A series of text messages with A/B tests, and an alert to the recruiter when someone replies.", now: "Ready to reuse for every new campaign." },
      { title: "Visa process", before: "Visa steps were handled by email.", built: "A form, routing, calendars and emails for each step of the visa process.", now: "Planned." },
    ],
  },
  kastoram: {
    name: "Kastoram",
    industry: "Wooden pallets · Estonia",
    status: "Running",
    title: "A website you can talk to",
    result: "Enquiries arrive complete and ready to price.",
    systems: [
      { title: "Website with voice enquiries", before: "Phone and email enquiries often missed sizes and quantities.", built: "A new website where customers can describe their order by voice. It arrives as a complete, structured request.", now: "Running." },
      { title: "Quote tool", before: "Quotes were built by hand in Excel.", built: "A quote tool and CRM, offered as the next phase.", now: "Offer sent." },
    ],
  },
  koduaken: {
    name: "Koduaken",
    industry: "Windows · Estonia",
    status: "Running",
    title: "Every quote gets a follow-up",
    result: "16% more quotes turn into orders: from 9.5% to 11.1%.",
    systems: [
      { title: "Quote follow-ups", before: "Quotes were sent, and nobody followed up.", built: "Personal follow-up emails at the right time, and a task for sales when the customer goes quiet.", now: "About 388 quotes a month. 16% more of them become orders, with no new hires." },
    ],
  },
  consolis: {
    name: "Consolis",
    industry: "Precast concrete · Baltics",
    status: "Pilot",
    title: "Quantity tables from tender models and drawings",
    result: "A 98.9% match with the engineer's own table on 73 wall panels.",
    systems: [
      { title: "Quantities for tenders", before: "An engineer typed every element into Excel, about 12 hours per tender.", built: "Software that reads 3D models and PDF drawings, fills in the factory's own template and marks doubtful rows in yellow.", now: "In the pilot, the engineer checked the table instead of typing it." },
    ],
  },
};
