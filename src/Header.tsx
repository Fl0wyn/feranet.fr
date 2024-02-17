export default function Header() {
  return (
    <header className="relative">
      <div className="bg-square"></div>
      <div className="container mx-auto py-64 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-5xl md:text-7xl mb-5">
            Hi, I&apos;m <span className="stroke">Florian</span>,
          </h1>
          <h1 className="font-bold text-4xl md:text-6xl">
            <span className="text-white bg-blue-800">Web Developer</span> &
            SysAdmin
          </h1>
        </div>
      </div>
    </header>
  );
}
