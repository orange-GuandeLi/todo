import { useState } from "react"

export function Select() {
  const originOption = ["option1", "option2", "option3", "option4"];
  const [value, setValue] = useState("");
  const [options, setOptions] = useState(originOption)

  return (
    <section className="flex gap-4 p-4 flex-wrap">
      <div>
        <div className="relative group w-fit">
          <input type="text" placeholder="Search..." value={value} onChange={(e) => {
            const value = e.currentTarget.value.trim();
            setOptions(originOption.filter(option => {
              if (!value) {
                return true;
              }

              return option.includes(value);
            }));
            setValue(value);
          }} className="
              outline-none border-1 border-gray-600 rounded px-4 py-2 pr-12
              placeholder:relative placeholder:transition-[left] placeholder:left-0
              focus-visible:placeholder:left-4
            " />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="
              size-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 transition
              group-has-focus:rotate-z-180
            ">
            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>

          <ul className="
            absolute left-0 top-[calc(100%_+_0.25rem)] bg-white/30 shadow w-full transition-all grid grid-rows-[0fr] opacity-0 -translate-y-4 ease-in-out
            group-has-focus:opacity-100 group-has-focus:grid-rows-[1fr] group-has-focus:translate-y-0
          ">
            <div className="overflow-hidden">
              {
                options.map((option, index) => {
                  return (
                    <li key={index} className="
                      px-4 py-2 cursor-pointer
                      hover:bg-white/40
                    " onMouseDown={() => setValue(option)}>
                      {option}
                    </li>
                  )
                })
              }
            </div>
          </ul>
        </div>
      </div>
    </section>
  )
}