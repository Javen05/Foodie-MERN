CREATE TABLE `users`(
    `UID` BIGINT NOT NULL AUTO_INCREMENT,
    `username` LINESTRING NOT NULL,
    `email` LINESTRING NOT NULL,
    `phone` BIGINT NOT NULL,
    `password` LINESTRING NOT NULL
);
ALTER TABLE
    `users` ADD PRIMARY KEY `users_uid_primary`(`UID`);
CREATE TABLE `edit`(
    `UID` BIGINT NOT NULL,
    `username` LINESTRING NOT NULL,
    `email` LINESTRING NOT NULL,
    `phone` BIGINT NOT NULL,
    `password` LONGTEXT NOT NULL,
    `picture` LINESTRING NULL
);
ALTER TABLE
    `edit` ADD PRIMARY KEY `edit_uid_primary`(`UID`);
CREATE TABLE `statistics`(
    `UID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `reviews` INT NULL,
    `comments` INT NULL,
    `feedbacks` INT NOT NULL,
    `likes` INT NOT NULL
);
ALTER TABLE
    `statistics` ADD PRIMARY KEY `statistics_uid_primary`(`UID`);