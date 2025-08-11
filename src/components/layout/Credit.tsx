export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center bg-[#FBFBFB] p-4 gap-1 ">
      <p className="text-sm text-gray-500 text-center font-semibold">
        &copy; 2025 Papangkorn Pitjawong & Jatenipat Chanapisitthi. All Rights Reserved.
      </p>
      <p className="text-sm text-gray-400">
        Website:{" "}
        <a
          href="https://www.realorfake.games"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          www.realorfake.games
        </a>
      </p>
    </footer>
  );
}
