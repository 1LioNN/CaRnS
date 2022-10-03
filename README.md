# CaRnS
## Motivation

Our motive behind the creation of CaRnS was to fill the gap for a flexible, all-in-one vehicular marketplace and connect buyers/renters to vendors. CaRnS gives all its users the opportunity find their dream vehicle to make memories in at an affordable price. It also gives vehicle owners a way to generate passive income, so they don't feel pressured to continue driving vehicles they no longer use. 

## Installation
1. Install [Node.js v18.9.1](https://nodejs.org/en/download/current/)
2. Download a ZIP of the repository and unzip it or checkout the repository.
3. Install dependencies in package.json by entering the `CaRnS` folder then running the following:
   ```
   cd backend
   npm install
   cd ../backend
   npm install
   ```
3. Download .env from `#project-files` and drag it into the `CaRnS/backend` folder.

4. Run the backend (let the backend run in it's own terminal).
   ```
   cd backend
   npm start
   ```
5. Open another terminal in the `CaRnS` folder and run the backend from its respective folder.

   ```
   cd backend
   npm start
   ```

## Contribution
### Do you use gitflow?
Yes. The master contains the latest stable release. The feature and bug branches add single features or patch bugs then are merged into the develop branch via pull requests. Eventually the develop branch is merged with master with another pull request before the split ends.


### What do you name your branches?
Adhearing to Gitflow:
- `master`
- `develop`

The feature/bug branches will have the following naming convention:
- `author-feature-feature_name-jira_ticket_number`
- `author-bug-bug_name-jira_ticket_number`

### Do you use Github issues or another ticketing website?
We use Jira.

### Do you use pull requests?
Yes, to merge the feature and bug branches with the develop branch and the develop branch with master.