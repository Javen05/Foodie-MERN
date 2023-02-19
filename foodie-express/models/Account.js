"use strict";

class Account {
  constructor(idAccount, username, password, email, phone, date, picture) {
    this.idAccount = idAccount;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.date = date;
    this.picture = picture;
  }

  getIdAccount() {
    return this.idAccount;
  }
  getUsername() {
    return this.username;
  }
  getPassword() {
    return this.password;
  }
  getPicture() {
    return this.picture;
  }
  getEmail() {
    return this.email;
  }
  getPhone() {
    return this.phone;
  }
  getDate() {
    return this.date;
  }

  setIdAccount(idAccount) {
    this.idAccount = idAccount;
  }
  setUsername(username) {
    this.username = username;
  }
  setPassword(password) {
    this.password = password;
  }
  setPicture(picture) {
    this.picture = picture;
  }
  setEmail(email) {
    this.email = email;
  }
  setPhone(phone) {
    this.phone = phone;
  }
  setDate(date) {
    this.date = date;
  }
}

module.exports = Account;
