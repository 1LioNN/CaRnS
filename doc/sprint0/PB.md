# User Stories

**Kano Model Classification**
- B &rarr; Basic Expectations
- S &rarr; Satisfiers
- D &rarr; Delighters


## **Buyer/Renter**

As **Buyer/Renter**, I want to be able to create a buyer/renter account in order to see buy or rent vehicles (B)

*Criteria of Success*
- New vendor user created
  
---
As **Buyer/Renter**, I want to be able to login to my account in order to see my profile (B)

*Criteria of Success*
- Pull up vendor user profile from DB and display

As **Buyer/Renter**, I want to be able to see my past purchases/bookings (S)

*Criteria of Success*
- Pull up past purchases/booking details from DB
---
As **Buyer/Renter**, I want to view all vehicle listings so that I can compare the options available (B)

*Criteria of Success*
- View all available listings currently available in the DB
---
As **Buyer/Renter**, I want to view to filter vehicle listings so that I find listings that match my preferences (S)

*Criteria of Success*
- Listings pulled from DB are filtered by user choice
---
As **Buyer/Renter**, I want to view a specific vehicle listing so that I can get more details about it (B)

*Criteria of Success*
- Pull up a detailed version of a listing from the DB
---
As a **Buyer/Renter**, I want to be able to “like” certain listings so that I can view them later (S)

*Criteria of Success*
- See "liked" listings in the "Liked" page
---
As a **Buyer/Renter**, I want to be able to contact a vendor so that I can learn more about the product (S)

*Criteria of Success*
- Send and receive messages from a vendor
- Send and receive images from a vendor
---
---
## **Buyer**

As a **Buyer**, I want to be able to complete an order for a vehicle (B)

*Criteria of Success*
- User can open listing and complete the order for a vehicle

---
---
## **Renter**

As a **Renter**, I want to be able to book a vehicle for a certain period of time. (B)

*Criteria of Success*
- Renter can open listing see availability of the vehicle on a calendar
- Renter cannot book the vehicle where it is unavailable
---

As a **Renter**, I want to be able to view date availabilities for the vehicle so that I can determine if the vehicle will suit my needs (S)

*Criteria of Success*
- Renter can open listing see availability of the vehicle on a calendar
- Renter cannot book the vehicle where it is unavailable

---
As a **Renter**, I want to be able to leave a review after my booking of a car is complete (D)

*Criteria of Success*
- Renter can leave review that remians attached to the listing


---
---
## **Vendor**

As **Vendor**, I want to be able to create a vendor account in order to see sell or rent out cars (B)

*Criteria of Success*
- New vendor user created
  
---
As **Vendor**, I want to be able to login to my account in order to see my profile (B)

*Criteria of Success*
- Pull up vendor user profile from DB and display

---

As a **Vendor**, I want to be able to create a “Vendor Account” so that I can rent out or sell vehicles. (B)

*Criteria of Success*
- Data entered in "Sign-up" form is stored in the DB
- Data entered in "Sign-up" can be retrieved at the login page


---
As a **Vendor**, I want to be able to list vehicles for sale so that potential buyers can view the vehicle details (B)

*Criteria of Success*
- Uploaded data from vendor side added to DB
---

As a **Vendor**, I want to be able sold vehicles to be marked as sold for users (B)

*Criteria of Success*
- Listing marked as "sold" in DB

---

As a **Vendor**, I want to be able to update vehicle listing for sale so that I can provide potential buyers with the most updated information (S)

*Criteria of Success*
- DB updated with new information

---

As a **Vendor**, I want to be able to list vehicles for rent for specific dates or periods of times so that I can set aside time for personal use of the vehicle (S)

*Criteria of Success*
- User can only see availability determined by vendor
---
As a **Vendor**, I want rented vehicles to be marked as booked for users (B)

*Criteria of Success*
- Listing marked as "booked" in DB

---

As a **Vendor**, I want to be able to update vehicle listings for rent so that I can provide potential buyers with the most updated information (S)

*Criteria of Success*
- DB updated with new information

---

As a **Vendor**, I want to be able to delete a listing (B)

*Criteria of Success*
- User can no longer see the listing. DB deletes the record.
---

As a **Vendor**, I want to be able see past sales/bookings made (S)

*Criteria of Success*
- Vendor can see details of past sales/bookings from DB

---
As a **Vendor**, I want to be able to see statistics related to the sales I have made in the past so that I can assess the profitability of my activity (D)

*Criteria of Success*
- Summary statisitics are automatically uploaded and seen on a "Vendor Statistics" page
