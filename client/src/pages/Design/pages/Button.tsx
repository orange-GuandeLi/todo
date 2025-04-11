export function Button() {
  return (
    <section className="
      columns-[6_12rem] gap-4 w-[min(80rem,_100%)] m-auto p-4
      [&>*]:w-full [&>*]:grid [&>*]:place-content-center [&>*]:mb-4
    "
    >
      <div>
        <button className="
          px-4 py-2 bg-cyan-600 text-white rounded cursor-pointer transition
          hover:shadow hover:bg-cyan-600/80 active:bg-cyan-500
        ">basic</button>
      </div>
      <div>
        <button className="
          px-4 py-2 border-1 border-cyan-600 rounded cursor-pointer transition
          hover:shadow hover:bg-cyan-600/80 active:bg-cyan-500 active:border-cyan-500 hover:text-white
        ">outline</button>
      </div>
      <div>
        <button className="
          px-4 py-2 bg-cyan-600 text-white rounded cursor-pointer transition flex items-center gap-4 whitespace-nowrap
          hover:shadow hover:bg-cyan-600/80 active:bg-cyan-500
        ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 shrink-0">
            <path d="M7.25 1.75a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-1.5 0v-1.5ZM11.536 2.904a.75.75 0 1 1 1.06 1.06l-1.06 1.061a.75.75 0 0 1-1.061-1.06l1.06-1.061ZM14.5 7.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM4.464 9.975a.75.75 0 0 1 1.061 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061ZM4.5 7.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM5.525 3.964a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 1.06-1.061l1.061 1.06ZM8.779 7.438a.75.75 0 0 0-1.368.366l-.396 5.283a.75.75 0 0 0 1.212.646l.602-.474.288 1.074a.75.75 0 1 0 1.449-.388l-.288-1.075.759.11a.75.75 0 0 0 .726-1.165L8.78 7.438Z" />
          </svg>
          basic</button>
      </div>
      <div>
        <button className="
          px-4 py-2 bg-cyan-600 text-white rounded cursor-pointer transition flex items-center gap-4
          hover:shadow hover:bg-cyan-600/80 active:bg-cyan-500
        ">
          basic
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 shrink-0">
            <path d="M4.038 4.038a5.25 5.25 0 0 0 0 7.424.75.75 0 0 1-1.06 1.061A6.75 6.75 0 1 1 14.5 7.75a.75.75 0 1 1-1.5 0 5.25 5.25 0 0 0-8.962-3.712Z" />
            <path d="M7.712 7.136a.75.75 0 0 1 .814.302l2.984 4.377a.75.75 0 0 1-.726 1.164l-.76-.109.289 1.075a.75.75 0 0 1-1.45.388l-.287-1.075-.602.474a.75.75 0 0 1-1.212-.645l.396-5.283a.75.75 0 0 1 .554-.668Z" />
            <path d="M5.805 9.695A2.75 2.75 0 1 1 10.5 7.75a.75.75 0 0 0 1.5 0 4.25 4.25 0 1 0-7.255 3.005.75.75 0 1 0 1.06-1.06Z" />
          </svg>
        </button>
      </div>
      <div>
        <button className="
          px-4 py-2 border-1 border-cyan-600 rounded cursor-pointer transition flex items-center gap-4 whitespace-nowrap
          hover:shadow hover:bg-cyan-600/80 active:bg-cyan-500 active:border-cyan-500 hover:text-white
        ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 shrink-0">
            <path fillRule="evenodd" d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M2 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm6.585 1.08a.75.75 0 0 1 .336 1.005l-1.75 3.5a.75.75 0 0 1-1.16.234l-1.75-1.5a.75.75 0 0 1 .977-1.139l1.02.875 1.321-2.64a.75.75 0 0 1 1.006-.336Z" clipRule="evenodd" />
          </svg>
          outline</button>
      </div>
      <div>
        <button className="
          px-4 py-2 border-1 border-cyan-600 rounded cursor-pointer transition flex items-center gap-4 whitespace-nowrap
          hover:shadow hover:bg-cyan-600/80 active:bg-cyan-500 active:border-cyan-500 hover:text-white
        ">
          outline
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 shrink-0">
            <path fillRule="evenodd" d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M2 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm6.585 1.08a.75.75 0 0 1 .336 1.005l-1.75 3.5a.75.75 0 0 1-1.16.234l-1.75-1.5a.75.75 0 0 1 .977-1.139l1.02.875 1.321-2.64a.75.75 0 0 1 1.006-.336Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div>
        <button className="
          px-4 py-2 border-1 border-gray-400 text-gray-400 rounded cursor-not-allowed transition flex items-center gap-4 whitespace-nowrap
        ">
          outline
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 shrink-0">
            <path fillRule="evenodd" d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M2 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm6.585 1.08a.75.75 0 0 1 .336 1.005l-1.75 3.5a.75.75 0 0 1-1.16.234l-1.75-1.5a.75.75 0 0 1 .977-1.139l1.02.875 1.321-2.64a.75.75 0 0 1 1.006-.336Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div>
        <button className="
          px-4 py-2 bg-gray-400 text-gray-300 rounded cursor-not-allowed transition flex items-center gap-4 whitespace-nowrap
        ">
          disabled
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 shrink-0">
            <path d="M4.038 4.038a5.25 5.25 0 0 0 0 7.424.75.75 0 0 1-1.06 1.061A6.75 6.75 0 1 1 14.5 7.75a.75.75 0 1 1-1.5 0 5.25 5.25 0 0 0-8.962-3.712Z" />
            <path d="M7.712 7.136a.75.75 0 0 1 .814.302l2.984 4.377a.75.75 0 0 1-.726 1.164l-.76-.109.289 1.075a.75.75 0 0 1-1.45.388l-.287-1.075-.602.474a.75.75 0 0 1-1.212-.645l.396-5.283a.75.75 0 0 1 .554-.668Z" />
            <path d="M5.805 9.695A2.75 2.75 0 1 1 10.5 7.75a.75.75 0 0 0 1.5 0 4.25 4.25 0 1 0-7.255 3.005.75.75 0 1 0 1.06-1.06Z" />
          </svg>
        </button>
      </div>
      <div>
        <button className="
          px-4 py-2 bg-gray-400 text-gray-300 rounded cursor-not-allowed transition flex items-center gap-4 whitespace-nowrap
        ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 animate-spin shrink-0">
            <path fillRule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clipRule="evenodd" />
          </svg>
          Loading
        </button>
      </div>

      <div>
        <button className="
          p-4 bg-amber-600 text-white rounded-full cursor-pointer transition flex items-center gap-4
          hover:shadow hover:bg-amber-600/80 active:bg-amber-500 active:border-amber-500
        ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div>
        <button className="
          p-4 bg-gray-400 text-gray-300 rounded-full transition cursor-not-allowed
        ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 animate-spin">
            <path fillRule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div>
        <button className="
          px-4 py-2 text-cyan-600 transition cursor-pointer
          hover:underline
        ">
          Link
        </button>
      </div>
      <div>
        <button className="
          px-4 py-2 transition cursor-pointer
          hover:underline
        ">
          Link
        </button>
      </div>
      <div>
        <button className="
          px-4 py-2 transition cursor-not-allowed text-gray-400
        ">
          Link
        </button>
      </div>
    </section>
  );
}