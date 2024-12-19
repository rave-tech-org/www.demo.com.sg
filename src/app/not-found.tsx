import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url('/assets/images/home/not-found.png')`,
        backgroundSize: 'cover',
        width: '100%',
        objectFit: 'cover',
      }}
    >
      <div className="text-[280px] font-bold absolute top-[170px]">404</div>
      <h1 className="font-bold text-[60px]">Page Not Found</h1>
      <p className="font-semibold text-[40px]">Could not find requested resource</p>
      <Link href="/" className="bg-blue-500 hover:bg-blue-400 px-3 py-2 cursor-pointer rounded-md mt-3">
        <span className="font-bold text-white transform translate-y-1 h-9 flex relative items-center">Return Home</span>
      </Link>
    </div>
  );
}
