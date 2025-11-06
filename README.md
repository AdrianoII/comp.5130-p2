This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The production URL of this project is: [https://comp-5130-p2.vercel.app/](https://comp-5130-p2.vercel.app/).

## Milestone 5: Database schema, initial database implementation

The [ER](artifacts/er.png) diagram represents a simple system with two main entities, Users and Examples: where both of these entities are internally connected by a one-to-many relationship. 
 
Users Table: Each record in this table represents a user registered on the system. Each user will have an id, an email for login, a hashed password for authentication, and a role either for admin or user. The created_at field records when the account was created.

Examples Table: At this table, code examples will be created by users. Every example will have its own id, title, a block of code, and timestamps for creation and last updates. The user_id field links each example with who has created it.

The database schema is in [schema.sql](schema.sql).

The feature that interacts with the database is on the [playground](https://comp-5130-p2.vercel.app/playground) page. The example select input fetches the examples from the database and displays the respective selected example's code in the code editor.