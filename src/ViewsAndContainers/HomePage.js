import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "../Services/Axios";

import { addToCart } from "../Store/Cart";
import BannerCarousel from "../Components/HomePageComponents/BannerCarousel";
import SideMenu from "../Components/HomePageComponents/SideMenu";
import ProductPanel from "../Components/HomePageComponents/ProductPanel";
import { setProducts } from "../Store/Products";

class HomePage extends Component {
  state = {
    totalPage: 5,
    selectedPage: 1,
    page: []
  };
  componentWillMount() {
    var pages = [];
    for (var i = 1; i <= this.state.totalPage; i++) {
      pages.push(
        <div
          style={{
            height: 50,
            width: 50,
            margin: 2,
            backgroundColor: "#f4f4f4",
            borderRadius: 5
          }}
          id={i}
          onClick={i => {
            let number = i._targetInst.key;
            document.getElementById(
              this.state.selectedPage
            ).style.backgroundColor = "#f4f4f4";
            document.getElementById(number).style.backgroundColor = "#ff3c20";
            this.setState({ selectedPage: number });
            this.pagination(number);
          }}
          key={i}
        >
          <div key={i} className="pageNumber">
            {i}
          </div>
        </div>
      );
    }
    this.setState({ page: pages });
  }
  addToCartHandler = product => {
    this.props.addToCart(product);
  };

  onProductClickHandler = id => {
    this.props.history.push(`/product/${id}`);
  };
  pagination = async pageNumber => {
    let response = await axios.get(`/products/${pageNumber - 1}`);
    if (response.data.data.length) {
      this.props.setProducts(response.data.data);
    } else {
      this.setState({ selectedPage: this.state.selectedPage - 1 });
    }
  };
  prev = () => {
    let index = this.state.selectedPage;
    if (index !== 1) {
      this.setState({ selectedPage: index - 1 });
      this.pagination(index - 1);
    }
  };
  next = () => {
    let index = this.state.selectedPage;
    this.setState({ selectedPage: index + 1 });
    this.pagination(index + 1);
  };
  render() {
    const { products } = this.props;

    return (
      <div>
        <BannerCarousel />
        <div className="container latest-product padd-80">
          <div className="col-md-12 sec-head text-center">
            <h3>Latest products</h3>
            <h2>Find your random Hookah</h2>
            <span></span>
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum porttitor egestas orci, vitae ullamcorper risus
              consectetur id.{" "}
            </p>
          </div>
          <div className="clearfix"></div>
          <div className="row">
            <div className="col-md-3 manufacture mt-30">
              <SideMenu />
              <div className="clearfix"></div>
            </div>
            <div className="col-md-9 mt-30">
              <div className="row">
                {products.length > 0 &&
                  products.map(product => (
                    <ProductPanel
                      key={product.id}
                      product={product}
                      onProductClickHandler={this.onProductClickHandler}
                      addToCart={this.addToCartHandler}
                    />
                  ))}
                <div className="clearfix"></div>
              </div>
            </div>
            {/* <div className="pageNumberList" >{
                        this.state.page
                    }</div> */}
            <div className="pageNumberList">
              <div onClick={this.prev} className="paginationButton">
                Prev
              </div>
              <div onClick={this.next} className="paginationButton">
                Next
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addToCart: addToCart, setProducts }, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
