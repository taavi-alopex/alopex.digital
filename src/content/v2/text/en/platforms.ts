// Search pages (GoHighLevel, GoHighLevel expert, n8n, RevOps) in English.
import type { PlatformId, PlatformLabels, PlatformPage } from "../../platforms";

export const labels: PlatformLabels = {
  fits: "A good fit when",
  notFits: "Not the best choice when",
  cases: "Built for our clients",
  allWork: "All our work",
  faq: "Common questions",
};

export const pages: Record<PlatformId, PlatformPage> = {
  "gohighlevel-agency-europe": {
    meta: {
      title: "GoHighLevel Agency in Europe | Alopex Digital",
      description: "We set up and run GoHighLevel for companies in Estonia, Poland and the rest of Europe: pipelines, calendars, email and SMS, data moved from your old CRM, and links to local accounting tools.",
    },
    crumb: "GoHighLevel agency · Europe",
    title: "GoHighLevel, set up for European companies",
    lead: "GoHighLevel is a CRM with email, SMS, calendars and automation in one place. We set it up for the way your team sells, move your data over and connect it to the tools you use in Europe, such as Merit Aktiva.",
    what: {
      title: "What GoHighLevel is",
      text: "One system for contacts, deals, emails, text messages, booking calendars, forms and simple websites. It replaces several separate tools, and everyone on the team sees the same history for each client.",
      fits: ["You follow up with many contacts by email, SMS or phone", "Your team books calls or meetings with clients", "You want leads, deals and messages in one place", "You are moving away from spreadsheets, Pipedrive or HubSpot"],
      notFits: ["You need an ERP for stock and production", "Your sales depend on an enterprise CRM that is deeply customised", "Only one person sells and a spreadsheet is enough"],
    },
    doTitle: "What we do with GoHighLevel",
    do: [
      { title: "Setup for your sales process", text: "Pipelines, deal stages, reminders, calendars and email templates that match how your team actually sells." },
      { title: "Moving your data", text: "Contacts, deals and notes moved from Pipedrive, HubSpot, Salesforce or Excel, and checked with you before you switch." },
      { title: "Links to your other tools", text: "Invoices to Merit Aktiva, enquiries from your website, data to and from your ERP. Built with n8n where GoHighLevel has no ready connection." },
      { title: "Any mailbox in the CRM", text: "Alopex Email Sync, our own Marketplace app, syncs any IMAP/SMTP mailbox with GoHighLevel both ways, not only Gmail and Outlook." },
      { title: "GDPR settings", text: "Consent fields, unsubscribe handling and data processing agreements, set up from the start and documented." },
      { title: "Training and support", text: "Training for your team in English, Estonian or Polish, and a monthly check-in once the system runs." },
    ],
    faq: [
      { q: "Can GoHighLevel be used in line with GDPR?", a: "Yes, if it is set up correctly: consent, unsubscribe handling and a data processing agreement. We set these up and document them." },
      { q: "Can you move our data from another CRM?", a: "Yes. We move contacts, deals and notes from Pipedrive, HubSpot, Salesforce or spreadsheets, and check the result with you before you switch." },
      { q: "Does it work with Estonian accounting software?", a: "Not out of the box. We connect it to Merit Aktiva and similar tools with our own integrations." },
      { q: "How long does a setup take?", a: "Usually 2–8 weeks, depending on how much data you have and how many tools need to be connected. You get a fixed price after the blueprint." },
    ],
  },

  "gohighlevel-expert": {
    meta: {
      title: "GoHighLevel Expert | Fixes, Integrations and Reports | Alopex Digital",
      description: "GoHighLevel experts for an account you already have: workflows that misfire, reports nobody trusts, integrations that stop. We review the account, fix what is broken and build what is missing.",
    },
    crumb: "GoHighLevel expert",
    title: "Get more out of the GoHighLevel account you already have",
    lead: "Many companies set up GoHighLevel themselves and then get stuck: workflows that fire twice, reports nobody trusts, integrations that stop. We review the account, fix what is broken and build what is missing.",
    what: {
      title: "When to call a GoHighLevel expert",
      text: "GoHighLevel can do a lot, which also makes it easy to end up with a messy account. A review usually shows a handful of fixes that make the biggest difference.",
      fits: ["Workflows run twice, loop or stop without a warning", "Sales numbers in GoHighLevel don't match reality", "You need a connection GoHighLevel doesn't offer", "Your team works around the CRM instead of in it"],
      notFits: ["You only need a simple pipeline and a booking calendar", "GoHighLevel's own tutorials already cover your case"],
    },
    doTitle: "What we do in your account",
    do: [
      { title: "Account review", text: "We go through pipelines, workflows, custom fields and integrations, and tell you what to fix first." },
      { title: "Workflow fixes", text: "Workflows that misfire are rebuilt and tested on real contacts before they go live again." },
      { title: "Reports you can trust", text: "Dashboards and morning reports with sales numbers that match what really happened." },
      { title: "Integrations", text: "Connections to accounting, ERP, website forms and other tools, built with the GoHighLevel API and n8n." },
      { title: "Our own apps", text: "When GoHighLevel can't do something, we build it. Alopex Email Sync is one of our Marketplace apps." },
      { title: "Training", text: "Your team learns to change things themselves, so they don't have to wait for us." },
    ],
    faq: [
      { q: "Can you work in our existing account?", a: "Yes. We work in your account with our own user, and we document every change we make." },
      { q: "Do we need a long contract?", a: "No. You can start with a review and a fixed set of fixes. Monthly support is optional." },
      { q: "What does a review cost?", a: "The review is the blueprint step: a small fixed fee that we agree before we start. If you then build with us, it is deducted from the build." },
      { q: "Do you also set up new accounts?", a: "Yes. See our GoHighLevel setup page for how we start a new account." },
    ],
  },

  "n8n-automation-agency": {
    meta: {
      title: "n8n Automation Agency | Workflows Built and Run in the EU | Alopex Digital",
      description: "We build n8n workflows for real business processes, run them on servers in the EU and fix them when something stops. CRM, email, accounting, spreadsheets and AI, connected.",
    },
    crumb: "n8n automation agency",
    title: "n8n automation, built and looked after",
    lead: "n8n is open-source software that moves data between your tools. We build n8n workflows for real business processes, run them on servers in the EU and get an alert when something stops.",
    what: {
      title: "What n8n is",
      text: "A tool that connects any system with an API: CRM, email, accounting, spreadsheets and AI models. It can run on your own server, so you don't pay per task and your data stays where you choose.",
      fits: ["The process runs across several tools", "You run so many tasks a month that per-task pricing gets expensive", "The data must stay in the EU", "The process has many rules and exceptions"],
      notFits: ["It is one simple link between two apps, where Zapier or Make is quicker to set up", "The tool you already use has the feature built in"],
    },
    doTitle: "What we do with n8n",
    do: [
      { title: "Workflows for one process", text: "From an incoming email or form to the CRM, the accounting system and a reply, including the cases that break simple automations." },
      { title: "AI steps", text: "AI that reads emails, PDFs and drawings inside a workflow, with a person checking the result where it matters." },
      { title: "Hosting in the EU", text: "n8n on a server in the EU, with backups, updates and an alert if a workflow fails." },
      { title: "Moving from Zapier or Make", text: "Existing automations moved to n8n when the number of tasks makes per-task pricing expensive." },
      { title: "Fixing existing workflows", text: "Slow, failing or undocumented workflows reviewed and rebuilt." },
      { title: "Documentation", text: "Every workflow is described: what starts it, what it does and what to do when it stops." },
    ],
    faq: [
      { q: "Self-hosted n8n or n8n Cloud?", a: "Both work. Self-hosted on an EU server costs less when you run many tasks and keeps the data under your control. n8n Cloud needs less upkeep. We recommend one after the blueprint." },
      { q: "Who owns the workflows?", a: "You do, once the work is paid. They run in your n8n or on a server we run for you, and you can export them at any time." },
      { q: "What happens when something breaks?", a: "We get an alert, fix it and tell you what happened. That is part of monthly support." },
      { q: "Do we need a developer on our side?", a: "No. One person who knows the process and can answer our questions is enough." },
    ],
  },

  "revops-agency-europe": {
    meta: {
      title: "RevOps Agency in Europe | Revenue Operations | Alopex Digital",
      description: "Revenue operations for European companies: one process and one set of data for marketing, sales and customer service. We map how a lead becomes a customer and build the CRM, automation and reports around it.",
    },
    crumb: "Revenue operations · Europe",
    title: "Revenue operations for European companies",
    lead: "Revenue operations means that marketing, sales and customer service work from the same data and the same process. We map how a lead becomes a customer in your company, then build the CRM, automation and reports that keep it that way.",
    what: {
      title: "What RevOps means in practice",
      text: "No lead waits for a reply, every quote gets a follow-up, and management sees the same numbers as the sales team. It is less about buying a new tool and more about connecting the ones you have.",
      fits: ["Leads come from several channels and some get lost", "Quotes are sent, but nobody follows up", "Sales numbers live in spreadsheets", "Marketing and sales disagree on what works"],
      notFits: ["You have one sales channel and a handful of clients", "The real problem is the product or the price, not the process"],
    },
    doTitle: "What we build",
    do: [
      { title: "A map of the process", text: "How a lead becomes a customer today, where it waits and where it gets lost." },
      { title: "One CRM for every channel", text: "Website, email, phone and fairs in one pipeline, with stages your team agrees on." },
      { title: "Follow-ups that run themselves", text: "Reminders and emails after every quote, so no offer is forgotten." },
      { title: "Finding new customers", text: "Lists of the right companies and contacts, and first emails in their own language." },
      { title: "Reports every morning", text: "Sales numbers straight from the CRM, instead of a spreadsheet someone updates by hand." },
      { title: "From deal to invoice", text: "When a deal is won, the invoice and the next steps start by themselves." },
    ],
    faq: [
      { q: "Do we need a RevOps team?", a: "No. We set up the process and the systems. One person on your side owns them." },
      { q: "Which CRM do you use?", a: "Often GoHighLevel, but we also work with the CRM you already have if it does the job." },
      { q: "How do we see the result?", a: "Before the build we agree on two or three numbers, such as reply time or the share of quotes that get a follow-up, and track them in a report." },
      { q: "Where do you work?", a: "We are based in Estonia and work with companies in Estonia, Poland, Finland, Sweden and Denmark." },
    ],
  },
};
