export default function Team() {
  const items = [
    {
      image: "https://i.pravatar.cc/300?img=1",
      title: "Sarah Johnson",
      subtitle: "Frontend Developer",
      handle: "@sarahjohnson",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://github.com/sarahjohnson",
    },
    {
      image: "https://i.pravatar.cc/300?img=2",
      title: "Mike Chen",
      subtitle: "Backend Engineer",
      handle: "@mikechen",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://linkedin.com/in/mikechen",
    },
  ];

  return (
    <section id="team" className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-[30px]">
        <h1
          data-aos="fade"
          className="text-center text-[35px] md:text-[54px] tracking-[-2] md:tracking-[-1.9] leading-[32px] md:leading-[50px]"
        >
          Our Team
        </h1>
        <p
          data-aos="fade"
          data-aos-delay="100"
          className="text-current/60 max-w-xl leading-[26px]"
        >
          Meet the passionate individuals behind SYAI who are working together
          to build a community of AI enthusiasts and create innovative
          solutions.
        </p>
      </div>
    </section>
  );
}
