export default function AboutUsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {children}
      &copy; Next Movies
    </div>
  );
}
