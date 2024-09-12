# Business_Review_Site

## Overview

A node.js express API created to support a review-based platform where users can view businesses and 
their associated reviews. It allows unauthenticated users to access and search for items, view detailed information and average ratings, and browse reviews. Authenticated users can create, read, update, and delete their own reviews and comments. The database for this API utilizes prisma and is seeded with data from the YELP academic data set and is for academic purposes only. Businesses are interactable both by a category filter as well as by individual id.

## Local Setup

1. Install packages
```bash
npm install
```
2. Run local express server
   With nodemon
```bash
npm run start:dev
```
  Without nodemon
``` bash
npm run start
```
3. Seed Data (file suffixes: Businesses -> Users -> Categories/Photos/Reviews -> Comments/Comments2)
      (both comments seed files may be run as many times as desired; however, a large record amount for comments will slow down database queries)
```bash
npm run seed< file suffix > 
```
4. Update database tables
```bash
npm run updateCategories && npm run updateBusinesses
```
## Endpoints (/api is a prefix to all endpoints!!)

| Method | Endpoint (/api) | Description | Requires Auth Token? |
| ------ | -------- | ----------- | -------------------- |
| GET    | /businesses | Get all businesses (returns id and name ordered by stars then review count desc) | No
| GET    | /businesses/:id | Get a business by id (also returns associated categories) |  No |
| GET    | /businesses/list/category/:categoryName  | Get a list of businesses in the requested category (default request paramaters limit 10 records skip none) | No |
| GET    | /businesses/:id/reviews | Get reviews for a business (default request parameters limit 5 skip none) | No |
| GET    | /businesses/reviews/:reviewId/comments | Get comments for a review (default request parameters limit 2 skip 0) | No |
| GET    | /businesses/:id/photos | Get photos for a business | No |
| GET    | /categories | Get all categories | No |
| POST   | /comment/:reviewId | Add a comment to a review | Yes |
| PUT    | /comment/:id | Updates a user's comment | Yes |
| DELETE | /comment/:id | Deletes a user's comment | Yes |
| GET    | /landing-page/reviews/recent | Get the 10 most recent reviews | No
| POST   | /review/:businessId | Add a review to a business | Yes |
| PUT    | /review/:id | Updates a user's review | Yes |
| DELETE | /review/:id | Deletes a user's review | Yes |
| GET    | /user       | Get a logged in user's info | Yes |
| GET    | /user/reviews | Get a logged in user's reviews | Yes |
| GET    | /user/comments | Get a logged in user's comments | Yes |
| GET    | /user/:id   | Get a user by id | Yes |
| POST   | /auth/register | Register a new user | No |
| POST   | /auth/login | Log in a user | No |


* [Academic Dataset Agreement]
https://s3-media0.fl.yelpcdn.com/assets/srv0/engineering_pages/f64cb2d3efcc/assets/vendor/Dataset_User_Agreement.pdf.
  
