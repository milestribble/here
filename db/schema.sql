CREATE TABLE JOURNEY (
  ID SERIAL PRIMARY KEY,
  PIN NUMBER,
  NAME VARCHAR(255),
  EXPIRATION NUMBER,
  ETA VARCHAR(255),
  STATUS VARCHAR(255)
);