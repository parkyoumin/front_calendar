"use client";

const Header = () => {
  return (
    <div className="bg-white h-16 p-4 flex items-center justify-between">
      <p className="text-xl font-bold text-normal-black">
        <span className="text-primary">C</span>alendar
      </p>
      <button className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
        <img src="google_logo.svg" className="pr-2" />
        <span className="text-normal-black font-normal text-sm">
          Google로 시작하기
        </span>
      </button>
    </div>
  );
};

export default Header;
