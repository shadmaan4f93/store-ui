import React, { Component } from "react";

export default class CheckOut extends Component {
  state = {
    firstName: "",
    lastName: "",
    companyName: "",
    emailAddress1: "",
    phoneNumber: "",
    country: "india",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    emailAddress2: "",
    pinCode: ""
  };
  isEmail = email => {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  };
  handleInput = e => {
    if (e.target.name === "phoneNumber" && this.phoneNumber.value.length > 10) {
      this.phoneNumber.value = this.phoneNumber.value.substring(
        0,
        this.phoneNumber.value.length - 1
      );
    }
    if (e.target.name === "pinCode" && this.pinCode.value.length > 5) {
      this.pinCode.value = this.pinCode.value.substring(
        0,
        this.pinCode.value.length - 1
      );
    }

    if (e.target.name === "emailAddress2") {
      if (this.isEmail(e.target.value) === false) {
        this.emailAddress2.style.borderColor = "red";
      } else {
        this.emailAddress2.style.borderColor = "";
      }
    }
    if (e.target.name === "emailAddress1") {
      if (this.isEmail(e.target.value) === false) {
        this.emailAddress1.style.borderColor = "red";
      } else {
        this.emailAddress1.style.borderColor = "";
      }
    }
    if (e.target.name === "phoneNumber") {
      if (
        this.phoneNumber.value.length < 10 ||
        this.phoneNumber.value.length > 10
      ) {
        this.phoneNumber.style.borderColor = "red";
      } else {
        this.phoneNumber.style.borderColor = "";
      }
    }
    if (e.target.name === "pinCode") {
      if (this.pinCode.value.length < 5 || this.pinCode.value.length > 5) {
        this.pinCode.style.borderColor = "red";
      } else {
        this.pinCode.style.borderColor = "";
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  checkIsValid = () => {
    let isValid = true;
    if (this.emailAddress2.name === "emailAddress2") {
      if (this.isEmail(this.emailAddress2.value) === false) {
        this.emailAddress2.style.borderColor = "red";
        isValid = false;
      }
    }
    if (this.emailAddress1.name === "emailAddress1") {
      if (this.isEmail(this.emailAddress1.value) === false) {
        this.emailAddress1.style.borderColor = "red";
        isValid = false;
      }
    }
    if (this.phoneNumber.name === "phoneNumber") {
      if (
        this.phoneNumber.value.length < 10 ||
        this.phoneNumber.value.length > 10
      ) {
        this.phoneNumber.style.borderColor = "red";
        isValid = false;
      }
    }
    if (this.pinCode.name === "pinCode") {
      if (this.pinCode.value.length < 5 || this.pinCode.value.length > 5) {
        this.pinCode.style.borderColor = "red";
        isValid = false;
      }
    }

    return isValid;
  };
  clearColor = () => {
    this.firstName.style.borderColor = "";
    this.lastName.style.borderColor = "";
    this.companyName.style.borderColor = "";
    this.emailAddress1.style.borderColor = "";
    this.phoneNumber.style.borderColor = "";
    this.country.style.borderColor = "";
    this.streetAddress1.style.borderColor = "";
    this.streetAddress2.style.borderColor = "";
    this.city.style.borderColor = "";
    this.emailAddress2.style.borderColor = "";
    this.pinCode.style.borderColor = "";
  };
  isRequired = () => {
    let isValid = true;
    if (this.firstName.value === "") {
      this.firstName.style.borderColor = "red";
      isValid = false;
    }
    if (this.lastName.value === "") {
      this.lastName.style.borderColor = "red";
      isValid = false;
    }
    if (this.companyName.value === "") {
      this.companyName.style.borderColor = "red";
      isValid = false;
    }
    if (this.emailAddress1.value === "") {
      this.emailAddress1.style.borderColor = "red";
      isValid = false;
    }
    if (this.phoneNumber.value === "") {
      this.phoneNumber.style.borderColor = "red";
      isValid = false;
    }
    if (this.country.value === "") {
      this.country.style.borderColor = "red";
      isValid = false;
    }
    if (this.streetAddress1.value === "") {
      this.streetAddress1.style.borderColor = "red";
      isValid = false;
    }
    if (this.streetAddress2.value === "") {
      this.streetAddress2.style.borderColor = "red";
      isValid = false;
    }
    if (this.city.value === "") {
      this.city.style.borderColor = "red";
      isValid = false;
    }
    if (this.emailAddress2.value === "") {
      this.emailAddress2.style.borderColor = "red";
      isValid = false;
    }
    if (this.pinCode.value === "") {
      this.pinCode.style.borderColor = "red";
      isValid = false;
    }

    return isValid;
  };
  placeOrder = () => {
    this.clearColor();
    this.isRequired();
    this.checkIsValid();
    if (this.isRequired() === true) {
      if (this.checkIsValid() === false) {
      } else {
        alert(JSON.stringify(this.state), 4, null);
      }
    }
  };
  render() {
    return (
      <div>
        <div className="container product-table padd-80">
          <div className="col-md-12 alert-faq">
            <div
              className="accordion accordion-open accordion-close"
              id="section1"
            >
              Returning customer?{" "}
              <a href="#" class="content-subhead">
                Click here to login
              </a>
            </div>
          </div>

          <div className="clearfix"></div>

          <div className="col-md-12 alert-faq">
            <div
              className="accordion accordion-open accordion-close"
              id="section2"
            >
              Have a coupon?{" "}
              <a href="#" class="content-subhead">
                {" "}
                Click here to enter your code
              </a>
            </div>
          </div>

          <div className="clearfix"></div>

          <div className="col-md-6">
            <form>
              <div className="row checkout">
                <div className="col-md-12">
                  <h2>Billing Details</h2>
                </div>
                <div className="col-md-6">
                  <h3>First Name *</h3>
                  <input
                    name="firstName"
                    ref={input => (this.firstName = input)}
                    value={this.state.firstName}
                    onInput={this.handleInput}
                    type="text"
                  />
                </div>
                <div className="col-md-6">
                  <h3>Last Name *</h3>
                  <input
                    name="lastName"
                    ref={input => (this.lastName = input)}
                    value={this.state.lastName}
                    onInput={this.handleInput}
                    type="text"
                  />
                </div>
                <div className="col-md-12">
                  <h3>Company Name </h3>
                  <input
                    name="companyName"
                    ref={input => (this.companyName = input)}
                    value={this.state.companyName}
                    onInput={this.handleInput}
                    type="text"
                  />
                </div>
                <div className="col-md-6">
                  <h3>Email Address *</h3>
                  <input
                    name="emailAddress1"
                    ref={input => (this.emailAddress1 = input)}
                    value={this.state.emailAddress1}
                    onInput={this.handleInput}
                    type="email"
                  />
                </div>
                <div className="col-md-6">
                  <h3>Phone *</h3>
                  <input
                    name="phoneNumber"
                    ref={input => (this.phoneNumber = input)}
                    value={this.state.phoneNumber}
                    onInput={this.handleInput}
                    type="Number"
                    max={10}
                  />
                </div>
                <div className="col-md-12">
                  <h3>Country *</h3>
                  <select
                    name="country"
                    ref={input => (this.country = input)}
                    onInput={this.handleInput}
                    class="form-control"
                  >
                    <option value="india">India</option>
                    <option value="england">England</option>
                    <option value="china">China</option>
                    <option value="sriLanka">Sri Lanka</option>
                  </select>
                </div>
                <div className="col-md-12">
                  <h3>Address *</h3>
                  <input
                    name="streetAddress1"
                    ref={input => (this.streetAddress1 = input)}
                    type="text"
                    value={this.state.streetAddress}
                    onInput={this.handleInput}
                    placeholder="Street Address"
                  />
                </div>
                <div className="col-md-12">
                  <input
                    name="streetAddress2"
                    type="text"
                    ref={input => (this.streetAddress2 = input)}
                    value={this.state.streetAddress2}
                    onInput={this.handleInput}
                    placeholder="Apartment, suite, unit etc. (optional)"
                  />
                </div>
                <div className="col-md-12">
                  <h3>Town / City *</h3>
                  <input
                    name="city"
                    ref={input => (this.city = input)}
                    value={this.state.city}
                    onInput={this.handleInput}
                    type="text"
                    placeholder="Street Address"
                  />
                </div>
                <div className="col-md-6">
                  <h3>Email Address *</h3>
                  <input
                    name="emailAddress2"
                    ref={input => (this.emailAddress2 = input)}
                    value={this.state.emailAddress2}
                    onInput={this.handleInput}
                    type="email"
                  />
                </div>
                <div className="col-md-6">
                  <h3>Postcode *</h3>
                  <input
                    name="pinCode"
                    ref={input => (this.pinCode = input)}
                    value={this.state.pinCode}
                    onInput={this.handleInput}
                    type="Number"
                  />
                </div>
                <div className="col-md-12 check-faq checkbox-span">
                  <div
                    className="accordion accordion-open accordion-close"
                    id="section3"
                  >
                    <label>Create an account?</label>
                    <span></span>
                  </div>

                  <div className="accordian-body" style={{ display: "none" }}>
                    <div className="faq">
                      <p>
                        Create an account by entering the information below. If
                        you are a returning customer please login at the top of
                        the page.
                      </p>
                      <div className="row">
                        <div class="col-md-12">
                          <h3>Account Password </h3>
                          <input type="password" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-6">
            <div className="col-md-12 checkout">
              <h2>Your order</h2>
            </div>

            <div className="col-md-12 element-table">
              <div className="row">
                <table>
                  <tbody>
                    <tr>
                      <th>Product</th>
                      <th className="text-right">Total</th>
                    </tr>

                    <tr>
                      <td>Glass Hookah</td>
                      <td className="text-right">$620.00</td>
                    </tr>

                    <tr>
                      <td>Glass Hookah</td>
                      <td className="text-right">$200.00</td>
                    </tr>

                    <tr>
                      <td>Glass Hookah</td>
                      <td className="text-right">$1200</td>
                    </tr>

                    <tr>
                      <td>Glass Hookah</td>
                      <td className="text-right">$1800</td>
                    </tr>

                    <tr>
                      <td>Glass Hookah</td>
                      <td className="text-right">$500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="clearfix"></div>

            <div className="col-md-12 pay-faq">
              <h2>Payment mathod</h2>
              <div
                className="accordion accordion-open check-faq mt-20 accordion-close"
                id="section9"
              >
                <label>Direct bank transfer</label>
                <span></span>
              </div>
              <div
                className="accordion accordion-open check-faq accordion-close"
                id="section8"
              >
                <label>Create an account?</label>
                <span></span>
              </div>
              <div
                className="accordion accordion-open check-faq accordion-close"
                id="section7"
              >
                <label>PayPal</label>{" "}
                <img src="images/check-out-payment.png" alt="" />
                <a href="#">
                  <h4 className="content-subhead">What is PayPal?</h4>
                </a>
                <span className="payment-circle"></span>
              </div>
              <div className="clearfix"></div>
              <div className="col-md-12 text-center">
                <a onClick={this.placeOrder} className="coupon btn-bg">
                  Place order
                </a>
              </div>{" "}
              <div className="clearfix"></div>
            </div>
          </div>

          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}
