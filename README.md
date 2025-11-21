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

The [ER](artifacts/er.png) diagram represents a simple system with two main entities, User and Example: where both of these entities are internally connected by a one-to-many relationship. 
 
Users Table: Each record in this table represents a user registered on the system. Each user will have an id, an email for login, a hashed password for authentication, and a role either for admin or user. The created_at field records when the account was created.

Example Table: At this table, code examples will be created by users. Every example will have its own id, title, a block of code, and timestamps for creation and last updates. The user_id field links each example with who has created it.

The database schema is in [schema.sql](schema.sql).

The feature that interacts with the database is on the [playground](https://comp-5130-p2.vercel.app/playground) page. The example select input fetches the examples from the database and displays the respective selected example's code in the code editor.

## Milestone 6: Authentication, Database Updates, API

We implemented user authentication using better auth. At the navbar, if the user doesn't have a active session you will see a sign-in button. This button leads to a sign-in page. The sign-in process is made though Github using OAuth. Sadly, this only work in the production due CORS issues with localhost and Github OAuth apps. Once signed in, the user is redirected to the homepage, and the navbar updates to show the user's avatar (if available) and a dropdown menu with the options "My Examples" and "Log out".

For the external API, we were planning to use Google scholar to fetch paper metadata, however, google scholar doesn't provide a public API. Thus, we decided to use a third-party API called Semantic Scholar. This API allows us to fetch metadata for academic papers. We created an endpoint at `/api/scholar` that accepts a query parameter and returns a list of papers corresponding the metadata.
We use this API at the publications page, where we generate a dynamic list of publications that were returned by the API.
The API was not in the original plans of our client, so we are still discussing where and how to integrate its use.
