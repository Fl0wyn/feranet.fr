function Section({
  children,
  id,
  title,
  color,
}: {
  children: React.ReactNode;
  id: string;
  title: string;
  color?: string;
}) {
  const titleStart = title.split("", 1);
  const titleEnd = title.split("").slice(1).join("");

  return (
    <section className={`mx-auto py-14 md:py-32 ${color}`} id={id}>
      <h2 className="text-center font-semibold text-4xl md:text-5xl">
        <span className="underline underline-offset-8 text-primary hover:text-white hover:no-underline peer">
          {titleStart}
        </span>
        <span className="peer-hover:text-primary peer-hover:underline underline-offset-8">
          {titleEnd}
        </span>
      </h2>
      {children}
    </section>
  );
}

export default Section;
