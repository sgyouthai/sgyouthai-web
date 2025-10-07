"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
// import { api } from "@/app/providers";

export default function EventGallery() {
  // const { data: gallery } = api.gallery.getAll.useQuery();
  // console.log(gallery);
  const gallery = [
    "/gallery/syaigathering1.png",
    "/gallery/deepracedash1.png",
    "/gallery/cedar2.png",
    "/gallery/cedar1.png",
    "/gallery/yac.png",
    "/gallery/syaigathering2.png",
    "/gallery/mindfulhacksxsyai.png",
    "/gallery/deepracedash3.png",
    "/gallery/yac2.png",
    "/gallery/syaigathering3.png",
    "/gallery/mindfulhacksxsyai2.png",
    "/gallery/deepracedash2.png",
  ];

  const rows = [gallery.slice(0, 4), gallery.slice(4, 8), gallery.slice(8, 12)];

  return (
    <section id="gallery">
      <div className="flex flex-col items-center flex-nowrap justify-center h-min relative gap-[70px]">
        <div className="flex flex-col gap-[30px]">
          <h1
            data-aos="fade"
            className="text-center text-[35px] md:text-[54px] tracking-[-2] md:tracking-[-1.9] leading-[32px] md:leading-[50px]"
          >
            Event Gallery
          </h1>
          <p
            data-aos="fade"
            data-aos-delay="100"
            className="text-current/60 max-w-md leading-[26px]"
          >
            A glimpse into our vibrant community events and activities.
          </p>
        </div>
        <>
          <div
            data-aos="fade"
            data-aos-delay="200"
            data-framer-name="Left Detail"
            className="items-center absolute top-[25px] left-[-460px] md:top-[50px] md:left-[-400px] flex-none"
          >
            <div
              data-framer-component-type="SVG"
              data-framer-name="Detail Vector"
              style={{
                imageRendering: "pixelated",
                flexShrink: 0,
                fill: "rgba(0,0,0,1)",
                color: "rgba(0,0,0,1)",
              }}
              className="framer-z6l0gn"
              aria-hidden="true"
            >
              <div
                className="svgContainer"
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: "inherit",
                }}
              >
                <svg
                  width="567"
                  height="237"
                  viewBox="0 0 567 237"
                  fill="none"
                  id="svg-37038196_942"
                >
                  <path
                    d="M0 0H368.268C379.681 0 390.549 4.87456 398.139 13.3969L567 203H0V0Z"
                    fill="url(#svg-37038196_942_paint0_linear_761_2)"
                  ></path>
                  <path
                    d="M0.5 0.5H368.268C379.538 0.5 390.271 5.31363 397.766 13.7294L565.885 202.5H0.5V0.5Z"
                    stroke="url(#svg-37038196_942_paint1_linear_761_2)"
                    strokeOpacity="0.1"
                  ></path>
                  <rect
                    y="202"
                    width="567"
                    height="35"
                    fill="transparent"
                  ></rect>
                  <defs>
                    <linearGradient
                      id="svg-37038196_942_paint0_linear_761_2"
                      x1="330.5"
                      y1="-1.20427e-05"
                      x2="297"
                      y2="139"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#0055FF" stopOpacity="0.2"></stop>
                      <stop offset="1" stopOpacity="0"></stop>
                    </linearGradient>
                    <linearGradient
                      id="svg-37038196_942_paint1_linear_761_2"
                      x1="92"
                      y1="-31"
                      x2="567"
                      y2="189.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#999999" stopOpacity="0.7"></stop>
                      <stop offset="0.506458" stopColor="white"></stop>
                      <stop
                        offset="1"
                        stopColor="#999999"
                        stopOpacity="0.7"
                      ></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div
            data-aos="fade"
            data-aos-delay="200"
            className="items-center absolute top-[25px] right-[-460px] md:top-[50px] md:right-[-400px] flex-none"
            data-framer-name="Right Detail"
          >
            <div
              data-framer-component-type="SVG"
              data-framer-name="Detail Vector"
              style={{
                imageRendering: "pixelated",
                flexShrink: 0,
                fill: "rgba(0,0,0,1)",
                color: "rgba(0,0,0,1)",
              }}
              className="framer-13mi3k9"
              aria-hidden="true"
            >
              <div
                className="svgContainer"
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: "inherit",
                }}
              >
                <svg
                  width="567"
                  height="237"
                  viewBox="0 0 567 237"
                  fill="none"
                  id="svg1902233737_958"
                >
                  <path
                    d="M567 0H198.732C187.319 0 176.451 4.87456 168.861 13.3969L0 203H567V0Z"
                    fill="url(#svg1902233737_958_paint0_linear_761_6)"
                  ></path>
                  <path
                    d="M566.5 0.5H198.732C187.462 0.5 176.729 5.31363 169.234 13.7294L1.11487 202.5H566.5V0.5Z"
                    stroke="url(#svg1902233737_958_paint1_linear_761_6)"
                    strokeOpacity="0.1"
                  ></path>
                  <rect
                    y="202"
                    width="567"
                    height="35"
                    fill="transparent"
                  ></rect>
                  <defs>
                    <linearGradient
                      id="svg1902233737_958_paint0_linear_761_6"
                      x1="236.5"
                      y1="-1.20427e-05"
                      x2="270"
                      y2="139"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#0055FF" stopOpacity="0.2"></stop>
                      <stop offset="1" stopOpacity="0"></stop>
                    </linearGradient>
                    <linearGradient
                      id="svg1902233737_958_paint1_linear_761_6"
                      x1="475"
                      y1="-31"
                      x2="-8.44598e-06"
                      y2="189.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#999999" stopOpacity="0.7"></stop>
                      <stop offset="0.506458" stopColor="white"></stop>
                      <stop
                        offset="1"
                        stopColor="#999999"
                        stopOpacity="0.7"
                      ></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </>
        <div
          className="flex w-[100dvw] flex-col justify-center gap-[30px] relative"
          data-aos="fade"
          data-aos-delay="300"
        >
          <Marquee speed={50} autoFill={true} pauseOnHover>
            {rows[0]?.map((image, index) => (
              <div
                className="h-64 aspect-[4/3] object-cover rounded-2xl flex-none"
                key={index}
              >
                <div
                  className="h-full w-full p-2 rounded-2xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(0.016399796234793484deg, var(--token-30ee69d1-cae6-4a5c-9af2-db5c94a12e77, rgba(255, 255, 255, 0.05)) 0%, var(--token-8b9dc97a-1cd5-4716-ac13-d0875aca92f4, rgba(153, 153, 153, 0.06)) 100%)",
                  }}
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${(index % 4) + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </Marquee>
          <Marquee speed={50} direction="right" autoFill={true} pauseOnHover>
            {rows[1].map((image, index) => (
              <div
                className="h-64 aspect-[4/3] object-cover rounded-2xl flex-none"
                key={index}
              >
                <div
                  className="h-full w-full p-2 rounded-2xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(0.016399796234793484deg, var(--token-30ee69d1-cae6-4a5c-9af2-db5c94a12e77, rgba(255, 255, 255, 0.05)) 0%, var(--token-8b9dc97a-1cd5-4716-ac13-d0875aca92f4, rgba(153, 153, 153, 0.06)) 100%)",
                  }}
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${(index % 4) + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </Marquee>
          <Marquee direction="left" speed={50} autoFill={true} pauseOnHover>
            {rows[2]?.map((image, index) => (
              <div
                className="h-64 aspect-[4/3] object-cover rounded-2xl flex-none"
                key={index}
              >
                <div
                  className="h-full w-full p-2 rounded-2xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(0.016399796234793484deg, var(--token-30ee69d1-cae6-4a5c-9af2-db5c94a12e77, rgba(255, 255, 255, 0.05)) 0%, var(--token-8b9dc97a-1cd5-4716-ac13-d0875aca92f4, rgba(153, 153, 153, 0.06)) 100%)",
                  }}
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${(index % 4) + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
