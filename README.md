This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

All of our work was done under the class branch.

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
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


## Milestone 8: Final Product, Report, & Presentation

We had a few detours, and we made a few changes to the original plan.

We added a tutorial text to the playground page. This new text is under a help icon button at the top right of the code editor. This addition was made to improve user experience, as we felt that users might need some guidance on how to use the playground.

Since we are using better-auth, we trimmed the fat from our schema and only use the better-auth keys as our keys. We have finished implementing our CRUD functionality for the examples. Now users can create, read, update, and delete their own code examples. This functionality is accessible through the "My Examples" page, which is available in the user dropdown menu in the navbar.

We also implemented a role system. At the moment, we have two roles: admin and user. Admins have the ability to manage all examples in the system, while regular users can only manage their own examples.

We use the role table in our database to check if a given user has the admin role or not.

Regarding the external API integration, we kept the decision of using SemanticScholar. However, instead of providing a search input to search papers given a set of keywords, we changed to fetch the most recent papers of the collaborators who have entries in SemanticScholar. This change was made to better align with the client's needs, as they wanted to showcase their latest research work on the publications page.

Therefore, our implementation is pretty lean, we just fetch the most recent papers of each collaborator and display them in a list format on the publications page, and gracefully handle any errors that may arise during the API calls. 

Regarding our deployment, we are using Vercel to host our application. We adopt a serverless approach and do not use server components, and use Vercel functions to implement our backend functionalities.

We are using Neon to host our PostgreSQL database.

We are using Formspree to handle the contact form. Formspree allows us to add a level of indirection where we do not expose our email. Thus, we have a form, which, when submitted, sends the data to Formspree, which in turn sends the email to our actual email address.

Regarding security, we are using GitHub's OAuth integration. This way, we do not handle passwords directly and delegate the authentication process to GitHub, which is a trusted third-party provider. This makes it easier for the user to create an account and more secure since there is less room for errors. However, our database is ready to handle hashed passwords, in case we want to implement more authentication methods in the future. 

Internationalization was implemented by incorporating not only English, but Spanish, French, Japanese, and Korean. Every page is successfully translated into each native language with a button toggle at the bottom left corner of the website offering five different languages. There is a dictionary located in the locales folder each holding it's own JSON file and it's corresponding language that i18n uses so that it uses keys and tokens to place each of them inside the sections of the website on every page.
