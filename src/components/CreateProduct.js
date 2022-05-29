import { React, useState } from "react";
import styles from "../styles/CreateProduct/CreateProduct.module.scss";
import classNames from "classnames/bind";
import axios from "axios";

const cx = classNames.bind(styles);

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    feedText: "",
    category: "",
    picture: null,
  });
  const registerProduct = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    if (newProduct?.picture) {
      formData.append("picture", newProduct.picture, newProduct.picture.name);
    }
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    formData.append("feedText", newProduct.feedText);
    formData.append("category", newProduct.category);

    axios
      .post("http://127.0.0.1:8000/product/", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };
  const onLoadFile = (e) => {
    const file = e.target.files[0];
    setNewProduct({
      ...newProduct,
      picture: file,
    });
  };
  return (
    <div className={cx("CreateProduct")}>
      <form
        onSubmit={(e) => {
          registerProduct(e);
        }}
        enctype="multipart/form-data"
      >
        <input
          name="name"
          type="text"
          placeholder="상품 이름"
          value={newProduct.name}
          required
          onChange={onChange}
        />
        <input
          name="price"
          type="text"
          placeholder="가격"
          value={newProduct.price}
          required
          onChange={(e) => {
            let price = parseInt(e.target.value);
            if(!isNaN(price)) {
              setNewProduct({
                ...newProduct,
                price: parseInt(e.target.value)
              });
            } else {
              setNewProduct({
                ...newProduct,
                price: ""
              })
            }
          }}
        />
        <input
          name="description"
          type="text"
          placeholder="상품 설명"
          value={newProduct.description}
          required
          onChange={onChange}
        />
        <input
          name="feedText"
          type="text"
          placeholder="피드 글 작성"
          value={newProduct.feedText}
          required
          onChange={onChange}
        />
        <input
          name="category"
          type="text"
          placeholder="카테고리 DS"
          value={newProduct.category}
          required
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onLoadFile} />
        <button type="submit">상품 등록</button>
      </form>
    </div>
  );
};

export default CreateProduct;