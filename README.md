# Complaint-Management-Application
A full-stack application designed for file complaints, and admin to manage them. 

Stack:
- Frontend: React + Typescript + Vite + Tailwind CSS
- Backend: Node.js, Express
- Database: Supabase

## Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Supabase account, with an organization created

### 1. Clone Repository
```bash
git clone https://github.com/orrabadia/Complaint-Management-Application.git
cd Complaint-Management-Application
```
### 2. Setup Backend
```bash
cd backend
npm install
```
- Create an .env in ```backend``` with the following variables:
```ini
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_anon_or_service_role_key
CLIENT_ORIGIN=client_origin ('http://localhost:5173' for example)
PORT=your_desired_server_port (5000/5001 for example)
```

- Start the server with
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```
- Create an .env.local in ```frontend``` with the following variables:
```ini
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_anon_or_service_role_key
PORT=your_desired_server_port (5000/5001 example)
```

- Start the server with
```bash
npm run dev
```

### 4. Setup Supabase (without CLI)
- Go to https://app.supabase.com
- Create / open project
- Go To SQL editor
- Run:
```sql
create table if not exists complaints (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  complaint text not null,
  status text default 'Pending',
  created_at timestamp with time zone default timezone('utc', now())
);
```

- Enable RLS
```sql
alter policy "Allow insert for anyone"
on "public"."complaints"
to public
with check (true);
```

```sql
alter policy "Enable read access for all users"
on "public"."complaints"
to public
using (true);
```

### 4. Take A Look Around
- / redirects to /submit
- go to /admin to see admin side


## Assumptions and Tradeoffs

- User identity isn't authenticated, so users can submit as many complaints as they want as long as they use different emails and can file under different 2 word names.

- /admin route isn't protected by admin role / authentication. Everyone can access it.

- RLS is enforced, but the policies do not do much, as authentication hasn't been implemented.

- Input validation is handled client-side with regex patterns; no additional server-side sanitization is implemented.

- Duplicate Submission Cases for Complaints
1. Same email, name, and complaint -> request denied
2. Same email, different name, same complaint -> request denied
3. Same name, different email, same complaint -> complaint can be filed

## Extra features that were implemented
1. Rate Limiting - On the client side, POST requests are limited to 10 times per minute. All requests done on admin side are not rate limited.

2. Filtering on Admin Side to limit view to All, Pending, or Resolved complaints

3. Cross-site scripting / validation protection before creating a complaint

## What I would do if I had more time
1. Authentication (role based access/control), using Supabase Auth.
2. A view more toggle/component to be able to read longer complaints.
3. A date range selector to query/filter complaints by dates.
4. Pagination, right now it will be a long list
5. Email notifications once complaint has been resolved
6. Implement Rich Text formatting / pdf & img uploading because most complaints have photos to go along with them.