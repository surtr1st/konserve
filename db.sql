create table users (
  uid           integer primary key,
  email         text unique,
  username      text,
  password      text,
  display_name  text unique,
  secret_code   text
);

create table nodes (
  id    integer primary key,
  name  text unique,
  uid   integer,
  foreign key (uid) references users (uid)
);

create table leaves (
  id        integer primary key,
  username  text,
  password  text,
  node_id   integer,
  foreign key (node_id) references nodes (id)
);


