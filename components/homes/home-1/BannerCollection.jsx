import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function BannerCollection() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="tf-grid-layout md-col-2">
          <div className="collection-default hover-img">
            <a className="img-style">
              <Image className="lazyload" data-src="/images/collections/collection-2.webp" alt="banner-cls" src="/images/collections/collection-2.webp" width={945} height={709} />
            </a>
            <div className="content">
              <h3 className="title wow fadeInUp">
                <Link href={`/shop-collection`} className="link">
                  Presentes
                </Link>
              </h3>
              <p className="desc wow fadeInUp">Comemore com seu parceiro em todas as ocasiões</p>
              <div className="wow fadeInUp">
                <Link href={`/shop-collection`} className="btn-line">
                  Compre Agora
                </Link>
              </div>
            </div>
          </div>
          <div className="collection-position hover-img">
            <a className="img-style">
              <Image className="lazyload" data-src="/images/collections/collection-1.webp" alt="banner-cls" src="/images/collections/collection-1.webp" width={945} height={945} />
            </a>
            <div className="content">
              <h3 className="title">
                <Link href={`/shop-collection`} className="link text-white wow fadeInUp">
                  Arranjos
                </Link>
              </h3>
              <p className="desc text-white wow fadeInUp">Reservado para ocasiões especiais</p>
              <div className="wow fadeInUp">
                <Link href={`/shop-collection`} className="btn-line style-white">
                  Compre Agora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
