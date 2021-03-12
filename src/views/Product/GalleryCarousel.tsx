import * as React from "react";
import { Carousel } from "react-bootstrap";

import { CachedImage } from "@components/molecules";

import noPhotoImg from "../../images/no-photo.svg";
import { ProductDetails_product_images } from "./gqlTypes/ProductDetails";

const GalleryCarousel: React.FC<{
  images: ProductDetails_product_images[];
}> = ({ images }) => (
  <div className="product-page__product__gallery">
    <Carousel>
      {images.map(image => (
        <CachedImage url={image.url || noPhotoImg} key={image.id}>
          <img src={noPhotoImg} alt={image.alt} />
        </CachedImage>
      ))}
    </Carousel>
  </div>
);

export default GalleryCarousel;
