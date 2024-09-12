# Business_Review_Site

## Purpose and Functionality

This API has been created to support a review-based platform where users can view businesses and 
their associated reviews. It allows unauthenticated users to access and search for items, view detailed information and average ratings, and browse reviews. Authenticated users can create, read, update, and delete their own reviews and comments. The database for this API is seeded with data from the YELP academic data set AND IS FOR ACADEMIC PURPOSES ONLY. Businesses are interactable both by a category filter as well as by individual id.

## Setup and Run Locally

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
## Endpoints
| Method | Endpoint | Description | Requires Auth Token? |
| ------ | -------- | ----------- | -------------------- |
| GET    | /api/businesses | Get all businesses (returns id and name ordered by stars then review count desc) | No
|
|
|
## packages used
  
