# StudyHub

StudyHub (https://studyhub-flax-ten.vercel.app) is a web application designed to help college students organize their courses, assignments, and study resources in one place. The application provides authenticated students with a personalized dashboard where they can manage academic information and quickly identify upcoming assignments.

Live application: https://studyhub-flax-ten.vercel.app
GitHub repository: https://github.com/jkkitchen/studyhub

## Team Members

- Jesse Tusiime
- Jessica Kitchen
- Demetrious Shoniwa
- Geoffrey Etu
- Brandon Arroyo
- Ifeanyi Okali Eme

## Features
- Google authentication: Sign in and sign out using Auth.js and Google OAuth.
- Personal dashboard: View your academic information and upcoming assignments.
- Course management: Create, view, edit, and delete courses.
- Assignment management: Organize assignments by course, manage due dates and descriptions, and track completion.
- Study resources: Save and manage external links and text-based notes associated with courses.
- Responsive interface: Use the application on desktop, tablet, and mobile-sized screens.
MVP scope
The current MVP supports external links and text notes only. Uploading files, PDFs, or images is out of scope. Student-to-student resource sharing, live chat, notifications, calendar integration, AI study assistance, and Google Drive integration are also deferred future opportunities.

## Technology stack
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- MongoDB
- Mongoose
- Auth.js with Google OAuth and the MongoDB adapter
- Zod for schema validation
- ESLint and Prettier
- Vercel for deployment

## Getting started
Prerequisites
- Node.js compatible with the installed Next.js version
- npm
- A MongoDB database, such as a MongoDB Atlas cluster
- A Google OAuth application configured in Google Cloud Console

1. Clone the repository
git clone https://github.com/jkkitchen/studyhub.git
cd studyhub
2. Install dependencies
npm install
3. Configure environment variables
Create a .env.local file in the project root. Add your own values for the following variables:
AUTH_SECRET=replace_with_a_secure_random_secret
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
MONGODB_URI=your_mongodb_connection_string
Do not commit .env.local, paste secret values into documentation. Keep secrets in local environment files and in your deployment provider's environment-variable settings.
Google OAuth configuration: Add the following authorized redirect URI to your Google OAuth client:
- Local development: http://localhost:3000/api/auth/callback/google
- Production: https://studyhub-jkk14.vercel.app/api/auth/callback/google
If the production domain changes, update the production redirect URI to match the deployed domain.
4. Run the development server
npm run dev
Open http://localhost:3000 in your browser.
5. Run quality checks
The repository defines these scripts:
npm run lint
npm run format:check
npx tsc --noEmit
npm run build
Run the checks before submitting changes or deploying. If a check fails, review the output and fix the underlying issue before proceeding.

## Application routes and main views

Route	                        Purpose
/	                            Dashboard / application home
/login	                        Google sign-in entry point
/onboarding	                    New-user onboarding
/courses	                    View courses
/courses/new	                Create a course
/courses/[id]	                View course details
/courses/[id]/edit	            Edit a course
/assignments	                View assignments
/assignments/new	            Create an assignment
/assignments/[id]	            View assignment details
/assignments/[id]/edit	        Edit an assignment
/resources	                    View study resources
/resources/new	                Create a resource
/resources/[id]	                View a resource
/resources/[id]/edit	        Edit a resource


[id] represents the identifier of a specific record. Private application views and data are intended for authenticated users.
API Route Documentation
The API is implemented with Next.js App Router Route Handlers under app/api/. These routes call server-side database functions in lib/db.ts.

Endpoint	                    Methods	                    Purpose
/api/auth/[...nextauth]	        Auth.js-supported methods	Handles authentication callbacks and related Auth.js requests.
/api/courses	                GET, POST	                 List courses and create a course.
/api/courses/[id]	            GET, PUT, DELETE	        Read, update, or delete a course by ID.
/api/assignments	            GET, POST	                List assignments and create an assignment.
/api/assignments/[id]	        GET, PUT, DELETE	        Read, update, or delete an assignment by ID.
/api/resources	                GET, POST	                List resources and create a resource.
/api/resources/[id]	            GET, PUT, DELETE	        Read, update, or delete a resource by ID.

## Deployment on Vercel
1. Push the project to the GitHub repository.
2. Import the repository into Vercel.
3. In the Vercel project settings, configure AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, and MONGODB_URI for the environments you use.
4. Add the production domain's Google OAuth callback URI to your Google OAuth client.
5. Deploy the project and review the build logs.
6. Open the deployed application in an incognito/private browser window. Test Google sign-in, onboarding, protected routes, logout, and the course, assignment, and resource workflows.
7. Run Lighthouse on the mobile version of the deployed site and address critical accessibility, performance, best-practice, or SEO findings.
Live URL: https://studyhub-flax-ten.vercel.app

## Product Demo Summary
StudyHub helps college students keep their academic responsibilities organized in one place. Rather than tracking course information, assignment deadlines, and study materials across separate tools, students can use a personalized dashboard to manage their courses, monitor assignments, and keep useful study links and text notes connected to their coursework.
The application is intended for college students who want a simpler way to organize their studies. After signing in with Google and completing onboarding, a student can create courses, add assignments with due dates, update their progress, and save study resources. StudyHub brings these everyday academic tasks together in one application so students can see what they need to work on and find relevant study materials more easily.

## Known Issues and Future Improvements
- Complete mobile Lighthouse and accessibility checks and document the results
- File uploads, image uploads, resource sharing, notifications, chat, calendar integration, AI study assistance, and Google Drive integration are outside the MVP scope and may be considered in the fututre.