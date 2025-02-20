import React from "react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "@/components/common/Countdown";
export default function BannerCountdown() {
  return (
    <section className="bg-surface flat-spacing flat-countdown-banner">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="banner-left">
              <div className="box-title">
                <h3 className="wow fadeInUp">Ofertas limitadas!</h3>
                <p className="text-secondary wow fadeInUp">Aproveite nossas ofertas e faça feliz o dia do seu parceiro.</p>
              </div>
              <div className="btn-banner wow fadeInUp">
                <Link href={`/shop-default-grid`} className="tf-btn btn-fill">
                  <span className="text">Compre Agora</span>
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="banner-img">
              <Image className="lazyload" data-src="/images/banner/img-countdown1.png" alt="banner" src="/images/banner/banner-1.jfif" width={607} height={655} />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="banner-right">
              <div className="tf-countdown-lg">
                <div className="js-countdown" data-timer={1007500} data-labels="Days,Hours,Mins,Secs">
                  <CountdownTimer style={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
