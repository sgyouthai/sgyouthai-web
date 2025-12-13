import CountUp from "@/components/CountUp";

export default function About() {
  return (
    <section id="about" className="gap-[30px] flex flex-col">
      <h1
        data-aos="fade"
        className="text-center text-[35px] md:text-[54px] tracking-[-2] md:tracking-[-1.9] leading-[32px] md:leading-[50px]"
      >
        Our Story
      </h1>
      <p>Founded in 2023</p>
      <div className="grid grid-cols-2 md:grid-cols-4 place-items-center text-center gap-8 md:gap-12 py-6">
        <div className="flex flex-col justify-center items-center text-center gap-3">
          <CountUp to={500} suffix="+" className="md:text-5xl text-4xl" />
          <p className="text-current/60">Members</p>
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-3">
          <CountUp to={2000} suffix="+" className="md:text-5xl text-4xl" />
          <p className="text-current/60">Students Reached</p>
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-3">
          <CountUp to={4} className="md:text-5xl text-4xl" />
          <p className="text-current/60">Academic Partners</p>
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-3">
          <CountUp
            prefix="$"
            to={64.3}
            decimals={1}
            suffix="K"
            className="md:text-5xl text-4xl"
          />
          <p className="text-current/60">Total Funding Secured</p>
        </div>
      </div>
    </section>
  );
}
