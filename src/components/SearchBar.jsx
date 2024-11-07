import React, { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import { Loader2, Search } from 'lucide-react';
import useSearchStore from '@/zustand/SearchStore';
import { Card } from './ui/card';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const inputRef = useRef();
    const [isFocused, setIsFocused] = useState(false)
    const [isTyping, setIsTyping] = useState(false);
    const { query, suggestions, isLoading, setQuery } = useSearchStore();
    const router = useRouter();
    const suggestionsRef = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (suggestionsRef.current && !suggestionsRef.current.contains(event.target )) {
            setIsFocused(false)
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }, [])
    
    const handleChange = () => {
        if (inputRef.current.value) {
            setIsTyping(true);
            setQuery(inputRef.current.value?.trim())
        } else {
            setIsTyping(false);
        }
    };
    const shouldShowSuggestions = query?.trim().length > 3;


    useEffect(() => {
        if (inputRef.current && inputRef.current.value.length === 0) {
            setQuery('');
        }
    }, [inputRef.current?.value]);

    
    const handleSuggestionClick = (suggestion) => {
        setIsFocused(false)
        router.push(`/read/${suggestion?.title || suggestion?.altTitles[0]?.en || suggestion?.altTitles[1]?.en}?id=${suggestion?.id}`)
        inputRef.current?.focus()
        setQuery('');
        inputRef.current.value = '';
      }
    console.log(suggestions, "suggestions")
    return (
        <div className='w-[280px] relative flex items-center justify-center'>
            <Input
                type="text"
                placeholder="Search for manga..."
                className="border rounded"
                ref={inputRef}
                onChange={handleChange} 
                onFocus={() => setIsFocused(true)}
                aria-label="Search manga"
            />
            {!isTyping && <Search className='absolute right-3 text-gray-300' />}
            { isFocused  && shouldShowSuggestions && (
        <Card ref={suggestionsRef} className="absolute rounded z-10 w-full top-10 mt-1 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="py-1">
            {suggestions && suggestions?.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-2 flex justify-between items-center gap-4 hover:bg-accent transition-colors duration-200 cursor-pointer rounded-lg"
              >
                {/* Text Section */}
                <div className="desc flex-1">
                  <p className="font-medium text-base text-gray-900">{suggestion?.title}</p>
                </div>
          
                {/* Image Section */}
                <div className="image flex-[0.4] relative w-[80px] h-[80px] rounded-md overflow-hidden">
                  <img
                    src={suggestion?.image}
                    alt={suggestion?.title}
                    className="object-cover w-full h-full rounded-md transition-all duration-300 ease-in-out hover:scale-105"
                  />
                </div>
              </li>
            ))}
          </ul>
          
          ) : (
            <div className="p-4 text-center text-muted-foreground">No suggestions found</div>
          )}
        </Card>
      )}
        </div>
    );
};

export default SearchBar;
