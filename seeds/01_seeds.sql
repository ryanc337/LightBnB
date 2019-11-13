INSERT INTO users (id, name, email, password) 
VALUES (1, 'Gucci', '1017.guwop@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (id, name, email, password) 
VALUES (2, 'Waka Flocka', 'FlockaVelli@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (id, name, email, password) 
VALUES (3, 'Zaytoven', 'ZayTiggy@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 1, 'Condo', 'A nice spot to hang out', 'www.image.com', 'www.picture.com', 55, 2, 3, 3, 'Canada', '918 wallace rd', 'Burnaby', 'BC', '123123', FALSE),
(2, 2, 'House', 'Another nice spot to hang out', 'www.image.com', 'www.picture.com', 51, 2, 2, 2, 'Canada', '919 wallace rd', 'Burnaby', 'BC', '123123', TRUE),
(3, 3, 'Cardboard Box', 'A not very nice spot to hang out', 'www.image.com', 'www.picture.com', 2, 0, 0, 0, 'Canada', '920 wallace rd', 'Burnaby', 'BC', '123123', TRUE);

INSERT INTO reservations (id, start_date, end_date, property_id, guest_id)
VALUES (1, '2019-01-01', '2019-01-07', 1, 1);

INSERT INTO reservations (id, start_date, end_date, property_id, guest_id)
VALUES (2, '2019-01-02', '2019-01-09', 2, 2);

INSERT INTO reservations (id, start_date, end_date, property_id, guest_id)
VALUES (3, '2019-03-03', '2019-03-23', 3, 3);

INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 2, 2, 5, 'very nice');
