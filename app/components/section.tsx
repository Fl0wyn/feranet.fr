export function Section({
  children,
  id,
  title,
  bg,
}: {
  children: React.ReactNode;
  id: string;
  title: string;
  bg?: string;
}) {
  const titleStart = title.split("", 1);
  const titleEnd = title.split("").slice(1).join("");

  let bgGridDot;
  let color;

  if (bg === "grid") {
    color = "md:bg-slate-900 bg-slate-950";
    bgGridDot = "md:bg-grid-small-white/[0.1]";
  } else if (bg === "dot") {
    color = "bg-slate-950";
    bgGridDot = "md:bg-dot-white/[0.1]";
  }

  return (
    <section
      className={`mx-auto py-14 md:py-32 ${bgGridDot} ${color} w-full relative`}
      id={id}
    >
      <div
        className={`absolute pointer-events-none inset-0 flex items-center justify-center ${color} [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`}
      />
      <h2 className="text-center font-semibold text-4xl md:text-5xl relative z-20 block">
        <span className="underline underline-offset-8 text-primary ">
          {titleStart}
        </span>
        {titleEnd}
      </h2>
      {children}
    </section>
  );
}
