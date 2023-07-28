'use client';

import { forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, type, ...props }, ref) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const pathname = usePathname();
    const handleInputChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const searchTerm = event.target.value;
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchTerm}`
        );

        const results = response.data.results.map(
          (item: any) => item.title || item.name
        );
        const firstFiveSuggestions = results.slice(0, 5);

        setSuggestions(firstFiveSuggestions);
      } catch (error) {
        console.error('Error fetching suggestions: ', error);
      }
    };

    const router = useRouter();

    const handleInputKeyPress = async (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === 'Enter') {
        const inputText = event.currentTarget.value.trim();
        if (inputText !== '') {
          if (pathname === '/search') {
            router.replace(`/search?q=${encodeURIComponent(inputText)}`);
            router.refresh();
          } else {
            router.push(`/search?q=${encodeURIComponent(inputText)}`);
          }
        }
      }
    };

    return (
      <div className='relative md:w-2/4 bg-[#080808] p-5 rounded-lg transition duration-100'>
        <input
          type={type}
          className={twMerge(
            `
            flex w-full rounded-md   bg-[#181818] border border-transparent px-2 py-2 text-sm file:border-0
            file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none
          `,
            className
          )}
          disabled={disabled}
          ref={ref}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress} // Attach the keypress event handler
          {...props}
        />
        {suggestions.length > 0 && (
          <ul className='absolute left-0 mt-2 mb-2 bg-[#080808] w-full rounded-lg shadow-md z-10'>
            {suggestions.map((item, index) => (
              <li
                key={index}
                className='mx-5 px-2 py-2 rounded-lg hover:text-black my-2 cursor-pointer hover:bg-custom-white'
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'Input';

export default SearchInput;
